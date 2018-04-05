
class Server {

    constructor() {
        this.endpoint = '/api';
    }

    fetch(query = {}, variables = {}) {
        fetch(this.endpoint, {
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


    }

}

export default new Server();