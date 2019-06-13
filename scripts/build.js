const bach = require('bach');
const copy = require('./tasks/copy');
const mockapi = require('./tasks/mockapi').mockapi;
const patternlab = require('./tasks/patternlab');
const log = require('fancy-log');

const build = bach.series(
  // Raw copy of frontend bundles
  copy.copy,
  bach.parallel(
    // Start mock api
    mockapi,
    copy.watch,
    // Start patternlab instance
    patternlab.serve
  )
);

build( (err) => {
  if (err) throw err;

  log('Patternlab started');
})
