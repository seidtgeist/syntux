var SpacingPlugin = module.exports = {};
SpacingPlugin.transform = function(tokens, type) {
  var condition;
  var key;
  var spacingConds;
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
  var mathOps = ['+', '-', '/', '*', '%'];
  var shiftOps = ['<<', '>>', '>>>'];
  
  do {
    spacingConds = {
      before: {
        methodDeclaration: token.value === '(' && token.methodDecl,
        methodCall: token.callStart,
        statement: token.stmtStart,
        braces: token.value === '{' && !token.objLiteral,
        caseColon: token.value === ':' && this.isCaseColon(token)
      },
      after: {
        comma: token.value === ',',
        semicolon: token.value === ';',
        logicalNot: token.value === '!' && token.next && token.next.value !== '!'
      },
      around: {
        assignmentOp: assignmentOps.indexOf(token.value) != -1,
        logicalOp: logicalOps.indexOf(token.value) != -1,
        relationalOp: relationalOps.indexOf(token.value) != -1,
        equalOp: equalOps.indexOf(token.value) != -1,
        bitwiseOp: bitwiseOps.indexOf(token.value) != -1,
        condOp: token.value === '?' || (token.value === ':' && this.isConditionalOp(token)),
        mathOp: mathOps.indexOf(token.value) != -1 && !token.unary,
        shiftOp: shiftOps.indexOf(token.value) != -1,
        braces: token.value === '{' && token.objLiteral,
        brackets: token.value === '[',
        parentheses: token.value === '('
      }
    }

    // before spacing
    if(conf.before && !this.isAtLineStart(token)) {
      for(key in spacingConds.before) {
        condition = spacingConds.before[key]
        if(condition && typeof(conf.before[key]) !== 'undefined') {
          this.clearWhitespace(token, 'prev');
          if(conf.before[key]) {
            this.prependWhitespace(token);
          }
        }
      }
    }

    // after spacing
    if(conf.after && !this.isAtLineEnd(token)) {
      for(key in spacingConds.after) {
        condition = spacingConds.after[key];
        if(condition && typeof(conf.after[key]) !== 'undefined') {
          this.clearWhitespace(token, 'next');
          if(conf.after[key]) {
            this.appendWhitespace(token);
          }
        }
      }
    }
    
    // around spacing
    if(conf.around && !(this.isAtLineStart(token) || this.isAtLineEnd(token))) {
      for(key in spacingConds.around) {
        condition = spacingConds.around[key];
        if(condition && typeof(conf.around[key]) !== 'undefined') {
          if(key === 'braces' || key === 'brackets' || key === 'parentheses') {
            this.clearWhitespace(token, 'next');
            this.clearWhitespace(token.twin, 'prev');
            if(conf.around[key] && token.next != token.twin) {
              this.appendWhitespace(token);
              this.prependWhitespace(token.twin);
            }
          } else {
            this.clearWhitespace(token, 'prev');
            this.clearWhitespace(token, 'next');
            if(conf.around[key]) {
              this.appendWhitespace(token);
              this.prependWhitespace(token);
            }
          }
        }
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
  },
  'jquery': {
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
      'braces': true,
      'brackets': true,
      'parentheses': true
    }
  }
};

SpacingPlugin.clearWhitespace = function(token, direction) {
  while((token = token[direction]) && (token.white || token.newLine)) {
    if(! token.comment) {
      token.remove();
    }
  };
};

SpacingPlugin.prependWhitespace = function(token) {
  do {
    token.prepend({
      value: ' ',
      white: true,
      depth: token.depth
    });
  } while((token = token.prev.prev) && token.comment);
};

SpacingPlugin.appendWhitespace = function(token) {
  do {
    token.append({
      value: ' ',
      white: true,
      depth: token.depth
    });
  } while((token = token.next.next) && token.comment);
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

SpacingPlugin.isAtLineStart = function(token) {
  var origToken = token;
  while((token = token.prev) && (token.white || token.lineEnd)) {
    if(token.lineEnd) {
      return true;
    }
  }
  if(token === null) return true;
  return false;
};

SpacingPlugin.isAtLineEnd = function(token) {
  var origToken = token;
  while((token = token.next) && (token.white || token.lineEnd)) {
    if(token.lineEnd) {
      return true;
    }
  }
  if(token === null) return true;
  return false;
};
