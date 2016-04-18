'use strict';

const gulp = require('gulp');
const gulpNSP = require('gulp-nsp');
const ncu = require('npm-check-updates');
const path = require('path');


gulp.task('check', function(cb) {
  const argv = require('yargs')
    .usage('Usage: $0 check --dir path/to/project/root/')
    .alias('d', 'dir')
    .describe('dir', 'path to the directory which contains package.json')
    .demand(['dir'])
    .check(argv => argv.dir.length > 0)
    .argv;

  const projectDir = argv.dir;
  const packageFile = projectDir + '/package.json';

  ncu.run({ packageFile }).then(upgraded => {
    console.log('Dependencies to update:');
    console.log(upgraded);

    gulpNSP({ package: path.resolve(packageFile) }, cb);
  });
});
