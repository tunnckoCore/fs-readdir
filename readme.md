## [![npm][npmjs-img]][npmjs-url] [![mit license][license-img]][license-url] [![build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![deps status][daviddm-img]][daviddm-url]

> WIP - fs.readdir done right! Support sync, async, stream and promise API, recursiveness and filters.

## Install, Test & Benchmark
```
npm i --save fs-readdir
```

**readdirp's and recursive-readdir's use of `minimatch` is replaced with `micromatch`  
readdirp's stream api now use `npm.im/immediate` instead of setImmediate/setTimeout**

## Usage
> For more use-cases see the [tests](./test.js)

```js
var fsReaddir = require('fs-readdir');
```


## Benchmark

```
charlike@node:~/dev/fs-readdir$ node benchmark/
#1: simple.js 
  fs-readdir-callback-api.js x 56,738 ops/sec ±15.55% (52 runs sampled)
  fs-readdir-stream-api.js x 77,369 ops/sec ±7.33% (63 runs sampled)
  glob-stream.js x 686 ops/sec ±7.16% (72 runs sampled)
  readdirp-callback-api.js x 23,321 ops/sec ±7.97% (47 runs sampled)
  readdirp-stream-api.js x 4,199 ops/sec ±8.56% (59 runs sampled)
  recursive-readdir.js x 39,180 ops/sec ±18.45% (61 runs sampled)

  fastest is fs-readdir-callback-api.js,recursive-readdir.js
^C
charlike@node:~/dev/fs-readdir$ node benchmark/
#1: simple.js 
  fs-readdir-callback-api.js x 102,170 ops/sec ±11.58% (53 runs sampled)
  fs-readdir-stream-api.js x 32,899 ops/sec ±8.81% (61 runs sampled)
  glob-stream.js x 677 ops/sec ±4.47% (71 runs sampled)
  readdirp-callback-api.js x 20,547 ops/sec ±9.38% (48 runs sampled)
  readdirp-stream-api.js x 2,096 ops/sec ±5.00% (71 runs sampled)
  recursive-readdir.js x 91,225 ops/sec ±7.74% (57 runs sampled)

  fastest is recursive-readdir.js,fs-readdir-callback-api.js
^C
charlike@node:~/dev/fs-readdir$ node benchmark/
#1: simple.js 
  fs-readdir-callback-api.js x 64,529 ops/sec ±11.88% (56 runs sampled)
  fs-readdir-stream-api.js x 56,699 ops/sec ±7.11% (63 runs sampled)
  glob-stream.js x 585 ops/sec ±5.95% (62 runs sampled)
  readdirp-callback-api.js x 28,491 ops/sec ±10.98% (36 runs sampled)
  readdirp-stream-api.js x 6,604 ops/sec ±4.26% (67 runs sampled)
  recursive-readdir.js x 53,011 ops/sec ±9.71% (54 runs sampled)

  fastest is recursive-readdir.js,fs-readdir-callback-api.js
^C
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
Copyright (c) 2014 [Charlike Mike Reagent][contrib-more], [contributors][contrib-graf].  
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

_Powered and automated by [kdf](https://github.com/tunnckoCore), January 3, 2015_