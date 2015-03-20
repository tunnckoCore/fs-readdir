var path = require('path');
var gfs = require('../../glob-fs');

module.exports = function index(root, cb) {
  root = path.join(root, 'playing');
  return gfs(root + '/**/*', {
    cwd: root,
    dot: true
  }).on('data', cb);
};
