var common          = require('../common');
var Syntux          = common.Syntux;
var DiffHelper      = common.helper('diff_helper');

module.exports = TransformHelper;
function TransformHelper() {
  this._tests = [];
  this._pass  = 0;
  this._fails = 0;
  this._start = null;
  this._end   = null;
}

TransformHelper.create = function() {
  var helper = new this();
  helper.start();
  return helper;
};

TransformHelper.prototype.start = function() {
  this._start = Date.now();
  process.nextTick(this.nextTest.bind(this));
};

TransformHelper.prototype.test = function(test) {
  this._tests.push(test);
};

TransformHelper.prototype.nextTest = function() {
  var test = this._tests.shift();
  if (!test) return this.end();

  var output = Syntux.transform(test.input, test.options);
  if (output === test.expected) {
    this._pass++;
    this.nextTest();

    return;
  }

  this._fails++;
  DiffHelper.diff(test.expected, output, function(err, diff) {
    if (err) throw err;

    console.log('! Failed test: ' + test.description + '\n');
    console.log(diff);
  });
};

TransformHelper.prototype.end = function() {
  this._end = Date.now();

  console.log(
    '%d fails, %d pass, %d total - %d ms',
    this._fails,
    this._pass,
    this._tests.length,
    this.duration()
  );

  process.reallyExit(this.exitCode());
};

TransformHelper.prototype.duration = function() {
  return this._end - this._start;
};

TransformHelper.prototype.exitCode = function() {
  return (this._fails)
    ? 1
    : 0;
};
