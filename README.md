# Gulp-Project-Template-2: A project using gulp

## Gulp Sass
## Gulp autoprefixer
## Gulp Watch
## Browsersync

### Installation

You need to have Node.js (Node) installed onto your computer before you can install Gulp.

If you do not have Node installed already, you can get it by downloading the package installer from [Node's website](https://nodejs.org/).

**When you're done with installing Node, you can install Gulp by using the following command in the command line:**

For Windows
`npm install gulp -g`

For Mac
`sudo npm install gulp -g`

The npm install command used here is a command that uses Node Package Manager (npm) to install Gulp onto your computer.

The -g flag in this command tells npm to install Gulp globally onto your computer, which allows you to use the gulp command anywhere on your system.

Mac users need the extra sudo keyword in the command because they need administrator rights to install Gulp globally.

## Creating a Gulp Project

First, we'll create a folder called **project** or whatever you want to name your project. Then run the npm init command from inside that directory:
` npm init`

npm init will prompt you: to enter the project name, version, description, etc

**Example** 

`package.json:`

`{
  "name": "project",
  "version": "1.0.0",
  "description": "This is a gulp project",
  "main": "index.js",
  "scripts": {
    "test": "echo"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Username/Project.git"
  },
  "author": "First-name Last-name",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Username/Project/issues"
  },
  "homepage": "https://github.com/Username/Project#readme"
}`


### Step 1: Install Gulp in your project

The first dependency in our project is Gulp since we’re using it as our build tool. You’ll have to install gulp within the project folder by augmenting the install code slightly:

`npm install gulp --save-dev`

This time, we're installing Gulp into project instead of installing it globally, which is why there are some differences in the command.

You'll see that the sudo keyword isn't required because we're not installing Gulp globally, so -g is also not necessary. We've added --save-dev, which tells the computer to add gulp as a dev dependency in package.json

**If you check the project folder when the command has finished executing, you should see that Gulp has created a node_modules folder. You should also see a gulp folder within node_modules.**

### Step 2: Create your project structure

Next, we’ll have to create a file structure and a gulpfile.js file to store all our Gulp configurations.

Create the structure of your app: (here is a generic webapp structure)

  |- app/
  |- app/|- css/
  |- app/|- fonts/
  |- app/|- images/ 
  |- app/|- index.html
  |- app/|- js/ 
  |- app/|- scss/styles.scss
  |- dist/
  |- gulpfile.js
  |- node_modules/
  |- package.json

**In this structure, the app folder will store all our written code, and the dist folder will be used to store code that’s production-ready.**

### Step 3: Writing Your First Gulp Task

The first step to using Gulp is to require it in the gulpfile.

`var gulp = require('gulp');`

The require statement tells Node to look into the node_modules folder for a package named gulp. Once the package is found, we assign its contents to the variable gulp.

We can now begin to write a gulp task with this gulp variable. The basic syntax of a gulp task is:

`gulp.task('task-name', function() {
  // Stuff here
});`

Gulp tasks are usually a bit more complex than this. It usually contains two additional Gulp methods, plus a variety of Gulp plugins.

Here's what a real task may look like:

`gulp.task('task-name', function () {
  return gulp.src('source-files') // Get source files with gulp.src
    .pipe(aGulpPlugin()) // Sends it through a gulp plugin
    .pipe(gulp.dest('destination')) // Outputs the file in the destination folder
})`

As you can see, a real task takes in two additional gulp methods — gulp.src and gulp.dest.

**gulp.src tells the Gulp task what files to use for the task, while gulp.dest tells Gulp where to output the files once the task is completed.**

### Step 4: A real task where we compile Sass files into CSS files.

We can compile Sass to CSS in Gulp with the help of a plugin called `gulp-sass`. You can install gulp-sass into your project by using the npm install command like we did for gulp.

We'd also want to use the --save-dev flag to ensure that gulp-sass gets added to devDependencies in package.json.

`$ npm install gulp-sass --save-dev`

We have to require gulp-sass from the node_modules folder just like we did with gulp before we can use the plugin in the gulpfile.js.

`var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');`

We can use gulp-sass by replacing a GulpPlugin() with sass(). Since the task is meant to compile Sass into CSS, let's name it sass.

`gulp.task('sass', function(){
  return gulp.src('source-files')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('destination'))
});`


`gulp.task('sass', function(){
  return gulp.src('app/scss/styles.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
});`

We'll want to test that the sass task is working as we want it to. To do so, we can add a Sass function within styles.scss.

`// styles.scss
.testing {
  width: percentage(5/7);
}`

If you run **`gulp sass`** in the command line, you should now be able to see that a styles.css file was created in app/css. In addition, it has the code where percentage(5/7) was evaluted into 71.42857%.

And that's how we know that the sass task works!

Sometimes we need the ability to compile more than one .scss file into CSS at the same. We can do so with the help of Node globs.

**FYI:** Gulp-sass uses LibSass to convert Sass into CSS. It's much quicker than Ruby-based methods. If you want, you can still use Ruby methods with Gulp by using gulp-ruby-sass or gulp-compass instead.

### Step 5: Globbing in Node

Globs are matching patterns for files that allow you to add more than one file into gulp.src. It's like regular expressions, but specifically for file paths.

When you use a glob, the computer checks file names and paths for the specified pattern. If the pattern exists, then a file is matched.

Most workflows with Gulp tend to only require 4 different globbing patterns:

1. `*.scss`: The `*` pattern is a wildcard that matches any pattern in the current directory. In this case, we’re matching any files ending with .scss in the root folder (project).

2. `**/*.scss`: This is a more extreme version of the `*` pattern that matches any file ending with .scss in the root folder and any child directories.

3. `!not-me.scss`: The `!` indicates that Gulp should exclude the pattern from its matches, which is useful if you had to exclude a file from a matched pattern. In this case, not-me.scss would be excluded from the match.

4. `*.+(scss|sass)`: The plus `+` and parentheses `()` allows Gulp to match multiple patterns, with different patterns separated by the pipe | character. In this case, Gulp will match any file ending with .scss or .sass in the root folder.

Since we know about globbing now, we can replace app/scss/styles.scss with a scss/**/*.scss pattern, which matches any file with a .scss extension in app/scss or a child directory.


``gulp.task('sass', function(){
  //return gulp.src('app/scss/styles.scss') // this only lets use compile .scss file, while the method below 
  // using globbing allow us to compile more than one
   return gulp.src('app/scss/**/*.scss') // using Globbing Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
});``

Any other Sass file that's found within app/scss would automatically be included into the sass task with this change.

### Step 6(optional): Adding more functionality to the sass task

Just compiling from Sass to CSS isn’t good enough. Sometimes it makes more sense to add more plugins to make thing simpler for us. One of the best plugins that you’ll ever use when converting from Sass to CSS is autoprefixer,which helps you write vendor prefixes according to caniuse.

Let’s try adding autoprefixer to our sass task.

To do so, we’ll have to install the gulp plugin for autoprefixer.

`npm install gulp-autoprefixer --save-dev`

Then we’ll have to require autoprefixer.

`var gulp = require('gulp');
var sass = require('gulp-sass');
// Requiring autoprefixer
var autoprefixer = require('gulp-autoprefixer');`

Autoprefixer is usually placed after Sass is compiled into CSS. In Gulp, we’ll want to add another .pipe() so the resultant CSS gets passed through autoprefixer before it’s created as styles.css in app/css.


### Step 7: Watching Sass files for changes

Luckily, we can tell Gulp to automatically run the sass task whenever a file is saved through a process called "watching".

Gulp provides us with a watch method that checks to see if a file was saved. The syntax for the watch method is:

`// Gulp watch syntax
gulp.watch('files-to-watch', ['tasks', 'to', 'run']);`

If we want to watch all Sass files and run the sass task whenever a Sass file is saved, we just have to replace files-to-watch with the `app/scss/**/*.scss, and ['tasks', 'to', 'run'] with ['sass']:`

`// Gulp watch syntax
gulp.watch('app/scss/**/*.scss', ['sass']);`

More often though, we'll want to watch more than one type of file at once. To do so, we can group together multiple watch processes into a watch task:

`gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Other watchers
  gulp.watch('app/*.html'); 
  gulp.watch('app/js/**/*.js');
})`

If you ran the `gulp watch` command right now, you'll see that Gulp starts watching immediately.

And than it automatically runs the sass task whenever you save a .scss file. To cancel Gulp watch is `Crtl c`

### Step 8: Live-reloading with Browser Sync

Browser Sync helps make web development easier by spinning up a web server that helps us do live-reloading easily. 
We'll first have to install Browser Sync:

`npm install browser-sync --save-dev`


You may have noticed that there isn't a gulp- prefix when we install Browser Sync. This is because Browser Sync works with Gulp, so we don't have to use a plugin.

To use Browser Sync, we'll have to require Browser Sync

`var browserSync = require('browser-sync').create();`

We need to create a browserSync task to enable Gulp to spin up a server using Browser Sync. Since we're running a server, we need to let Browser Sync know where the root of the server should be. In our case, it's the `app` folder:

`gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})`
We also have to change our sass task slightly so Browser Sync can inject new CSS styles (update the CSS) into the browser whenever the sass task is ran.

`gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});`

We're done with configuring Browser Sync. Now, we have to run both the watch and browserSync tasks at the same time for live-reloading to occur.

It'll be cumbersome to open up two command line windows and run gulp browserSync and gulp watch separately, so let's get Gulp to run them together by telling the watch task that browserSync must be completed before watch is allowed to run.

We can do so by adding a second argument to the watch task. The syntax is:

`gulp.task('watch', ['array', 'of', 'tasks', 'to', 'complete','before', 'watch'], function (){
  // ...
})`

And in this case we're adding the browserSync task.

`gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});`

