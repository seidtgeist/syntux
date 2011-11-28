var SpacingPlugin = module.exports = {};
SpacingPlugin.transform = function(tokens, type) {
  var conf = typeof(type) === 'object' ? type : this.presets[type];
  var token = tokens.first;
  
  do {
    if(token.value === '(' && token.methodDecl &&
        typeof(conf.before.methodDeclaration) !== 'undefined') {
      this.clearWhitespace(token, 'prev');
      if(conf.before.methodDeclaration) {
        token.value = ' (';
      }
    }
    if(token.callStart && conf.before && typeof(conf.before.methodCall) !== 'undefined') {
      this.clearWhitespace(token, 'prev');
      if(conf.before.methodCall) {
        this.prependWhitespace(token);
      }
    }
    if(token.stmtStart && conf.before &&
        typeof(conf.before.statement) !== 'undefined') {
      this.clearWhitespace(token, 'prev');
      if(conf.before.statement) {
        this.prependWhitespace(token);
      }
    }
    if(token.value === '{' && !token.objLiteral && conf.before &&
        typeof(conf.before.braces) !== 'undefined') {
      this.clearWhitespace(token, 'prev');
      if(conf.before.braces) {
        this.prependWhitespace(token);
      }
    }
    if(token.value === ':' && this.isCaseColon(token) && conf.before &&
        typeof(conf.before.caseColon) !== 'undefined') {
      this.clearWhitespace(token, 'prev');
      if(conf.before.caseColon) {
        this.prependWhitespace(token);
      }
    }
    // TODO: token.next.lineEnd is maybe not sufficient
    if(token.value === ',' && conf.after && !this.searchLineEnd(token) &&
        typeof(conf.after.comma) !== 'undefined') {
      this.clearWhitespace(token, 'next');
      if(conf.after.comma) {
        this.appendWhitespace(token);
      }
    }
    // TODO: token.next.lineEnd is maybe not sufficient
    if(token.value === ';' && conf.after && !this.searchLineEnd(token) &&
        typeof(conf.after.semicolon) !== 'undefined') {
      var foo = token;
      this.clearWhitespace(token, 'next');
      if(conf.after.semicolon) {
        this.appendWhitespace(token);
      }
    }
    if(token.value === '!' && conf.after && token.next && token.next.value !== '!' &&
        typeof(conf.after.logicalNot) !== 'undefined') {
      this.clearWhitespace(token, 'next');
      if(conf.after.logicalNot) {
        this.appendWhitespace(token);
      }
    }
  } while(token = token.next);
};
SpacingPlugin.presets = {
  'node': {
    'before': {
      'methodDeclaration': false,
      'methodCall': false,
      'statement': true,
      'braces': true,
      'caseColon': false
    },
    'after': {
      'comma': true,
      'semicolon': true,
      'logicalNot': false
    },
    'around': {
      'assignmentOp': true,
      'logicalOp': true,
      'relationalOp': true,
      'bitwiseOp': true,
      'conditionalOp': true,
      'mathOp': true,
      'shiftOp': true,
      'braces': false,
      'brackets': false,
      'parantheses': false
    }
  },
  'dojo': {
    'before': {
      'methodDeclaration': false,
      'methodCall': false,
      'statement': false,
      'braces': false,
      'brackets': false,
      'caseColon': false
    },
    'after': {
      'comma': true,
      'semicolon': true,
      'logicalNot': false
    },
    'around': {
      'assignmentOp': true,
      'logicalOp': true,
      'relationalOp': true,
      'bitwiseOp': true,
      'conditionalOp': true,
      'mathOp': true,
      'shiftOp': true,
      'braces': false,
      'brackets': false,
      'parantheses': false
    }
  }
};

SpacingPlugin.clearWhitespace = function(token, direction) {
  while((token = token[direction]) && (token.white || token.newLine)) {
    token.remove();
  };
};

SpacingPlugin.prependWhitespace = function(token) {
  token.prepend({
    value: ' ',
    white: true,
    depth: token.depth
  });
};

SpacingPlugin.appendWhitespace = function(token) {
  token.append({
    value: ' ',
    white: true,
    depth: token.depth
  });
};

SpacingPlugin.isCaseColon = function(token) {
  var origToken = token;
  while(token = token.prev) {
    if(token.value === 'case' && token.depth === origToken.depth) {
      return true;
    }
    if(token.depth < origToken.depth) {
      return false;
    }
  };
  return false;
}

SpacingPlugin.searchLineEnd = function(token) {
  var origToken = token;
  while((token = token.next) && (token.white || token.lineEnd)) {
    if(token.lineEnd) {
      return true;
    }
  }
  if(token === null) return true;
  return false;
}
