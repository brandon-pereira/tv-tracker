const schedule = require('node-schedule');
const pushnotifications = require('./pushnotifications');

module.exports = (db) => {
    const rule = new schedule.RecurrenceRule();
    rule.second = 5;

    // new db.Schedule({
    //     id: 143,
    //     airDate: Date.now(),
    //     season: 1,
    //     episode: 1
    // }).save()
    schedule.scheduleJob(rule, () => checkAndSendNotifications(db));
};


const checkAndSendNotifications = async (db) => {
    const episodes = await getAiredEpisodes(db, new Date());
    if (episodes.length) {
        console.info(`Found ${episodes.length} in the queue. Notifying subscribed users.`);
        await Promise.all(episodes.map(sendNotification)); // wait till all notifications are sent
        console.log("Sent!");
        await Promise.all(episodes.map(episode => removeEpisodesFromQueue(db, episode)));
        console.log("Deleted!");
    } else {
        console.info(`Nothing in the queue. :)`)
    }
}

const getAiredEpisodes = async (db, date) => {
    const aired = await db.Schedule.find({ airDate: { $lt: date }});
    const episodes = await Promise.all(aired.map(e => db.TvShow.findOne({id: e.id}))) // TODO: use _id
    console.log(episodes);
    return episodes;
}

const sendNotification = (episode) => pushnotifications(episode.name + ' will air now!')

const removeEpisodesFromQueue = (db, episode) => db.Schedule.remove({_id: episode._id});