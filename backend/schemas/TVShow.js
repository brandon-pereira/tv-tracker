const { getShow } = require('../utils/TvMaze');
const { Schema } = require('mongoose');
const uniqueArrayPlugin = require("mongoose-unique-array");

module.exports = (mongoose) => {
    const schema = new Schema({
      _id: Schema.Types.ObjectId,
      id: String,
      name: String,
      image: Object,
      subscribedUsers: [
        {
          type: Schema.Types.ObjectId,
          ref: "TvShows",
          unique: true,
          index: true
        }
      ],
      status: String,
      updated: Number,
      _links: Object
    });
    schema.plugin(uniqueArrayPlugin);
    const model = mongoose.model("TvShows", schema);

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
        try {
			// Try adding user to show
			show.subscribedUsers.push(user_id);
			await show.save();
		} catch(err) {
			// ValidationError = TvShow already in user
			if (err.name !== "ValidationError") {
				console.error(err.name);
			}
		}
        // save/return
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