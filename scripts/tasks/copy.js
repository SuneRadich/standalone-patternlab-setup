const gulp = require('gulp');

function copy(done) {

  console.log('Copying DS assets');

  const dsArtifacts = '../Website/BuildArtifacts/';
  const dsComponents = '../Website/Components/';
  const dest = './public/';

  // Copy all build artifacts
  gulp.src(`${dsArtifacts}/**/*.*`).pipe(gulp.dest(`${dest}/BuildArtifacts`));

  // Copy all javascript files
  gulp.src(`${dsComponents}/**/*.js`).pipe(gulp.dest(`${dest}/Components`));

  done();

}

module.exports = {
  copy: copy
}
