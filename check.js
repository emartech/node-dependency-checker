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
    const nspResult = yield Nsp.checkAsync({ package: packageFile });

    console.log('Outdated packages:');
    console.log(ncuResult);
    console.log('-----');
    console.log('Vulnerabilities found:');
    console.log(nspResult);
  } catch (e) {
    console.error(e);
  }
};

co(check);
