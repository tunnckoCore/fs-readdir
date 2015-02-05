/**
 * fs-readdir <https://github.com/tunnckoCore/fs-readdir>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var ReaddirReadable = require('stream').Readable;

ReaddirReadable.prototype._read = function() {};
ReaddirReadable.prototype.destroy = function () {
  this.push && this.push(null);
  this.readable = false;
  this.emit('close');
}

module.exports = ReaddirReadable;
