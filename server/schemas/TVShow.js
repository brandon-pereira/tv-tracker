const fetch = require('node-fetch');

module.exports = (mongoose) => {
    const schema = mongoose.model('TvShow', {
        id: {
            type: String,
            required: true
        },
        name: String,
        imageUrl: String,
        subscribedUsers: [{type: String, unique: true}] // TODO: ref: 'user'???
    });

    schema.findOrCreate = async function(show_id) {
        const _show = await this.findOne({ id: show_id });
        if (_show) {
            return _show;
        } else {
            let show = await fetch("https://api.tvmaze.com/shows/" + show_id)
            show = await show.json();
            return await this.create(show);
        }
    }

    schema.addUserToShow = async function(show_id, user_id) {
        const show = await this.findOrCreate(show_id);
        // dedupe
        const users = new Set(show.subscribedUsers);
        users.add(user_id);
        show.subscribedUsers = [...users];
        // save/return
        show.save();
        return show;
    }

    return schema;
}