const spawn = require('child_process').spawn;

console.log("Starting - npm install");
const npmInstall = spawn('npm', ['install', '--no-bin-links']);
npmInstall.stderr.on('data', function(data) {
    console.log(data.toString());
});
npmInstall.on('close', (exitCode) => {
    console.log("Install complete, starting build");
    const build = spawn('npm', ['build']);
    build.on('close', () => {
        console.log("Build complete, starting tests");
        const test = spawn('npm', ['run', 'ci']);
        test.stdout.on('data', function(data) {
            console.log(data.toString());
        });
        test.stderr.on('data', function(data) {
            console.log(data.toString());
        });
        test.on('close', (exitCode) => {
            process.exit(exitCode);
        });
    });
});
