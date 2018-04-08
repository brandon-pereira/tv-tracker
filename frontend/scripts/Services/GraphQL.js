
class GraphQL {

    constructor() {
        this.endpoint = '/api';
    }

    async query(query) {
        query = `query {${query}}`;
        return this.fetch(query);
    }

    async fetch(query = ``, variables = {}) {

        const data = await fetch(this.endpoint, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                query,
                variables
            }),
            credentials: 'same-origin',
        })
        return await data.json()

    }

}

export default new GraphQL();