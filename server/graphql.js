const { makeExecutableSchema } = require('graphql-tools');
const database = require('./database');

const typeDefs = `
    type User {
        google_id: String,
		firstName: String,
		lastName: String,
        creationDate: String
    }

    type Query {
        User(id: ID): User,
    }
`;

const resolvers = {
    // User: {
    //     creationDate: (d) => {
    //         console.log(d);
    //         return d.creationDate
    //     }
    // },
    Query: {
        User: async (root, args, { user }) =>
            // Returns arged user or current session user.
            await database.Users.findOne({google_id: args.id || user.google_id})
    }
}

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;