const { getShow } = require('../utils/TvMaze');
const { Schema } = require('mongoose');

module.exports = (mongoose) => {
    const model = mongoose.model("TvShows", {
      _id: Schema.Types.ObjectId,
      id: String,
      name: String,
      image: Object,
      subscribedUsers: [
        {
          type: Schema.Types.ObjectId,
          ref: "TvShows"
        }
      ],
      status: String,
      updated: Number,
      _links: Object
    });

    model.findOrCreate = async function(show_id) {
        const _show = await this.findOne({ id: show_id });
        if (_show) {
            return _show;
        } else {
            const show = await getShow(show_id);
            return await this.create(Object.assign(show, { _id: new mongoose.Types.ObjectId()}));
        }
    }

    model.addUserToShow = async function(show_id, user_id) {
        const show = await this.findOrCreate(show_id);
        // Add user to show
        show.subscribedUsers.addToSet(user_id);
        // Save/return
        await show.save();
        return show;
    }

    model.removeUserFromShow = async function(show_id, user_id) {
        const show = await this.findOne({ id: show_id });
        if (show.subscribedUsers.indexOf(user_id) > -1) {
            show.subscribedUsers.splice(show.subscribedUsers.indexOf(user_id), 1);
            show.save();
        }
        return show;
    };

    return model;
}