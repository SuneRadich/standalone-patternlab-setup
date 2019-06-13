const bach = require('bach');
const copy = require('./tasks/copy');
const mockapi = require('./tasks/mockapi').mockapi;
const patternlab = require('./tasks/patternlab');
const clean = require('./tasks/clean').clean;
const bundle = require('./tasks/bundle');
const log = require('fancy-log');
const color = require('ansi-colors');


const build = bach.series(
  // Raw copy of frontend bundles
  clean,
  copy.copy,
  bach.parallel(
    // Start mock api
    mockapi,
//    copy.watch,
    // Start patternlab instance
    bach.series(
      bundle.buildBundleData,
      bundle.core,
      bundle.region,
      patternlab.serve
    )
  )
);

build( (err) => {
  if (err) {
    log(color.red(err));
    throw err;
  }

  log(color.green('Patternlab started'));
});
