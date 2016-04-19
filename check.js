'use strict';

const ncu = require('npm-check-updates');
const path = require('path');
const bluebird = require('bluebird');
const Nsp = bluebird.promisifyAll(require('nsp'));
const co = require('co');
const argv = require('yargs')
  .usage('Usage: $0 /path/to/project/root/')
  .demand(1)
  .argv;

const check = function*() {
  try {
    const projectDir = argv._[0];
    const packageFile = path.resolve(projectDir) + '/package.json';

    console.log(packageFile);

    const ncuResult = yield ncu.run({ packageFile });
    console.log('----');
    console.log(ncuResult);

    const nspResult = yield Nsp.checkAsync({ package: packageFile });
    console.log('====');
    console.log(nspResult);
  } catch (e) {
    console.error(e);
  }
};

co(check);
