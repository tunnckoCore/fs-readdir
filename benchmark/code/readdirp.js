var path = require('path');
var readdirp = require('readdirp');

module.exports = function index(root, cb) {
  root = path.join(root, '../playing');
  return readdirp({root: root}).on('data', cb);
};
