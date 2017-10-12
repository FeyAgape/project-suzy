var gulp = require('gulp');

//gulp.task('task-name', function() {
  // task-name refers to the name of the task, which would be used whenever you want to run a task in Gulp. 
  //You can also run the same task in the command line by writing gulp task-name
//});

gulp.task('hello', function() {
  console.log('Hello World');
});

/*gulp.task('task-name', function () {
  return gulp.src('source-files') // Get source files with gulp.src
    .pipe(aGulpPlugin()) // Sends it through a gulp plugin
    .pipe(gulp.dest('destination')) // Outputs the file in the destination folder
})*/

var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');

/*gulp.task('sass', function(){
  return gulp.src('source-files')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('destination'))
});*/

gulp.task('sass', function(){
  return gulp.src('app/scss/styles.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
});

// run gulp sass in the command line, you should now be able to see that a styles.css 