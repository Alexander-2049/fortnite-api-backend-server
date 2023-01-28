const fetch = require('node-fetch');

async function apiRequest(uri) {
    const credentials = process.env['API-KEY'];
    try {
        
        const response = await fetch(uri, {
            method: "GET",
            headers: {
                Authorization: `${credentials}`,
            },
        });

        if(response.status !== 200) return false;

        const data = await response.json();

        if(!data.result) return false;

        return data;
    } catch (error) {
        console.warn(error)
    }
}

module.exports = apiRequest