var path = require('path');
var gs = require('glob-stream');

module.exports = function index(root, cb) {
  root = path.join(root, '../playing');
  return gs.create([
    root + '/*.*',
    root + '/**/*.*',
    root + '/**/.*',
    root + '/.*'
  ], {
    cwd: root
  }).on('data', cb);
};
