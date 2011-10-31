#!/usr/bin/env node
var SyntuxCli = require('../lib/syntux_cli');
var cli       = new SyntuxCli(process.argv, process.stdout, process.stderr);

cli.execute(function(err) {
  var code = (err)
    ? 1
    : 0;

  process.exit(code);
});
