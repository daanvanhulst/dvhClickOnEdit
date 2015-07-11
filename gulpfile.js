'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
	debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    tsc = require('gulp-typescript'),
	sourcemaps = require('gulp-sourcemaps'),
	ngHtml2Js = require("gulp-ng-html2js"),
	minifyHtml = require("gulp-minify-html"),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
	ngAnnotate = require('gulp-ng-annotate'),
    ngDocs = require('gulp-ng-ts-docs'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    tslint = require('gulp-tslint'),
    livereload = require('gulp-livereload'),
	karma = require('karma').server,
	gutil = require('gulp-util'),
    del = require('del'),
    p = require('./package.json'),
    Config = require('./gulpfile.config');

var config = new Config();

gulp.task('clean', function () {
  del(['dist/']);
});

gulp.task('karma-watch', function() {
  karma.start({
    configFile:  __dirname + '/karma.conf.js'
  });
});

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('gen-ts-refs', function () {
    var target = gulp.src(config.appTypeScriptReferences);
    var sources = gulp.src([config.allTypeScript], {read: false});

    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript).pipe(tslint()).pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var sourceTsFiles = [config.allTypeScript,                //path to typescript files
                         config.libraryTypeScriptDefinitions, //reference to library .d.ts files
                         config.appTypeScriptReferences];     //reference to app.d.ts files

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc({
                           target: 'ES5',
                           declarationFiles: false,
                           noExternalResolve: false
                       }));

        tsResult.dts.pipe(gulp.dest(config.distPath));
        return tsResult.js
						.pipe(ngAnnotate())
                        .pipe(concat(p.name + ".min.js"))
                        .pipe(uglify())
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest(config.distPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
  var typeScriptGenFiles = [config.distPath,         // path to generated JS files
                            config.source + '**/*.js',    // path to all JS files auto gen'd by editor
                            config.source + '**/*.js.map' // path to all sourcemap files auto gen'd by editor
                           ];

  // delete the files
  del(typeScriptGenFiles, cb);
});

// app.less contains all the imports
// use notify if you are using a mac
gulp.task('compile-less', function () {
    return gulp.src([config.mainLessFile]) 
        .pipe(less({compress: true}).on('error', gutil.log))
        .pipe(autoprefixer('last 10 versions', 'ie 9'))
        .pipe(minifycss({keepBreaks: false}))
        .pipe(gulp.dest(config.distPath));
        //.pipe(notify('Less Compiled, Prefixed and Minified'))
});

gulp.task('html2js', function() {
	return gulp.src(config.source + "**/*.html")
    .pipe(sourcemaps.init())
    .pipe(minifyHtml({
        empty: true,
        spare: true,
        quotes: true
    }))
    .pipe(ngHtml2Js({
        moduleName: p.name + "-tpl",
        prefix: p.name + "/"
    }))
    .pipe(uglify())
    .pipe(concat(p.name + ".tpl.min.js"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.distPath));
});

gulp.task('ngdocs', [], function () {

    return gulp.src('./src/**/*.ts')
        .pipe(debug({title: "ngdocs"}))
        .pipe(ngDocs.process())
        .pipe(gulp.dest('./docs'));
});

gulp.task('watch', function() {
    gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts', 'gen-ts-refs', 'ngdocs']);
    gulp.watch([config.AllLESS], ['compile-less']);
    gulp.watch([config.AllHTML], ['html2js']);
});

gulp.task(
	'build', 
		['clean', 'compile-less', 'ts-lint', 'compile-ts', 'gen-ts-refs', 'html2js', 'ngdocs']
);

gulp.task(
	'default', 
		['build', 'watch', 'karma-watch']
);