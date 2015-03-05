var gs = require('glob-stream')
var rs = require('readdir-stream')
var fs = require('../index')
var th = require('through2')
var ee = require('events').EventEmitter;
var i = 0;
var root = process.cwd();

// fs(root + '/benchmark', false).on('data', function(files) {
//   console.log(files.length)
// })
// fs(root + '/benchmark', {EventEmitter: ee}).on('data', function(files) {
//   console.log(files.length)
// })
// gs.create([
//   root + '/benchmark/*.*',
//   root + '/benchmark/**/*.*',
//   root + '/benchmark/**/.*',
//   root + '/benchmark/.*'
// ], {
//   cwd: root
// }).on('data', function(files) {
//   console.log(i++)
// })
// rs(root + '/benchmark').on('data', function(file) {
//   console.log(file.path)
// })
