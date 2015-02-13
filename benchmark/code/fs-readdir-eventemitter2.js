var self = require('../../index');
var Emitter2 = require('eventemitter2').EventEmitter2;

module.exports = function index(root, cb) {
  return self(root, {EventEmitter: Emitter2}, cb).on('finish', cb);
};
