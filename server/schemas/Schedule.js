module.exports = (mongoose) => {
    const schema = mongoose.model('Schedule', {
        id: {
            type: String,
            required: true
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

    return schema;
}