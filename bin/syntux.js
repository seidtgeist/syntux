#!/usr/bin/env node
var Syntux = require('..');
var fs     = require('fs');

// @TODO Properly locate this, traverse from current dir
var syntaxPath = process.cwd() + '/syntax.json';

try{
  var json = fs.readFileSync(syntaxPath, 'utf8');
} catch (err) {
  throw new Error('Could not find syntax file at: ' + syntaxPath);
}

try {
  var options = JSON.parse(json);
} catch (err) {
  throw new Error('Could not parse syntax.json: ' + err);
}

var files = (function findJsFiles(dir) {
  return fs
    .readdirSync(dir)
    .reduce(function(jsFiles, fileName) {
      // @TODO Properly handle this
      if (fileName === 'node_modules' || fileName === 'fixture' || fileName === 'tmp') return jsFiles;

      var path = dir + '/' + fileName;
      var stat = fs.statSync(path);

      if (stat.isDirectory()) return jsFiles.concat(findJsFiles(path));

      if (/\.js$/.test(fileName)) jsFiles.push(path);

      return jsFiles;
    }, []);
})(process.cwd());

files.forEach(function(path) {
  console.log('Transforming: %s ...', path);

  var source      = fs.readFileSync(path, 'utf8');
  var transformed = Syntux.transform(source, options);
  fs.writeFileSync(path, transformed, 'utf8');
});
