## [![npm][npmjs-img]][npmjs-url] [![mit license][license-img]][license-url] [![build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![deps status][daviddm-img]][daviddm-url]

> fs.readdir done right! Support sync, async and stream API, recursiveness and filters.

## Install, Test & Benchmark
```
npm i --save fs-readdir
node benchmark
```


## Usage
> For more use-cases see the [tests](./test.js)

```js
var fsReaddir = require('fs-readdir');
var through2 = require('through2');

// callback api
fsReaddir('../gitclone-cli', function _cb(err, filepaths) {
  // as usual
  console.log('callback err:', err)
  console.log('callback res:', filepaths)
});


// as stream
var stream = fsReaddir('../gitclone-cli')
.on('error', function(err) {
  console.log('error:', err);
})
.on('finish', function(obj) {
  console.log('finish:', obj);
})
.on('data', function(obj) {
  console.log('data:', obj);
})
.on('folder', function(folder) {
  console.log('folder:', folder);
})
.on('file', function(file) {
  console.log('file:', file);
})
.pipe(through2.obj(function(objArray, enc, next) {
  objArray = objArray.map(function(fp) {
    return path.basename(fp);
  })
  console.log('pipe1:', objArray);
  this.push(objArray)
  next();
})).pipe(through2.obj(function(modified, enc, next) {
  console.log('pipe2:', modified);
  this.push(modified)
  next();
}))
```


## Benchmark

```
charlike@node:~/dev/fs-readdir$ node benchmark
```
> Sometimes `fs-readdir-callback-api.js` and `recursive-readdir.js` are above 80-90k.  
But this speed of recursive-readdir is after minimatch -> micromatch.


## Author
**Charlike Mike Reagent**
+ [gratipay/tunnckoCore][author-gratipay]
+ [twitter/tunnckoCore][author-twitter]
+ [github/tunnckoCore][author-github]
+ [npmjs/tunnckoCore][author-npmjs]
+ [more ...][contrib-more]


## License [![MIT license][license-img]][license-url]
Copyright (c) 2014-2015 [Charlike Mike Reagent][contrib-more], [contributors][contrib-graf].  
Released under the [`MIT`][license-url] license.


[npmjs-url]: http://npm.im/fs-readdir
[npmjs-img]: https://img.shields.io/npm/v/fs-readdir.svg?style=flat&label=fs-readdir

[coveralls-url]: https://coveralls.io/r/tunnckoCore/fs-readdir?branch=master
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/fs-readdir.svg?style=flat

[license-url]: https://github.com/tunnckoCore/fs-readdir/blob/master/license.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat

[travis-url]: https://travis-ci.org/tunnckoCore/fs-readdir
[travis-img]: https://img.shields.io/travis/tunnckoCore/fs-readdir.svg?style=flat

[daviddm-url]: https://david-dm.org/tunnckoCore/fs-readdir
[daviddm-img]: https://img.shields.io/david/tunnckoCore/fs-readdir.svg?style=flat

[author-gratipay]: https://gratipay.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-npmjs]: https://npmjs.org/~tunnckocore

[contrib-more]: http://j.mp/1stW47C
[contrib-graf]: https://github.com/tunnckoCore/fs-readdir/graphs/contributors

***

_Powered and automated by [kdf](https://github.com/tunnckoCore), February 13, 2015_