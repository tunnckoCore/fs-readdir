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
#1: simple.js 
  fs-readdir-builtin-emitter.js x 46,994 ops/sec ±13.86% (48 runs sampled)
  fs-readdir-callback-api.js x 54,294 ops/sec ±6.17% (59 runs sampled)
  fs-readdir-dual-emitter.js x 19,177 ops/sec ±8.48% (51 runs sampled)
  fs-readdir-eventemitter2.js x 75,735 ops/sec ±36.43% (51 runs sampled)
  fs-readdir-stream-api.js x 18,181 ops/sec ±7.42% (65 runs sampled)
  glob-stream.js x 505 ops/sec ±5.54% (72 runs sampled)
  readdirp-callback-api.js x 17,271 ops/sec ±19.92% (39 runs sampled)
  readdirp-stream-api.js x 3,458 ops/sec ±6.40% (56 runs sampled)
  recursive-readdir.js x 36,467 ops/sec ±8.17% (51 runs sampled)

  fastest is fs-readdir-callback-api.js
charlike@node:~/dev/fs-readdir$ node benchmark
#1: simple.js 
  fs-readdir-builtin-emitter.js x 61,303 ops/sec ±13.48% (53 runs sampled)
  fs-readdir-callback-api.js x 104,814 ops/sec ±8.41% (59 runs sampled)
  fs-readdir-dual-emitter.js x 29,277 ops/sec ±15.30% (50 runs sampled)
  fs-readdir-eventemitter2.js x 43,540 ops/sec ±31.92% (55 runs sampled)
  fs-readdir-stream-api.js x 37,138 ops/sec ±8.37% (60 runs sampled)
  glob-stream.js x 432 ops/sec ±27.02% (52 runs sampled)
  readdirp-callback-api.js x 6,506 ops/sec ±7.89% (57 runs sampled)
  readdirp-stream-api.js x 4,579 ops/sec ±59.87% (4 runs sampled)
  recursive-readdir.js x 32,405 ops/sec ±12.46% (25 runs sampled)

  fastest is fs-readdir-callback-api.js
charlike@node:~/dev/fs-readdir$ node benchmark
#1: simple.js 
  fs-readdir-builtin-emitter.js x 35,380 ops/sec ±16.06% (46 runs sampled)
  fs-readdir-callback-api.js x 55,063 ops/sec ±17.40% (45 runs sampled)
  fs-readdir-dual-emitter.js x 22,400 ops/sec ±7.50% (71 runs sampled)
  fs-readdir-eventemitter2.js x 34,917 ops/sec ±9.39% (49 runs sampled)
  fs-readdir-stream-api.js x 66,513 ops/sec ±24.33% (42 runs sampled)
  glob-stream.js x 500 ops/sec ±7.51% (72 runs sampled)
  readdirp-callback-api.js x 11,054 ops/sec ±10.86% (47 runs sampled)
  readdirp-stream-api.js x 2,277 ops/sec ±5.37% (68 runs sampled)
  recursive-readdir.js x 12,956 ops/sec ±55.23% (50 runs sampled)

  fastest is fs-readdir-callback-api.js
charlike@node:~/dev/fs-readdir$ node benchmark
#1: simple.js 
  fs-readdir-builtin-emitter.js x 71,767 ops/sec ±12.90% (55 runs sampled)
  fs-readdir-callback-api.js x 55,266 ops/sec ±8.16% (60 runs sampled)
  fs-readdir-dual-emitter.js x 19,824 ops/sec ±9.25% (49 runs sampled)
  fs-readdir-eventemitter2.js x 40,454 ops/sec ±30.43% (54 runs sampled)
  fs-readdir-stream-api.js x 33,384 ops/sec ±8.23% (65 runs sampled)
  glob-stream.js x 584 ops/sec ±5.70% (70 runs sampled)
  readdirp-callback-api.js x 17,492 ops/sec ±20.65% (42 runs sampled)
  readdirp-stream-api.js x 2,375 ops/sec ±6.73% (46 runs sampled)
  recursive-readdir.js x 47,471 ops/sec ±35.03% (53 runs sampled)
  
  fastest is fs-readdir-callback-api.js
```


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