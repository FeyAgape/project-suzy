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
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ //allows Browser Sync to inject new CSS styles (update the CSS) into the browser whenever the sass task is ran.
      stream: true
    }))
});

// run gulp sass in the command line, you should now be able to see that a styles.css 

/* // Gulp watch syntax
gulp.watch('files-to-watch', ['tasks', 'to', 'run']); */
// Gulp watch syntax
//gulp.watch('app/scss/**/*.scss', ['sass']); //tells Gulp to automatically run the sass task whenever a file is saved

// gulp.task('watch', function(){
//gulp.watch('app/scss/**/*.scss', ['sass']); 
// Other watchers
//}) to watch more than one type of file at once. To do so, we can group together multiple watch processes into a watch task
//ctrl c to cancel gulp watch in the cmd


var browserSync = require('browser-sync').create(); //create a browserSync task to enable Gulp to spin up a server using Browser Sync


/*gulp.task('watch', ['array', 'of', 'tasks', 'to', 'complete','before', 'watch'], function (){
  // adding a second argument to the watch task
})*/


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('watch',['browserSync', 'sass'], function(){ //telling the watch task that browserSync and sass runs before watch is allowed to run.
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Other watchers
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

var useref = require('gulp-useref'); /*Gulp-useref concatenates any number of CSS and JavaScript 
files into a single file by looking for a comment that starts with "<!--build:" and ends with "<!--endbuild-->"*/

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
}); //run gulp useref in the cmd to run

// Other requires...
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});

var cssnano = require('gulp-cssnano');

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});