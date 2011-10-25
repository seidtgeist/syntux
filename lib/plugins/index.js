var fs    = require('fs');
var files = fs.readdirSync(__dirname);

files.forEach(function(name) {
  if (!/\.js$/.test(name)) return;

  var path = __dirname + '/' + name;
  if (path === __filename) return;

  var key = name.substr(0, name.length - 3);
  exports[key] = require(path);
});
