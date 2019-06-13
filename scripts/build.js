const bach = require('bach');
const copy = require('./tasks/copy').copy;
const mockapi = require('./tasks/mockapi').mockapi;
const patternlab = require('./tasks/patternlab');

const build = bach.series(
  // Raw copy of frontend bundles
  copy,
  bach.parallel(
    // Start mock api
    mockapi,
    // Start patternlab instance
    patternlab.serve
  )
);

build( (err) => {
  if (err) throw err;

  console.log('Patternlab started');
})
