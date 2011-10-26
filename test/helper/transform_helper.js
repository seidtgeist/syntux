var common          = require('../common');
var Syntux          = common.Syntux;
var DiffHelper      = common.helper('diff_helper');

module.exports = TransformHelper;
function TransformHelper() {
  this._tests        = [];
  this._pass         = 0;
  this._fail         = 0;
  this._total        = 0;
  this._selectedMode = false;
  this._start        = null;
  this._end          = null;
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

TransformHelper.prototype.test = function(selected, test) {
  if (arguments.length === 1) {
    test = selected;
  } else {
    test.selected = selected;
    this._selectedMode = true;
  }

  this._total++;
  this._tests.push(test);
};

TransformHelper.prototype.nextTest = function() {
  var test = this._tests.shift();
  if (!test) return this.end();
  if (this._selectedMode && !test.selected) return this.nextTest();

  var output = Syntux.transform(test.input, test.options);
  if (output === test.expected) {
    this._pass++;
    this.nextTest();

    return;
  }

  this._fail++;

  var self = this;
  DiffHelper.diff(test.expected, output, function(err, diff) {
    if (err) throw err;

    console.log('! Failed test: ' + test.description + '\n');
    console.log(diff);

    self.nextTest();
  });
};

TransformHelper.prototype.end = function() {
  this._end = Date.now();

  console.log(
    '%d fail, %d pass, %d total - %d ms',
    this._fail,
    this._pass,
    this._total,
    this.duration()
  );

  var skipped = (this._total - (this._fail + this._pass));
  if (skipped) console.log('\n%d skip!', skipped);

  process.reallyExit(this.exitCode());
};

TransformHelper.prototype.duration = function() {
  return this._end - this._start;
};

TransformHelper.prototype.exitCode = function() {
  return (this._fail)
    ? 1
    : 0;
};
