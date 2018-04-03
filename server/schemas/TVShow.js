module.exports = (mongoose) => {
    const schema = mongoose.model('TvShow', {
        id: {
            type: String,
            required: true
        },
        name: String,
        imageUrl: String
    });

    return schema;
}

//https://github.com/node-schedule/node-schedule