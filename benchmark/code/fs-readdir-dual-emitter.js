var self = require('../../index');
var DualEmitter = require('dual-emitter');

module.exports = function index(root, cb) {
  return self(root, {EventEmitter: DualEmitter}, cb).on('finish', cb);
};
