const bach = require('bach');
const copy = require('./tasks/copy');
const mockapi = require('./tasks/mockapi').mockapi;
const patternlab = require('./tasks/patternlab');
const clean = require('./tasks/clean').clean;
const log = require('fancy-log');
const color = require('ansi-colors');

const build = bach.series(
  // Raw copy of frontend bundles
  clean,
  copy.copy,
  bach.parallel(
    // Start mock api
    mockapi,
    //copy.watch,
    // Start patternlab instance
    patternlab.serve
  )
);

build( (err) => {
  if (err) throw err;

  log(color.green('Patternlab started'));
})
