const fetch = require('node-fetch');

async function fetchURL(uri) {
    let data;
    let error;
    
    try {
        data = await fetch(uri);
        data = await data.json();
    } catch (err) {
        data = false;
        error = err;
    }

    return {
        data,
        error
    } 
}

module.exports = fetchURL;