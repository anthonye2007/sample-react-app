const kill = require('tree-kill');
const spawn = require('child_process').spawn;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startServer() {
    const server =spawn('npm', ['run', 'start:ci']);
    server.stdout.on('data', function(data) {
        console.log(data.toString());
    });
    return server;
}

function startTests() {
    console.log("starting tests");
    const tests = spawn('npm', ['run', 'test:ci']);
    tests.stdout.on('data', function(data) {
        console.log(data.toString());
    });
    tests.stderr.on('data', function(data) {
        console.log(data.toString());
    });
    return tests;
}

function setServerToDieWhenTestsComplete(server, tests) {
    const killServer = () => {
        kill(server.pid);
    };

    tests.on('close', (code) => {
        killServer();
        process.exit(code);
    });
    tests.on('error', () => {
        killServer();
        console.log("tests failed to run!!!");
    });
}

const server = startServer();
sleep(10000).then(() => {
    const tests = startTests();
    setServerToDieWhenTestsComplete(server, tests);
});