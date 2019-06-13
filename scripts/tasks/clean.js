const del = require('del');
const log = require('fancy-log');

function clean() {
  const publicFolder = './public';

  return del(publicFolder).then( () => {
    log('Deleted public folder')
  })


}