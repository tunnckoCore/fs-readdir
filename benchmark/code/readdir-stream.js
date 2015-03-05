var rs = require('readdir-stream');

module.exports = function index(root, cb) {
  return rs(root + '/benchmark/').on('data', cb);
};
