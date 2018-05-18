// Requiring Gulp
var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
// Requiring autoprefixer
var autoprefixer = require('gulp-autoprefixer');


//this task just prints Hello Fey! when runned 
//gulp.task('hello', function() {
//  console.log('Hello Fey!');

gulp.task('sass', function(){
  //return gulp.src('app/scss/styles.scss') // this only lets use compile .scss file
  // using globbing allow us to compile more than one
  return gulp.src('app/scss/**/*.scss') // using Globbing gets all files ending with .scss in app/scss and children dirs
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(autoprefixer()) // Passes it through gulp-autoprefixer
    .pipe(gulp.dest('app/css'))
});

// Gulp watch syntax, run gulp watch in the command line to activate
//gulp.watch('app/scss/**/*.scss', ['sass']); // this only allows us to watch one type of file
//to watch multi tasks we can group together multiple watch processes into a watch task
gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Other watchers
})