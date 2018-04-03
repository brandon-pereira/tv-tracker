module.exports = (mongoose) => {
    const schema = mongoose.model('Schedule', {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        imageUrl: String,
        subscribedUsers: [
            {
                type: String
            }
        ],
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

//https://github.com/node-schedule/node-schedule