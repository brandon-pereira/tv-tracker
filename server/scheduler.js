const schedule = require('node-schedule');
const pushnotifications = require('./pushnotifications');
const _get = require('lodash.get');

module.exports = (db) => {
    schedule.scheduleJob({second: 0}, () => checkAndSendNotifications(db));
    schedule.scheduleJob({minute: 1}, () => checkForNewEpisodes(db));
};

const checkForNewEpisodes = async (db) => {
    console.log("checking for new episodes");
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