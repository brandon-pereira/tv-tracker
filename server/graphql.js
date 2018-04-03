const { makeExecutableSchema } = require('graphql-tools');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

module.exports = (app, database) => {
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

    app.use('/graphql', (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(401).json({data: null, errors: {message: "Not Authorized"}})
        }
    });
    app.use('/graphql', graphqlExpress((req) => ({ schema, context: { user: req.user } })));
    app.use('/graphqli', graphiqlExpress({ endpointURL: '/graphql' }));
}