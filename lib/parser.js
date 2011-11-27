var ZeParser = require('zeparser').ZeParser;
var Tokens   = require('./tokens');

module.exports = Parser;
function Parser() {}

Parser.parse = function(source) {
  var parser = ZeParser.createParser(source);
  parser.tokenizer.fixValues();

  var wtokens = parser.tokenizer.wtree;
  var tokens = new Tokens();

  for (var i = 0; i < wtokens.length; i++) {
    var wtoken = wtokens[i];

    var token = tokens.append({
      value     : wtoken.value,
      lineStart : !!wtoken.newline,
      white     : !!wtoken.isWhite,
      asi       : wtoken.name === 13,
      string    : wtoken.isString,
      newline   : wtoken.name === 10,
      comment   : wtoken.name === 7 || wtoken.name === 8,
      _zeToken  : wtoken,
    });

    wtoken._token = token;
  }

  this._assignTwinRefs(wtokens);
  this._enhanceWithAst(tokens, parser.stack);
  return tokens;
};

Parser._enhanceWithAst = function(tokens, nodes, depth) {
  var self = this;
  depth = depth || 1;

  nodes.forEach(function(node) {
    if (Array.isArray(node)) {
      return self._enhanceWithAst(tokens, node, depth + 1);
    }

    var token = node._token;
    delete node._token;

    token.depth = depth;
  });
};

Parser._assignTwinRefs = function(nodes) {
  nodes.forEach(function(node) {
    node._token.twin = node.twin ? node.twin._token : null;
  });
}
