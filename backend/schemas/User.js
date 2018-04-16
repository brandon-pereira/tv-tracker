const { Schema } = require('mongoose');

module.exports = mongoose => {
  const model = mongoose.model('Users', {
    google_id: String,
    firstName: {
      type: String,
      required: true
    },
    lastName: String,
    creationDate: {
      type: Date,
      default: Date.now
    },
    TvShows: [
      {
        type: Schema.Types.ObjectId,
        ref: 'TvShows'
      }
    ],
    pushSubscription: String
  });

  // TODO: base this off internal ids (if possible?)
  model.findOrCreate = async function(id, doc) {
    const result = await this.findOne({ google_id: id });
    if (result) {
      return result;
    } else {
      return await this.create(doc);
    }
  };

  model.addShow = async function(user_id, show_id) {
    const user = await this.findOne({ _id: user_id });
	// Try adding show
	user.TvShows.addToSet(show_id);
	// Save/return
	await user.save();
    return user;
  };

  return model;
};
