var self = require('../../index');

module.exports = function index(root, cb) {
  return self(root, false).on('data', cb);
};
