var self = require('../../index');

module.exports = function index(root, cb) {
  return self(root + '/benchmark/', false).on('data', cb);
};
