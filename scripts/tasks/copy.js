const gulp = require('gulp');
const path = require('path');
const log = require('fancy-log');
const debug = require('gulp-debug');
const chokidar = require('chokidar');
const color = require('ansi-colors');

const siteSource = '../DanskeSpil.Website/develop/Website';
const dsArtifacts = '/BuildArtifacts/';
const dsComponents = '/Components/';
const dest = './public/';

/**
 * Idea
 * - watch artifacts folder for changes, and copy files
 */

function copy(done) {

  log(color.green('Copying DS assets'));

  const artifactSource = path.join(siteSource, dsArtifacts, '**/*.*');
  const componentSource = path.join(siteSource, dsComponents, '**/*.js');
  
  // Copy all build artifacts
  gulp.src(artifactSource, { base: siteSource })
    //.pipe(debug())
    .pipe(gulp.dest(dest), { cwd: './'});

  // Copy all javascript files
  gulp.src(componentSource, { base: siteSource })
    //.pipe(debug())
    .pipe(gulp.dest(dest));

  done();

}

/**
 * Watch Sitecore output folders for changes and copy to Patternlab folder
 */
function watch(done) {

  const artifacts = path.join(siteSource, dsArtifacts);
  const components = path.join(siteSource, dsComponents);

  chokidar.watch(artifacts).on('change', (path, stats) => {
    gulp.src(path, { base: siteSource})
      .pipe(gulp.dest(dest));
    
    log(color.green(`Copied ${color.yellow(path)} to PatternLab`));
  });

  chokidar.watch(components).on('change', (path, stats) => {
    gulp.src(path, { base: siteSource})
      .pipe(gulp.dest(dest));

      log(color.green(`Copied ${color.yellow(path)} to PatternLab`));
  });

  log(color.green('Watching for changes'));

  done();

}

module.exports = {
  copy: copy,
  watch: watch
}
