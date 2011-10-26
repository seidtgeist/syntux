var common         = exports;

common.Syntux      = require('..');

common.dir         = {};
common.dir.test    = __dirname;
common.dir.fixture = common.dir.test + '/fixture';
common.dir.tmp     = common.dir.test + '/tmp';
common.dir.helper  = common.dir.test + '/helper';

common.helper = function(name) {
  return require(common.dir.helper + '/' + name);
};
