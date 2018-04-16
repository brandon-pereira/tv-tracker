import graphql from "./GraphQL";

export default class ServerStorage {

    async init() {
        return await graphql.query(`
            User {
                firstName,
                TvShows {
                    id,
                    name
                }
            }`
        );
    }

    async addShow(show_id) {
        return await graphql.fetch(`
            mutation _($input: String!){
                addTVShow(id: $input) {
                    name
                }
            }`, { input: show_id }
        );
    }

    async removeShow(show_id) {
        return await graphql.fetch(`
            mutation _($input: String!){
                removeTvShow(id: $input) {
                    name
                }
            }`, { input: show_id }
        );
    }

}
