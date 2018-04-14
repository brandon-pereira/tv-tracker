const { Schema } = require('mongoose');
const uniqueArrayPlugin = require("mongoose-unique-array");

module.exports = (mongoose) => {
	const schema = new Schema({
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
			ref: "TvShows",
			unique: true,
			index: true
		}
		],
		pushSubscription: String
	});
	schema.plugin(uniqueArrayPlugin);
	const model = mongoose.model('Users', schema);

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
		try {
			// Try adding show
			user.TvShows.push(show_id);
			await user.save();
		} catch(err) {
			// ValidationError = TvShow already in user
			if (err.name !== "ValidationError") {
				console.error(err.name);
			}
		}
		return user;
	};
	
	return model;
}