var _    = require('underscore');
var util = require('util');

module.exports = Token;
function Token(properties, tokens) {
  this.prev        = null; // Ref: To previous token
  this.next        = null; // Ref: To next token
  this.value       = null; // String: Value of this token
  this.depth       = null; // Int: Depth of token in AST
  this.lineStart   = null; // Boolean: True first black token on line
  this.white       = null; // Boolean: True if token is whitespace

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
