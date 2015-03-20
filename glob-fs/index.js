/*!
 * readdir-stream
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var fs = require('fs');
var File = require('vinyl');
var mm = require('micromatch');
var path = require('path');
var each = require('each-async');
var flatten = require('arr-flatten');
var isGlob = require('is-glob');
var unique = require('array-unique');
var globBase = require('glob-parent');
var debug = require('debug')('glob-fs');
var Readable = require('stream').Readable;
var inherits = require('util').inherits;
var stripBom = require('strip-bom');

/*!
 * Primary export
 */

module.exports = GlobFS;

/**
 * ### GlobFS(dir)
 *
 * A readable object-mode stream that recursively
 * reads a directory and pushes objects containing
 * the path and `fs.stat` object for each entry.
 *
 * @param {String} start directory
 * @return {Readable} stream
 */

function GlobFS(patterns, opts) {
  if (!(this instanceof GlobFS)) {
    return new GlobFS(patterns, opts);
  }
  if (!Array.isArray(patterns) && typeof patterns !== 'string') {
    throw new TypeError('[glob-fs] expects `patterns` be string or array');
  }
  Readable.call(this, {objectMode: true, highWaterMark: 1});

  opts = opts || {};
  opts.cwd = typeof opts.cwd !== 'string' ? process.cwd() : opts.cwd;
  opts.base = opts.cwdbase ? opts.cwd : opts.base;


  this.options = opts;
  this.patterns = unique(flatten(arrayify(patterns)));
  this.negatives = [];
  this.positives = [];

  var i = 0;
  var len = this.patterns.length;
  var self = this;

  while (i < len) {
    if (typeof this.patterns[i] !== 'string') {
      throw new TypeError('[glob-fs] invalid pattern ' + this.patterns[i] + ' at index ' + i);
    }

    var globs = this.patterns[i].charCodeAt(0) === 33 /* '!' */
      ? this.negatives
      : this.positives;

    this.patterns[i] = unrelative(self.options.cwd, this.patterns[i]);

    globs.push(this.patterns[i]);
    i++;
  }

  if (this.positives.length === 0) {
    throw new Error('[glob-fs] missing positive glob');
  }

  if (this.positives.length === 1) {
    if (isGlob(this.positives[0])) {
      this.positives[0] = globBase(this.positives[0]);
    }
    this.bases = [this.positives[0]]
  } else {
    this.bases = this.positives.map(function _eachPositive(pattern) {
      return isGlob(pattern) ? globBase(pattern) : path.dirname(pattern);
    })
  }

  this.filter = mm.filter(this.patterns, this.options);
}

/*!
 * Inherit from readable
 */

inherits(GlobFS, Readable);

/*!
 * Implement readable.
 *
 * @emit `error` on fs errors
 */

GlobFS.prototype._read = function __read() {
  var self = this;
  var queue = this.bases;

  if (!queue.length) {
    debug('(end)');
    this.push(null);
    return;
  }

  function error(err) {
    debug('(error) %s', err.message);
    self.emit('error', err);
  }

  function push(obj) {
    debug('(push) %s', obj.path);
    if ([obj.path].filter(self.filter).length) {
      debug('(match) %s', obj.path);

      self.push(obj);
      return;
    }

    self._read();
  }

  function readdir(dir, done) {
    debug('(readdir) %s', dir);
    fs.readdir(dir, function(err, filepaths) {
      if (err) return error(err);

      filepaths = filepaths.map(function _map(fp) {
        return path.join(dir, fp);
      });

      each(filepaths, function _eachFilepaths(fp, i, next) {
        debug('(queue) %s', fp);
        queue.push(fp);

        next();
      }, done);
    });
  }

  var entry = queue.shift();
  debug('(stat) %s', entry);
  fs.stat(entry, function(err, stat) {
    if (err) return error(err);

    var vinyl = new File({
      path: entry,
      stat: stat,
      base: self.options.base || path.dirname(entry),
      cwd: self.options.cwd
    });

    if (self.options.src) {
      if (stat.isFile()) {
        vinyl.contents = stripBom(fs.readFileSync(vinyl.path), 'utf-8')
      }
      if (vinyl.isStream()) {
        vinyl.contents = fs.createReadStream(vinyl.path).pipe(stripBom.stream());
      }
    }

    if (stat.isDirectory()) {
      readdir(entry, function() {
        push(vinyl);
      });
    } else {
      push(vinyl);
    }
  });
}




/**
 * utils
 */

function arrayify(val) {
  return !Array.isArray(val)
    ? [val]
    : val;
};

function unrelative(cwd, glob) {
  var negate = '';
  var ch = glob.charAt(0);
  if (ch === '!') {
    negate = ch;
    glob = glob.slice(1);
  }
  return negate + path.resolve(cwd, glob);
}

function bufferFile(file, cb) {
  fs.readFile(file.path, function(err, data) {
    if (err) {
      return cb(err);
    }
    file.contents = stripBom(data);
    cb(null, file);
  });
}

