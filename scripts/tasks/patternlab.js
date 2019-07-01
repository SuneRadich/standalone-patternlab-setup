const config = require('../../patternlab-config.js');
const PatternLab = require('@pattern-lab/core')(config);

function serve() {

  return PatternLab.server.serve({
    cleanPublic: true,
    watch: true
  }).then(() => {
    // eslint-disable-next-line no-unused-vars
    PatternLab.events.on('patternlab-pattern-asset-change', (data) => {
      
      // Only refresh css if the asset is a css file
      if (data.file.match(/.css$/)) {
        PatternLab.server.refreshCSS();
      } else if (data.file.match(/.js$/)) {
        PatternLab.server.reload();
      }

    });

    // eslint-disable-next-line no-unused-vars
    PatternLab.events.on('patternlab-pattern-change', (data) => {
      // log(data); // {file: 'path/to/file.ext'}
      PatternLab.patternsonly({
        cleanPublic: false
      }).then(() => {        
        PatternLab.server.reload();
      });
    });

    // eslint-disable-next-line no-unused-vars
    PatternLab.events.on('patternlab-global-change', (data) => {
      // log(data); // {file: 'path/to/file.ext'}
    });
  });
}

module.exports = {
  serve: serve
};
