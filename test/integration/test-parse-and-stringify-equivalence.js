var common   = require('../common');
var fs       = require('fs');
var fixtures = fs.readdirSync(common.dir.fixture);
var Syntux   = common.Syntux;
var difftool = process.env.DIFFTOOL || 'diff';
var exec     = require('child_process').exec;
var exitCode = 0;

if (process.env.FIXTURE) fixtures = [process.env.FIXTURE];

fixtures.forEach(function(fileName) {
  if (!/\.js$/.test(fileName)) return;

  var path              = common.dir.fixture + '/' + fileName;
  var source            = fs.readFileSync(path, 'utf8');

  var start = Date.now();
  var tokens = Syntux.parse(source);
  var reassembledSource = tokens.toString();
  var duration = Date.now() - start;

  if (reassembledSource === source) {
    console.log('Pass: %s (%d ms)', fileName, duration);
    return;
  }

  var reassembledPath = common.dir.tmp + '/' + fileName;
  fs.writeFileSync(reassembledPath, reassembledSource, 'utf8');

  var diffCmd = difftool + ' ' + path + ' ' + reassembledPath;
  exec(diffCmd, {maxBuffer: 1024 * 1024}, function(err, diff, stderr) {
    // `diff` will exit with code 1 if there is a diff ... so lets do this:
    if (err && stderr) throw err;

    console.log('Fail: %s\n', fileName);
    console.log(diff);

    exitCode = 1;
  });
});

process.on('exit', function() {
  process.reallyExit(exitCode);
});
