const { makeExecutableSchema } = require('graphql-tools');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

module.exports = (app, database) => {
    const typeDefs = `
        type TvShow {
            id: String!,
            name: String!,
            imageUrl: String
        }

        type User {
            google_id: String,
            firstName: String,
            lastName: String,
            creationDate: String
            TvShows: [TvShow]
        }

        type Query {
            User(id: ID): User,
            TvShow(id: ID): TvShow
        }

        type Mutation {
            setPushSubscription(pushSubscription: String!): User,
            addTVShow(id: String!): TvShow
        }
    `;

    const resolvers = {
        Mutation: {
            setPushSubscription: async(root, args, { user }) => {
                await database.Users.updateOne({ _id: user._id }, { pushSubscription: args.pushSubscription });
                return user; // no external user data should be mutated
            },
            addTVShow: async(root, args, { user }) => {
                console.log(args);
                return await database.Users.findOneAndUpdate({ _id: user._id }, { $push: { TvShows: args.id }})
            }
        },
        Query: {
            User: async (root, args, { user }) =>
                // Returns arged user or current session user.
                await database.Users.findOne({google_id: args.id || user.google_id}),
            
            TvShow: async (root, args) => {
                console.log(args);
                return {
                    id: args.id,
                    name: "Lorem Ipsum",
                    imageUrl: "https://google.ca/"
                }
            }
        }
    };

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    app.use('/api', (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(401).json({data: null, errors: {message: "Not Authorized"}})
        }
    });
    app.use('/api', graphqlExpress((req) => ({ schema, context: { user: req.user } })));
    app.use('/graphqli', graphiqlExpress({ endpointURL: '/api' }));
}