const schedule = require('node-schedule');
const pushnotifications = require('./pushnotifications');

module.exports = (db) => {
    const rule = new schedule.RecurrenceRule();
    rule.second = 5;

    // new db.Schedule({
    //     id: 1,
    //     name: 'Mr. Robot',
    //     subscribedUsers: [1, 34, 44],
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

const getAiredEpisodes = (db, date) => db.Schedule.find({ airDate: { $lt: date } })

const sendNotification = (episode) => pushnotifications(episode.name + ' will air now!')

const removeEpisodesFromQueue = (db, episode) => db.Schedule.remove({_id: episode._id});