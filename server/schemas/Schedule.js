module.exports = (mongoose) => {
    const schema = mongoose.model('Schedule', {
        id: {
            type: String,
            required: true,
            unique: true
        },
        airDate: {
            type: Date,
            required: true
        },
        episode: {
            type: Number,
            required: true
        },
        season: {
            type: Number,
            required: true
        }
    });

    schema.schedule = async function(show) {
        const exists = await this.findOne({id: show.id});
        if(!exists) {
            return await this.create(show);
        }
        return exists;
    }

    return schema;
}