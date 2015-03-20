var fs = require('fs');
var gfs = require('./index');
var vfs = require('vinyl-fs');
var gulp = require('gulp');
var assert = require('assert');
var globStream = require('glob-stream');

var globStreamPatterns = [
  'playing/**/*.*',
  '!playing/a/[e-z][0-9].*',
  '!playing/**/*.{md,txt,json,hbs}'
];
var globFsPatterns = [
  'playing/**/*',
  '!playing/a/{e..z}{0..9}.*',
  '!playing/**/*.(md|txt|json|hbs)'
];

console.log('glob-stream');
var globStream_i = 0;
globStream.create(globStreamPatterns, {cwd: __dirname})
.on('data', function(file) {
  if (fs.statSync(file.path).isFile()) {
    assert.ok(fs.readFileSync(file.path, 'utf-8').length > 0);
    globStream_i++;
  }
});

console.log('gulp');
var gulp_i = 0;
gulp.src(globStreamPatterns, {cwd: __dirname})
.on('data', function(file) {
  if (!file.isNull()) {
    assert(file.contents.length > 0);
    gulp_i++;
  }
})
.on('end', function() {
  console.log('gulp:', gulp_i);
});

console.log('vinyl-fs');
var vfs_i = 0;
vfs.src(globStreamPatterns, {cwd: __dirname})
.on('data', function(file) {
  if (!file.isNull()) {
    assert(file.contents.length > 0);
    vfs_i++;
  }
})
.on('end', function() {
  console.log('vinyl-fs:', vfs_i);
});

console.log('glob-fs');
var gfs_i = 0;
gfs(globFsPatterns, {cwd: __dirname, src: true})
.on('data', function(file) {
  if (!file.isNull()) {
    assert(file.contents.length > 0);
    gfs_i++;
  }
})
.on('end', function() {
  console.log('glob-fs:', gfs_i);
});

