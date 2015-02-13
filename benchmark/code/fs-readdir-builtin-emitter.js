var self = require('../../index');
var EventEmitter = require('events').EventEmitter;

module.exports = function index(root, cb) {
  return self(root, {EventEmitter: EventEmitter}, cb).on('finish', cb);
};
