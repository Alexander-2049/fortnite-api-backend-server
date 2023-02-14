const express = require('express')
const app = express()
const consoleLogMemoryUsage = require('./utils/memoryUsage');
require('dotenv').config();

require('./global');

const PORT = process.env.PORT || 4747;

const lootListHitory = require('./api/lootListHistory');
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
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

process.on('uncaughtException', function (err) {
    console.error(err);
}); 