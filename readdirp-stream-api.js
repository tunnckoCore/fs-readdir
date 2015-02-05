var readdirp = require('readdirp');

module.exports = readdir;

function readdir(root, cb) {
  return readdirp({root: root}).on('data', cb);
}

// readdir('../gitclone-cli', function() {})
