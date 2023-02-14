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

        if(response.status !== 200) throw new Error(`Status code: ${response.status}. Request failed.`);

        const data = await response.json();

        if(!data.result) {
            console.error(`${uri}\n${data}`);
            throw new Error("result: false")
        }

        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

module.exports = apiRequest