var path = require('path');
var self = require('../../index');

module.exports = function index(root, cb) {
  root = path.join(root, '../playing');
  return self(root, false).on('data', cb);
};
