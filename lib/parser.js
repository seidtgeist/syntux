var ZeParser = require('zeparser').ZeParser;

module.exports = Parser;
function Parser(source) {
  this._source = source;
  this._parser = null;
}

Parser.parse = function(source) {
  var parser = new this(source);
  return parser.parse();
};

Parser.prototype.parse = function() {
  this._parser = ZeParser.createParser(this._source);
  this._parser.tokenizer.fixValues();

  return this._parser;
};
