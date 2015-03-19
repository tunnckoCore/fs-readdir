var path = require('path');
var self = require('../index');
var gs = require('glob-stream');
var rs = require('readdir-stream');
var rp = require('readdirp');
var ii = 1;

function fsReaddir(root, cb) {
  root = path.join(root, 'playing');
  return self(root, false).on('data', cb);
}

function globStream(root, cb) {
  root = path.join(root, 'playing');
  return gs.create([
    root + '/*.*',
    root + '/**/*.*',
    root + '/**/.*',
    root + '/.*'
  ], {
    cwd: root
  }).on('data', cb);
}

function readdirStream(root, cb) {
  root = path.join(root, 'playing');
  return rs(root).on('data', cb);
}

function readdirp(root, cb) {
  root = path.join(root, 'playing');
  return rp({root: root}).on('data', cb);
}


// fsReaddir(__dirname, function(fp) {
//   console.log(fp.length) // 1300
// });

// globStream(__dirname, function(file) {
//   console.log(file.path, ii++) // 1300
// });

// ii = 1;
// readdirStream(__dirname, function(file) {
//   console.log(file.path, ii++) // 1303
// });

// ii = 1
// readdirp(__dirname, function(file) {
//   console.log(file.fullPath, ii++) // 1300
// });
