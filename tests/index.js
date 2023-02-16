const augmentsTest = require("./http/augments.test");

const tests = {
    all: testAll,
    http: testHTTP
};

async function testAll() {
    const {ok, getFailCount} = setupOk();

    let today = new Date();
        today = `${today.toLocaleDateString()} ${today.toLocaleTimeString()}`;
    console.log(`[${today}] Tests are running...`);

    await ok(augmentsTest, "http/augments");

    console.log(getResult(getFailCount()));
}

async function testHTTP() {
    const {ok, getFailCount} = setupOk();

    let today = new Date();
        today = `${today.toLocaleDateString()} ${today.toLocaleTimeString()}`;
    console.log(`[${today}] Tests are running...`);

    await ok(augmentsTest, "http/augments");

    console.log(getResult(getFailCount()));
}

function setupOk() {
    let FAIL_COUNTER = 0;

    return {ok, getFailCount};

    async function ok(func, testName) {
        let timeInMilliseconds;
        let errorMessage;
    
        try {
            timeInMilliseconds = Math.round(await func());
        } catch (error) {
            timeInMilliseconds = false;
            errorMessage = error.message;
        }
    
        if(timeInMilliseconds !== false) {
            console.log(`[+] ${testName} (${timeInMilliseconds}ms)`);
        } else {
            console.log(`[-] ${testName} => ${errorMessage}`);
            FAIL_COUNTER++;
        }
    }

    function getFailCount() {
        return FAIL_COUNTER;
    }
}

function getResult(failCounter) {
    let message;
    if(failCounter === 0) {
        message = 'All tests were successfully passed';
    } else {
        message = `${failCounter} test(s) were not passed :(`;
    }
    return message;
}

module.exports = tests;