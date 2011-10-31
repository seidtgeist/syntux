var Command = require('commander').Command;
var plugins = require('./plugins');

module.exports = SyntuxCli;
function SyntuxCli(argv, stdout, stderr) {
  this._argv   = argv;
  this._command  = null;
  this._stdout = stdout;
  this._stderr = stderr;
  this._cb     = null;
}

SyntuxCli.prototype.execute = function(cb) {
  this._cb = cb;
  this._parseArgv();
  this._execute();
};

SyntuxCli.prototype._parseArgv = function() {
  var command = this._command = new Command();

  command
    .option('-s, --syntax [file]', 'The path to a syntax.json file to use')
    .option('-v, --verbose', 'Enable verbose output')
    .option('-h, --help', 'Output usage information');

  for (var name in plugins) {
    var plugin = plugins[name].cli;
    if (!plugin) plugin = {};

    plugin.flags = plugin.flags || '--' + name;
    plugin.description = plugin.description || 'Needs docs!'

    command.option(plugin.flags, plugin.description, plugin.default);
  }

  command.parse(this._argv);
};

SyntuxCli.prototype._execute = function() {
  if (this._command.help) return this._help();
};

SyntuxCli.prototype._help = function() {
  this._output([
      ''
    , '  Usage: syntux [options] [<inputPaths>]'
    , ''
    , '  Options:'
    , ''
    , '' + this._command.optionHelp().replace(/^/gm, '    ')
    , ''
    , ''
  ].join('\n'));

  this._end();
};

SyntuxCli.prototype._output = function(data) {
  this._stdout.write(data);
};

SyntuxCli.prototype._verbose = function(data) {
  if (this._command.verbose) this._stderr.write(data);
};

SyntuxCli.prototype._end = function(err) {
  if (this._cb) this._cb(err);
  this._cb = null;
};
