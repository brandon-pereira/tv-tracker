const fetch = require('node-fetch');

module.exports = (mongoose) => {
    const schema = mongoose.model('Schedule', {
        show_id: {
            type: String,
            required: true,
            unique: true
        },
        episode_id: {
            type: String,
            required: true,
            unique: true
        },
        airDate: {
            type: Date,
            required: true
        },
        episodeNumber: {
            type: Number,
            required: true
        },
        seasonNumber: {
            type: Number,
            required: true
        },
        name: String,
        description: String,
        episode_url: String
    });

    schema.schedule = async function(show_id, episode_url) {
        const exists = await this.findOne({show_id, episode_url});
        if(!exists) {
            let episode = await fetch(episode_url);
            episode = await episode.json();
            return await this.create({
                show_id,
                episode_id: episode.id,
                // airDate: new Date(episode.airstamp),
                airDate: new Date(),
                episodeNumber: episode.number,
                seasonNumber: episode.season,
                name: episode.name,
                description: episode.summary,
            });
        }
        return exists;
    }

    return schema;
}