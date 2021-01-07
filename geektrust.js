const { Operations } = require('./service/operations')
global.LOG = console.log;

async function init(testFileLocation) {
    try {
        const op = new Operations();
        // initializing family tree
        LOG = () => {} // disable logging during initialization
        await op.executeFile('./resources/init.txt');
        LOG = console.log // enable logging again
        // run tests based on input argument
        if(testFileLocation)
            await op.executeFile(testFileLocation)
    } catch(err) {
        console.trace(err);
    }
}

let testFileLocation = process.argv[2];
init(testFileLocation);
