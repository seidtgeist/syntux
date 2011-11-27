var _    = require('underscore');
var util = require('util');

module.exports = Token;
function Token(properties, tokens) {
  this.prev        = null; // Ref: To previous token
  this.next        = null; // Ref: To next token
  this.value       = null; // String: Value of this token
  this.depth       = null; // Int: Depth of token in AST
  this.twin        = null; // Ref: to the twin token
  this.lineStart   = false; // Boolean: True first black token on line
  this.white       = false; // Boolean: True if token is whitespace
  this.asi         = false; // Boolean: True if automatic semicolon insertation
  this.string      = false; // Boolean: True if string
  this.comment     = false; // Boolean: True if comment
  this.newline     = false; // Boolean: True if newline

  this._tokens  = tokens; // The parent token set
  this._zeToken = null; // Only use for debugging (!)

  _.extend(this, properties);
}

Token.prototype.__defineGetter__('lineEnd', function() {
  return this.white && this.value === '\n';
});

Token.prototype.inspect = function() {
  var inspected = {
    value : this.value,
    depth : this.depth,
  };

  // Add all booleans that are true to inspect output
  for (var key in this) {
    var value = this[key];
    if (value === true) {
      inspected[key] = this[key];
    }
  }

  return util.inspect(inspected);
};

Token.prototype.append = function(token) {
  this._tokens.insertAfter(this, token);
};

Token.prototype.prepend = function(token) {
  this._tokens.insertBefore(this, token);
};

Token.prototype.remove = function() {
  this._tokens.remove(this);
};

Token.prototype.isBefore = function(token) {
  return this._zeToken.tokposw < token._zeToken.tokposw;
};

Token.prototype.isOnSameLine = function(token) {
  var compareToken = this.isBefore(token) ? this : token;
  token = this.isBefore(token) ? token : this;
  if(token === compareToken) return true;
  do {
    if(token.newline || token.value.indexOf("\n") > -1) {
      return false;
    }
  } while((token = token.prev) && token !== compareToken);
  return true;
};

Token.prototype.getIndent = function() {
  var match;
  var indent = '';
  var token = this;
  do {
    if(token.white) {
      indent = token.value + indent;
    }
    // special case for the braces replacement
    else if(/^[\n\t ]*[{}]$/.test(token.value)) {
      match = token.value.match(/^[\n]*([\t ]*)[{}]$/);
      if(match && match.length === 2) {
         indent = match[1];
      }
    }
    // case for expressions that are on different lines
    else if(token.value === ')') {
      token = token.twin; // +1?
    }
    else {
      indent = '';
    }
  } while((token = token.prev) && !token.newline);
  return indent;
};
