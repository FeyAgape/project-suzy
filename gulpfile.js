// Requiring Gulp
var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
// Requiring autoprefixer
var autoprefixer = require('gulp-autoprefixer');
// Requiring browserSync
var browserSync = require('browser-sync').create(); //create a browserSync task to enable Gulp to spin up a server using Browser Sync

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('sass', function(){
  //return gulp.src('app/scss/styles.scss') // this only lets us compile .scss file
  // using globbing allow us to compile more than one
  return gulp.src('app/scss/**/*.scss') // using Globbing gets all files ending with .scss in app/scss and children dirs
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(autoprefixer()) // Passes it through gulp-autoprefixer
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Gulp watch syntax, run gulp watch in the command line to activate
//to watch multi tasks we can group together multiple watch processes into a watch task
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  //other watchers 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});