const fetch = require('node-fetch');
var fs = require('fs');

async function fetchURL(uri) {
    let data;
    let error;
    
    try {
        data = await fetch(uri);
        data = await data.json();

        const url = new URL(uri);
        const filename = changeforbiddenSymbols(`${getCurrentTime()}${`${url.pathname}${url.search}`}.log`);

        await saveLog(data, filename);
    } catch (err) {
        data = false;
        error = err;
    }

    return {
        data,
        error
    } 
}

function getCurrentTime() {
    const date = new Date();
    return date.getTime();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function saveLog(data, filename) {

    await fs.promises.mkdir(`${global.appRoot}/logs/http-requests`, { recursive: true }, (err) => {
        if (err) throw err;
    });
    
    filename = `${global.appRoot}/logs/http-requests/${filename}`;

    fs.appendFile(filename, JSON.stringify(data), (err) => {
        if (err) throw err;
    });

    await sleep(1);
}

function changeforbiddenSymbols(str) {
    let forbiddenSymbols = ["+", "=", "[", "]", ":", "*", "?", ";", "«", ",", ".", "/", "\\", "<", ">", "|"];
    for(let i = 0; i < forbiddenSymbols.length; i++) {
        str = str.replace(forbiddenSymbols[i], "-");
    }
    return str;
}

module.exports = fetchURL;