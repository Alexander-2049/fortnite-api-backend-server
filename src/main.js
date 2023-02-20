const express = require('express')
const app = express()
const consoleLogMemoryUsage = require('./utils/memoryUsage');
require('dotenv').config();

require('../global');



const lootListHitory = require('./api/lootListHistory');
const tests = require('../tests');
lootListHitory.init();

// app.use(require('./middleware/serverLoad'));
app.use(require('./routes/router'));

app.get('/', (req, res) => {
    res.json('hello world');
});

app.get('*', (req, res) => {
    res
     .status(404)
     .json('not found');
});
  
app.listen(global.PORT, async () => {
    console.log(`Server is running on port ${global.PORT}`)

    if(process.argv.includes('--test')) {
        await tests.all();
        process.exit(1);
    }

    if(!process.argv.includes('--test') && !process.argv.includes('--dev')) {
        await tests.http();
    }

    const SECONDS_BETWEEN_HTTP_TESTS = process.env['SECONDS-BETWEEN-HTTP-TESTS'] || 60;

    setInterval(tests.http, SECONDS_BETWEEN_HTTP_TESTS * 1000);
});

process.on('uncaughtException', function (err) {
    console.error(err);
}); 