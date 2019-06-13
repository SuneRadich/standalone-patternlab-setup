const del = require('del');
const log = require('fancy-log');
const color = require('ansi-colors');

function clean() {
  const publicFolder = './public';

  return del(publicFolder).then( () => {
    log(color.green('Cleaned public folder'));
  })
}

module.exports = {
  clean: clean
};
