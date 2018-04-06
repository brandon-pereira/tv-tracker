const schedule = require('node-schedule');
const pushnotifications = require('./pushnotifications');
const _get = require('lodash.get');
const TvMaze = require('./utils/tvmaze');

module.exports = (db) => {
    schedule.scheduleJob({second: 0}, () => checkAndSendNotifications(db)); // Every Minute
    schedule.scheduleJob({dayOfWeek: 0}, () => checkForNewEpisodes(db)); // Every Sunday
};

const checkForNewEpisodes = async (db) => {
    // query all shows where status !== ended
    const shows = await db.TvShow.find({status: {$ne: "Ended"}})
    // check if updated timestamp has changed
    let updatedCount = 0;
    for(const show of shows) {
        // check if updated timestamp has changed
        const _show = await TvMaze.getShow(show.id);
        if(_show.updated !== show.updated) {
            // update all data
            Object.assign(show, _show);
            show.save();
            // schedule next episode
            const nextEpisode = _get(show, `_links.nextepisode.href`, undefined);
            if (nextEpisode) {
                await db.Schedule.schedule(show._id, nextEpisode);
            }
            updatedCount += 1;
        }
    }
    console.log(`Finished checking for updates, updated/scheduled ${updatedCount} shows.`);
}

const checkAndSendNotifications = async (db) => {
    const episodes = await getAiredEpisodes(db, new Date());
    if (episodes.length) {
        console.info(`Found ${episodes.length} in the queue. Notifying subscribed users.`);
        await Promise.all(episodes.map(episode => sendNotification(db, episode))); // wait till all notifications are sent
        await Promise.all(episodes.map(episode => removeEpisodesFromQueue(db, episode)));
    }
}

const getAiredEpisodes = async (db, date) => {
    const aired = await db.Schedule.find({ airDate: { $lt: date }});
    const episodes = await Promise.all(aired.map(async e => {
        e = e.toObject();
        const show = await db.TvShow.findOne({_id: e.show_id})
        e.TvShow = show;
        return e;
    }));
    return episodes;
}

const sendNotification = async (database, episode) => {
    if (episode && episode.TvShow && episode.TvShow.subscribedUsers && episode.TvShow.subscribedUsers.length) {
        return Promise.all(episode.TvShow.subscribedUsers.map(async _id => {
            const user = await database.Users.findOne({ _id });
            return await pushnotifications({
                title: `${episode.TvShow.name} will air now!`,
                body: `S${('0' + episode.season).slice(-2)}E${('0' + episode.episode).slice(-2)}${episode.name ? ' - ' + episode.name : ''}` || undefined,
                image: _get(episode, `TvShow.image.medium`, undefined)
            }, user.pushSubscription)
        }))
    } else {
        console.log("sendNotification received corrupted data");
        return;
    }
}

const removeEpisodesFromQueue = (db, episode) => db.Schedule.remove({_id: episode._id});