var SpacingPlugin = module.exports = {};
SpacingPlugin.transform = function(tokens, type) {
  var conf = typeof(type) === 'object' ? type : this.presets[type];
  var token = tokens.first;
  var assignmentOps = [
    '=', '*=', '/=', '%=', '+=', '-=', 
    '<<=', '>>=', '>>>=', '&=', '^=', '!='
  ];
  var logicalOps = ['&&', '||'];
  var relationalOps = ['<', '>', '<=', '>=', 'instanceof', 'in'];
  var equalOps = ['==', '!=', '===', '!=='];
  var bitwiseOps = ['&', '^', '|'];
  var condOps = ['?', ':'];
  var mathOps = ['+', '-', '/', '*', '%'];
  var shiftOps = ['<<', '>>', '>>>'];
  
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
    if(token.value === ',' && conf.after && !this.searchLineEnd(token) &&
        typeof(conf.after.comma) !== 'undefined') {
      this.clearWhitespace(token, 'next');
      if(conf.after.comma) {
        this.appendWhitespace(token);
      }
    }
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
    if(assignmentOps.indexOf(token.value) != -1 && conf.around 
        && typeof(conf.around.assignmentOp) !== 'undefined') {
      this.clearWhitespace(token, 'prev');
      this.clearWhitespace(token, 'next');
      if(conf.around.assignmentOp) {
        this.prependWhitespace(token);
        this.appendWhitespace(token);
      }
    }
    if(logicalOps.indexOf(token.value) != -1 && conf.around 
        && typeof(conf.around.logicalOp) !== 'undefined') {
      this.clearWhitespace(token, 'prev');
      this.clearWhitespace(token, 'next');
      if(conf.around.logicalOp) {
        this.prependWhitespace(token);
        this.appendWhitespace(token);
      }
    }
    if(relationalOps.indexOf(token.value) != -1 && conf.around 
        && typeof(conf.around.relationalOp) !== 'undefined') {
      this.clearWhitespace(token, 'prev');
      this.clearWhitespace(token, 'next');
      if(conf.around.relationalOp) {
        this.prependWhitespace(token);
        this.appendWhitespace(token);
      }
    }
    if(equalOps.indexOf(token.value) != -1 && conf.around 
        && typeof(conf.around.equalOp) !== 'undefined') {
      this.clearWhitespace(token, 'prev');
      this.clearWhitespace(token, 'next');
      if(conf.around.equalOp) {
        this.prependWhitespace(token);
        this.appendWhitespace(token);
      }
    }
    if(bitwiseOps.indexOf(token.value) != -1 && conf.around 
        && typeof(conf.around.bitwiseOp) !== 'undefined') {
      this.clearWhitespace(token, 'prev');
      this.clearWhitespace(token, 'next');
      if(conf.around.bitwiseOp) {
        this.prependWhitespace(token);
        this.appendWhitespace(token);
      }
    }
    // TODO: differentiate from case colons
    if((token.value === '?' || (token.value === ':' && this.isConditionalOp(token))) && !this.searchLineEnd(token) &&
        conf.around && typeof(conf.around.condOp) !== 'undefined') {
      this.clearWhitespace(token, 'prev');
      this.clearWhitespace(token, 'next');
      if(conf.around.condOp) {
        this.prependWhitespace(token);
        this.appendWhitespace(token);
      }
    }
    if(mathOps.indexOf(token.value) != -1 && conf.around 
        && typeof(conf.around.mathOp) !== 'undefined') {
      this.clearWhitespace(token, 'prev');
      this.clearWhitespace(token, 'next');
      if(conf.around.mathOp) {
        this.prependWhitespace(token);
        this.appendWhitespace(token);
      }
    }
    if(shiftOps.indexOf(token.value) != -1 && conf.around 
        && typeof(conf.around.shiftOp) !== 'undefined') {
      this.clearWhitespace(token, 'prev');
      this.clearWhitespace(token, 'next');
      if(conf.around.shiftOp) {
        this.prependWhitespace(token);
        this.appendWhitespace(token);
      }
    }
    if(token.value === '{' && token.objLiteral && !this.searchLineEnd(token) &&
        conf.around && typeof(conf.around.braces) !== 'undefined') {
      this.clearWhitespace(token, 'next');
      this.clearWhitespace(token.twin, 'prev');
      if(conf.around.braces) {
        this.appendWhitespace(token);
        this.prependWhitespace(token.twin);
      }
    }
    if(token.value === '[' && !this.searchLineEnd(token) &&
        conf.around && typeof(conf.around.brackets) !== 'undefined') {
      this.clearWhitespace(token, 'next');
      this.clearWhitespace(token.twin, 'prev');
      if(conf.around.brackets) {
        this.appendWhitespace(token);
        this.prependWhitespace(token.twin);
      }
    }
    if(token.value === '(' && !this.searchLineEnd(token) &&
        conf.around && typeof(conf.around.parentheses) !== 'undefined') {
      this.clearWhitespace(token, 'next');
      this.clearWhitespace(token.twin, 'prev');
      if(conf.around.parentheses) {
        this.appendWhitespace(token);
        this.prependWhitespace(token.twin);
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
      'equalOps': true,
      'bitwiseOp': true,
      'condOp': true,
      'mathOp': true,
      'shiftOp': true,
      'braces': false,
      'brackets': false,
      'parentheses': false
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
      'equalOps': true,
      'bitwiseOp': true,
      'condOp': true,
      'mathOp': true,
      'shiftOp': true,
      'braces': false,
      'brackets': false,
      'parentheses': false
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
};

SpacingPlugin.isConditionalOp = function(token) {
  var origToken = token;
  while(token = token.prev) {
    if(token.value === '?' && token.depth === origToken.depth) {
      return true;
    }
    if(token.depth < origToken.depth) {
      return false;
    }
  };
  return false;
};

SpacingPlugin.searchLineEnd = function(token) {
  var origToken = token;
  while((token = token.next) && (token.white || token.lineEnd)) {
    if(token.lineEnd) {
      return true;
    }
  }
  if(token === null) return true;
  return false;
};
