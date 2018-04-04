const { makeExecutableSchema } = require('graphql-tools');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const pushnotifications = require('./pushnotifications');
const _get = require('lodash.get');

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
                try {
                    // Attempt to send a push notification to test
                    await pushnotifications({ title: "You're subscribed!", body: "Time to party!" }, args.pushSubscription);
                    // It worked, update user
                    await database.Users.updateOne({ _id: user._id }, { pushSubscription: args.pushSubscription });
                    // no external user data should be mutated
                    return user;
                } catch(err) {
                    return err;
                }
            },
            addTVShow: async(root, args, { user }) => {
                // Add/create TV show and add user as subscribed
                const show = await database.TvShow.addUserToShow(args.id, user._id);
                // Add TV show to list of users subscribed shows
                await database.Users.addShow(user._id, args.id);
                // If show has next episode, schedule it
                const nextEpisode = _get(show, `_links.nextepisode.href`, undefined);
                console.log(nextEpisode);
                if(nextEpisode) {
                    // Not using `await` so it does this async
                    database.Schedule.schedule(show._id, nextEpisode);
                }
                // Return show info to front-end
                return show;
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
    app.use('/api', graphqlExpress((req) => ({
        schema,
        context: { user: req.user },
        formatError(err) {
            console.log(err);
            // errors.report(err, req); // TODO: log errors
            return err.message;
        }
    })));
    app.use('/graphqli', graphiqlExpress({ endpointURL: '/api' }));
}