/**
 * fs-readdir <https://github.com/tunnckoCore/fs-readdir>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var ReaddirReadable = require('stream').Readable;
var noop = function() {};

module.exports = fsReaddirAsync;
module.exports.sync = fsReaddirSync;

/**
 * Reading directories recusivly.
 *
 * @param  {String}   `<root>`
 * @param  {Object}   `[opts]`
 * @param  {Function} `[callback]`
 */
function fsReaddirAsync(root, opts, callback) {
  if (typeof root !== 'string') {
    throw new TypeError('fsReaddir: expect `root` to be string');
  }
  if (typeof opts === 'function') {
    callback = opts;
    opts = {
      objectMode: true,
      EventEmitter: false,
      emitterOptions: {maxListeners: 1},
    };
  }

  opts = opts || {};

  var aborted = false;
  var stream = false;
  var ____cb = callback || noop;

  if (typeof callback !== 'function') {
    opts.objectMode = opts.objectMode || true;
    stream = new ReaddirReadable(opts);
  } else {
    if (opts.EventEmitter) {
      opts.EventEmitter.prototype.destroy = ReaddirReadable.prototype.destroy;
      stream = new opts.EventEmitter(opts.emitterOptions);
    }
  }

  if (!stream) {
    stream = {push: noop, emit: noop, destroy: noop};
  }

  callback = function callbackAndEvents(err, res) {
    ____cb(err, res);
    if (err && err instanceof Error) {
      stream.emit('error', err);
      stream.destroy();
      return;
    }
    stream.push(res);
    stream.emit('finish', res);
    stream.destroy();
  }

  var res = [];
  fs.readdir(root, function(err, files) {
    if (aborted) {return;}
    if (err) {
      return callback(err);
    }

    var pending = files.length;
    if (!pending) {
      return callback(null, res);
    }

    files.forEach(function(fp) {
      if (aborted) {return;}
      fp = path.join(root, fp)

      fs.stat(fp, function(err, stats) {
        if (aborted) {return;}
        if (err) {
          return callback(err);
        }

        if (aborted === false && stats.isDirectory()) {
          stream.emit('folder', fp);
          stream.emit('directory', fp);

          return fsReaddirAsync(fp, function(err, fps) {
            if (aborted) {return;}
            if (err) {
              return callback(err);
            }

            res = res.concat(fps);
            pending -= 1;
            if (!pending) {
              return callback(null, res);
            }
          });
        }
        if (aborted === false && stats.isFile()) {
          stream.emit('file', fp);
          res.push(fp);
          pending -= 1;
          if (!pending) {
            return callback(null, res);
          }
        }
      });
    });
  });

  return stream;
}

/**
 * `fs-readdir-recursive` without filter feature
 *
 * @param  {String} `root`
 * @param  {Array} `files`
 * @param  {String} `fp`
 * @return {Array}
 */
function fsReaddirSync(root, files, fp) {
  if (typeof root !== 'string') {
    throw new TypeError('fsReaddir.sync: expect `root` to be string');
  }

  fp = fp || '';
  files = files || [];

  var dir = path.join(root, fp);
  if (fs.statSync(dir).isDirectory()) {
    fs.readdirSync(dir).forEach(function(name) {
      fsReaddirSync(root, files, path.join(dir, name));
    });
  } else {
    files.push(fp);
  }

  return files;
}

ReaddirReadable.prototype._read = function() {};
ReaddirReadable.prototype.destroy = function() {
  if (this.push) {
    this.push(null);
  }

  this.readable = false;
  this.emit('close');
};
