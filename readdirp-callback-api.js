var readdirp = require('readdirp');

module.exports = function readdir(root, cb) {
  return readdirp({root: root}, cb);
}

