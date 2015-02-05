var gs = require('glob-stream');

module.exports = function readdir(root, cb) {
  return gs.create([root + '/*.*', root + '/.*'], {cwd: __dirname}).on('data', cb);
}
