const config = require('../../patternlab-config.js');
const PatternLab = require('@pattern-lab/core')(config);

function serve() {
  return PatternLab.server.serve({
    cleanPublic: true,
    watch: true
  }).then(() => {
    // eslint-disable-next-line no-unused-vars
    PatternLab.events.on('patternlab-pattern-asset-change', (data) => {
      // Log(data); // {file: 'path/to/file.css', dest: 'path/to/destination'}
      PatternLab.server.refreshCSS();
    });

    // eslint-disable-next-line no-unused-vars
    PatternLab.events.on('patternlab-pattern-change', (data) => {
      // Log(data); // {file: 'path/to/file.ext'}
      PatternLab.patternsonly({
        cleanPublic: false
      }).then(() => {
        PatternLab.server.reload();
      });
    });

    // eslint-disable-next-line no-unused-vars
    PatternLab.events.on('patternlab-global-change', (data) => {
      // Log(data); // {file: 'path/to/file.ext'}
    });
  });
}

module.exports = {
  serve: serve
};
