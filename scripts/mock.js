const bach = require('bach');
const mockapi = require('./tasks/mockapi').mockapi;
const patternlab = require('./tasks/patternlab');
const clean = require('./tasks/clean').clean;
const bundle = require('./tasks/bundle');
const log = require('fancy-log');
const color = require('ansi-colors');

const build = bach.series(
  
  // Start mock api
  mockapi
);

build( (err) => {
  if (err) {
    log(color.red(err));
    throw err;
  }

  log(color.green('Mockapi started'));
});
