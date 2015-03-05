var self = require('../../index');
var EventEmitter = require('events').EventEmitter;

module.exports = function index(root, cb) {
  return self(root + '/benchmark/', {EventEmitter: EventEmitter}).on('data', cb);
};
