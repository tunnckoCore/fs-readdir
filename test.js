/**
 * fs-readdir <https://github.com/tunnckoCore/fs-readdir>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';




var path = require('path');
var through2 = require('through2');
var fsReaddir = require('./index');

var CoreEmitter = require('events').EventEmitter;
var DualEmitter = require('dual-emitter');
var Emitter2 = require('eventemitter2').EventEmitter2;

// var stream = fsReaddir('../gitclone-cli')
// .on('error', function(err) {
//   console.log('ERR', err);
// })
// .on('finish', function(obj) {
//   console.log('finish', obj);
// })
// .on('data', function(obj) {
//   console.log('data', obj);
// })
// .on('folder', function(folder) {
//   console.log('folder', folder);
// })
// .on('file', function(file) {
//   console.log('file', file);
// })
// .pipe(through2.obj(function(objArray, enc, next) {
//   objArray = objArray.map(function(fp) {
//     return path.basename(fp);
//   })
//   console.log('pipe1', objArray);
//   this.push(objArray)
//   next();
// })).pipe(through2.obj(function(modified, enc, next) {
//   console.log('pipe2', modified);
//   this.push(modified)
//   next();
// }))


// .then(function __fulfilled(res) {
//   console.log('__fulfilled:', res);
// })
// .catch(function __rejected(err) {
//   console.log('__rejected:', err);
// })

// Sync API
// console.log(fsReaddir.sync('../dotfiles'));
