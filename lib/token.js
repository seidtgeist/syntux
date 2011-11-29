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
  this.lineEnd     = false; // Boolean: True if newline token
  this.white       = false; // Boolean: True if token is whitespace
  this.asi         = false; // Boolean: True if automatic semicolon insertation
  this.string      = false; // Boolean: True if string
  this.comment     = false; // Boolean: True if comment
  this.error       = false; // Boolean: True if error token
  this.objLiteral  = false; // Boolean: True if token is an object literal
  this.callStart   = false; // Boolean: True if token is a call expression start
  this.stmtStart   = false; // Boolean: True if token is the start of a statement
  this.methodDecl  = false; // Boolean: True if punctuation token is part of a method declaration
  this.unary       = false; // Boolean: True if the token (-, +, ...) is a unary operation

  this._tokens  = tokens; // The parent token set
  this._zeToken = null; // Only use for debugging (!)

  _.extend(this, properties);
}

Token.prototype.__defineGetter__('prevBlack', function() {
  var lookbehind = this.prev;
  if (!lookbehind) return;

  do{
    if (!lookbehind.white) return lookbehind;
  } while(lookbehind = lookbehind.prev);
});

Token.prototype.__defineGetter__('nextBlack', function() {
  var lookahead = this.next;
  if (!lookahead) return;

  do{
    if (!lookahead.white) return lookahead;
  } while(lookahead = lookahead.next);
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
  while((token = token.prev) && token !== this);
  return token === this;
};

Token.prototype.isOnSameLine = function(token) {
  var isBefore = this.isBefore(token);
  var compareToken = isBefore ? this : token;
  token = isBefore ? token : this;
  if(token === compareToken) return true;
  do {
    if(token.lineEnd || token.value.indexOf("\n") > -1) {
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
    // case for expressions that are on different lines
    else if(token.value === ')') {
      token = token.twin; // +1?
    }
    else {
      indent = '';
    }
  } while((token = token.prev) && !token.lineEnd);
  return indent;
};
