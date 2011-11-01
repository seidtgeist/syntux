var Command = require('commander').Command;
var plugins = require('./plugins');
var path    = require('path');
var fs      = require('fs');
var util    = require('util');
var _       = require('underscore');

module.exports = SyntuxCli;
function SyntuxCli(options) {
  options = options || {};

  this._argv         = options.argv || process.argv;
  this._command      = null;
  this._stdoutStream = options.stdout || process.stdout;
  this._stderrStream = options.stderr || process.stderr;
  this._cwd          = options.cwd || process.cwd();
  this._syntax       = null;
  this._cb           = null;
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

    plugin.flags = plugin.flags || '--' + name + ' [value]';
    plugin.description = plugin.description || 'Needs docs!'

    command.option(plugin.flags, plugin.description, plugin.default);
  }

  command.parse(this._argv);
};

SyntuxCli.prototype._execute = function() {
  if (this._command.help) return this._help();

  this._determineSyntax();
};

SyntuxCli.prototype._help = function() {
  this._stdout([
      ''
    , '  Usage: syntux [options] [<inputPaths>]'
    , ''
    , '  Options:'
    , ''
    , '' + this._command.optionHelp().replace(/^/gm, '    ')
    , ''
  ].join('\n'));

  this._end();
};

SyntuxCli.prototype._determineSyntax = function() {
  var file = this._findSyntaxFile();
  if (file) var fileSyntax = this._syntaxFromFile(file);

  var commandSyntax = this._syntaxFromCommand();
  if (commandSyntax) {
    this._verbose('Syntax from command:');
    this._verbose(util.inspect(commandSyntax));
  }

  var syntax = commandSyntax || fileSyntax;
  if (commandSyntax && fileSyntax) {
    this._verbose('Result of merging command syntax into file syntax:');
    syntax = _.extend({}, fileSyntax, commandSyntax);
    this._verbose(util.inspect(syntax));
  }

  this._syntax = syntax;
};

SyntuxCli.prototype._findSyntaxFile = function() {
  // If we are asked to load a specific file, do that
  if (this._command.syntax) return this._command.syntax;

  // Do not search for a syntax.json if we have direct commands
  if (this._syntaxFromCommand()) return;

  var dir = this._cwd;

  do{
    var _path = dir + '/syntax.json';
    if (path.existsSync(_path)) return _path;

    previousDir = dir;
    dir = path.dirname(dir);
  } while(dir !== previousDir);

  return false;
};

SyntuxCli.prototype._syntaxFromFile = function(_path) {
  _path = path.resolve(this._cwd, _path);
  this._verbose('Syntax from file: ' + _path);

  try{
    var data = fs.readFileSync(_path, 'utf-8');
  } catch (err) {
    this._end(new Error('SyntuxCli.SyntaxFileNotFound: ' + _path));
    return;
  }

  try{
    var syntax = JSON.parse(data);
  } catch (err) {
    this._end(new Error(
      'SyntuxCli.InvalidSyntaxJson: ' + err.message + ' in ' + _path
    ));
    return;
  }

  this._verbose(util.inspect(syntax));
  return syntax;
};

SyntuxCli.prototype._syntaxFromCommand = function() {
  var syntax = false;

  for (var plugin in plugins) {
    var value = this._command[plugin];
    if (value) {
      syntax = syntax || {};
      syntax[plugin] = value;
    }
  }

  return syntax;
};

SyntuxCli.prototype._findFiles = function(paths, syntax) {
};


SyntuxCli.prototype._verbose = function(data, noNewline) {
  if (!this._command.verbose) return;
  this._stderr(data, noNewline);
};

SyntuxCli.prototype._stdout = function(data, noNewline) {
  if (!noNewline) data += '\n';
  this._stdoutStream.write(data);
};

SyntuxCli.prototype._stderr = function(data, noNewline) {
  if (!noNewline) data += '\n';
  this._stderrStream.write(data);
};

SyntuxCli.prototype._end = function(err) {
  if (!this._cb) return;

  if (err) this._stderr(err.message.replace(/^SyntuxCli\./, ''));
  this._cb(err);
  this._cb = null;
};
