/**
 * fs-readdir <https://github.com/tunnckoCore/fs-readdir>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var eachAsync = require('each-async');
var hybridify = require('hybridify');

module.exports = hybridify(fsReaddirAsync);
module.exports.sync = fsReaddirSync;

/**
 * Reading directories recusivly.
 *
 * @param  {String}   `root`
 * @param  {Function} `cb`
 * @return {Promise}
 */
function fsReaddirAsync(root, cb) {
  if (typeof root !== 'string') {
    throw new TypeError('fsReaddir: expect `root` to be string');
  }
  if (typeof cb !== 'function') {
    throw new TypeError('fsReaddir: expect `cb` to be function');
  }

  var res = [];
  fs.readdir(root, function(err, files) {
    if (err) {
      cb(err);
      return;
    }

    var pending = files.length;
    if (!pending) {
      cb(null, res);
      return;
    }

    eachAsync(files, function(fp) {
      fp = path.join(root, fp)

      fs.stat(fp, function(err, stats) {
        if (err) {
          cb(err);
          return;
        }
        if (stats.isDirectory()) {
          // again!
          fsReaddirAsync(fp, function(err, fps) {
            if (err) {
              cb(err);
              return;
            }

            res = res.concat(fps);
            pending -= 1;
            if (!pending) {
              cb(null, res);
            }
          });
          return;
        }
        res.push(fp);
        pending -= 1;
        if (!pending) {
          cb(null, res);
        }
      });
    });
  });
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
