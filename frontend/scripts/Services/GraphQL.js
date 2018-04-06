
class Server {

    constructor() {
        this.endpoint = '/api';
    }

    fetch(query = {}, variables = {}) {
        return fetch(this.endpoint, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                query,
                variables
            }),
            credentials: 'same-origin',
        }).then(data => data.json())


    }

}

export default new Server();