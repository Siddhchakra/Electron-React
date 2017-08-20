const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const util = require('gulp-util');
const runSequence = require('run-sequence');
const del = require('del');

gulp.task('build:clean', function () {
    util.log(util.colors.yellow('deleting contents of build folder'));
    return del([
        'build/**/*'
    ]);
});

gulp.task('build:copyHTML', function () {
    util.log(util.colors.yellow('copying html to build folder'));
    return gulp
        .src('src/**/*.html', { base: './src' })
        .pipe(gulp.dest('build'))
});

gulp.task('build:ts', [], function () {
    return gulp
        .src(['src/**/*.ts', 'src/**/*.tsx'], { base: 'src' })
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .on('error', function (e) { handleBuildError(e.message); })
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('build'))
});

gulp.task('build:copyJS', function () { //hope to remove this once all source files are TypeScript
    util.log(util.colors.yellow('copying static JS to build folder'));

    return gulp
        .src(['src/**/*.js', '!app/src/**/*.es6.js'], { base: './src' })
        .pipe(gulp.dest('build'))
});

gulp.task('build:styles', function () {
    util.log(util.colors.yellow('compiling sass to build folder css'));
    return gulp
        .src('src/**/*.scss', { base: './src' })     // get all files in config
        .pipe(sourcemaps.init())                      // start sourcemap tracking
        .pipe(sass({                                  // turn scss files into css files
            errLogToConsole: true,
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write({ includeContent: false })) // ugly hack since partials were not getting sourcemapped correctly 
        .pipe(sourcemaps.init({ loadMaps: true }))         // perhaps gulp-sourcemaps update will fix...
        .pipe(sourcemaps.write('.'))                 // write the map file
        .pipe(gulp.dest('build'))                // write the css file
});

gulp.task('build', function (cb) {
    runSequence('build:clean',
        ['build:copyJS', 'build:copyHTML', 'build:ts', 'build:styles'],
        function (err) {
            //if any error happened in the previous tasks, exit with a code > 0
            if (err) {
                return handleBuildError(err);
            } else {
                return cb();
            }
        }
    );
});

function handleBuildError(err) {
    let exitCode = 2;
    console.log('[ERROR] gulp build task failed', err);
    console.log('[FAIL] gulp build task failed - exiting with code ' + exitCode);
    return process.exit(exitCode);
}