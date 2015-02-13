var readdirp = require('readdirp');

module.exports = function index(root, cb) {
  return readdirp({root: root}).on('data', cb);
};
