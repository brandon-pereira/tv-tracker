const schedule = require('node-schedule');
const pushnotifications = require('./pushnotifications');

pushnotifications('hello');

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
    schedule.scheduleJob(rule, async () => {
        console.log('Running job!', Date.now());
        const episodes = await db.Schedule.find({ airDate: { $lt: new Date() } });
        console.log(episodes);
        pushnotifications(episodes[0].name + ' will air now!');

    });
}