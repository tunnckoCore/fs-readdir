var path = require('path');
var rs = require('readdir-stream');

module.exports = function index(root, cb) {
  root = path.join(root, '../playing');
  return rs(root).on('data', cb);
};
