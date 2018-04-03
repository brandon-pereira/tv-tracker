const { makeExecutableSchema } = require('graphql-tools');
const database = require('./database');

const typeDefs = `
    type User {
        google_id: String,
		firstName: String,
		lastName: String,
		creationDate: Int
    }

    type Query {
        User(id: ID): User,
    }
`;

const resolvers = {
    Query: {
        // Deal: async (root, { id }) => {
        //     console.log("loading Deals collection", id);
        //     const deal = await Deals.getDeal(id);
        //     return deal;
        // },
        // City: async (root, { id }) => {
        //     console.log("loading City collection", id);
        //     const db = await mongo;
        //     const City = await db.Cities.findOne({ id });
        //     const deals = await Deals.getDeals('best', { city: id });
        //     return { ...City, Deals: deals }
        // },
        // Cities: async () => {
        //     console.log("loading all cities collection");
        //     const db = await mongo;
        //     const Cities = await db.Cities.find({}).toArray();
        //     return Cities.map(c => {
        //         c.Deals = []
        //         return c;
        //     });
        // },
        User: async (root, params, { user }) => {
            console.log(params, user);
            return await database.Users.findOne({})
        }
    }
}
const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;