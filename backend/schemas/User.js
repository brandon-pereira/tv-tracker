const { Schema } = require('mongoose');

module.exports = (mongoose) => {
	const schema = mongoose.model('Users', {
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
		TvShows: [{
			type: Schema.Types.ObjectId,
			ref: 'TvShows',
			unique: true,
			index: true
		}],
		pushSubscription: String
	});

	// TODO: base this off internal ids (if possible?)
	schema.findOrCreate = async function(id, doc) {
		const result = await this.findOne({google_id: id})
		if(result) {
			return result;
		} else {
			return await this.create(doc);
		}
	}

	schema.addShow = async function(user_id, show_id) {
		const user = await this.findOne({_id: user_id});
		// dedupe
		const shows = new Set([...user.TvShows]);
		shows.add(show_id);
		user.TvShows = [...shows];
		user.markModified('TvShows')
		// save/return
		user.save();
		return user;
	}
	
	return schema;
}