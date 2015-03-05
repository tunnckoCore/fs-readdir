var gs = require('glob-stream');

module.exports = function index(root, cb) {
  return gs.create([
    root + '/benchmark/*.*',
    root + '/benchmark/**/*.*',
    root + '/benchmark/**/.*',
    root + '/benchmark/.*'
  ], {
    cwd: root
  }).on('data', cb);
};
