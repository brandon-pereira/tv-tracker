const { getShow } = require('../utils/TvMaze');
const { Schema } = require('mongoose');

module.exports = (mongoose) => {
    const schema = mongoose.model('TvShows', {
        _id: Schema.Types.ObjectId,
        id: String,
        name: String,
        image: Object,
        subscribedUsers: [{ type: Schema.Types.ObjectId, ref: 'TvShows' }],
        status: String,
        updated: Number,
        _links: Object
    });

    schema.findOrCreate = async function(show_id) {
        const _show = await this.findOne({ id: show_id });
        if (_show) {
            return _show;
        } else {
            const show = await getShow(show_id);
            return await this.create(show);
        }
    }

    schema.addUserToShow = async function(show_id, user_id) {
        const show = await this.findOrCreate(show_id);
        // dedupe
        const users = show.subscribedUsers;
        users.push(user_id);
        show.subscribedUsers = [...new Set(users)];
        show.markModified('subscribedUsers'); // Mark modified so it's resaved
        // save/return
        show.save();
        return show;
    }

    schema.removeUserFromShow = async function (show_id, user_id) {
        const show = await this.findOne({id: show_id});
        if (show.subscribedUsers.indexOf(user_id) > -1) {
            show.subscribedUsers.splice(show.subscribedUsers.indexOf(user_id), 1);
            show.save();
        }
        return show;
    }

    return schema;
}