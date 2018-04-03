module.exports = (mongoose) => {
    const schema = mongoose.model('TvShow', {
        id: {
            type: String,
            required: true
        },
        name: String,
        imageUrl: String,
        subscribedUsers: [String] // TODO: ref: 'user'???
    });

    return schema;
}