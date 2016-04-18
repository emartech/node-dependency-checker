'use strict';

const ncu = require('npm-check-updates');
const co = require('co');
const argv = require('yargs')
  .usage('Usage: $0 /path/to/project/root/')
  .demand(1)
  .argv;

const check = function*() {
  try {
    const projectDir = argv._[0];
    const packageFile = projectDir + '/package.json';

    console.log(packageFile);

    const upgraded = yield ncu.run({ packageFile });

    console.log(upgraded);
  } catch (e) {
    console.error(e);
  }
};

co(check);
