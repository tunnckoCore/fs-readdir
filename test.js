/**
 * fs-readdir <https://github.com/tunnckoCore/fs-readdir>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var fsReaddir = require('./index');

// Hybrid (Async) API - Promise + callback
// fsReaddir('../dotfiles', function __cb(err, res) {
//   console.log('__cb err:', err);
//   console.log('__cb res:', res);
// })
// .then(function __fulfilled(res) {
//   console.log('__fulfilled:', res);
// })
// .catch(function __rejected(err) {
//   console.log('__rejected:', err);
// })

// Sync API
// console.log(fsReaddir.sync('../dotfiles'));
