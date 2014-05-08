var gulp = require('gulp');
var rg = require('rangle-gulp');

gulp.task('karma', rg.karma({
  // files: specify which folders (optional)
  // karmaConf: specify which karma config file (optional)
}));

gulp.task('karma-watch', rg.karmaWatch({
  // files: specify which folders (optional)
  // karmaConf: specify which karma config file (optional)
}));

gulp.task('mocha', rg.karmaWatch({
  // files: specify which folders (optional)
}));

gulp.task('lint', rg.jshint({
  // files: specify which files (optional)
}));

gulp.task('beautify', rg.beautify({
  // files: specify which files (optional)
}));

gulp.task('concat', rg.concatAndUglify({
  // files: specify which files (optional)
  // name: specify what the result should be called, e.g. 'foo'
  // dist: specify where the output should go, e.g. 'client/dist/'
}));

gulp.task('dev', rg.nodemon({
  onChange: ['lint'] // or ['lint', 'karma']
}));

gulp.task('default', ['lint', 'concat', 'mocha', 'karma']);