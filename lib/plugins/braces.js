var BracesPlugin = module.exports = {};
BracesPlugin.transform = function(tokens, type) {
  var indent;
  var curToken;
  var token = tokens.first;
  // ensure that it is escaped right
  type = type.replace('\\n', '\n');
  var namedType = new RegExp('^[\t ]*{(\r\n|\r|\n)$').test(type) ? 'sameLine' : type.indexOf('\n') === 0 ? 'newLine' : null;
  var typeMatch = type.match(/(\r\n|\r|\n)/);
  var newLine = typeMatch ? typeMatch[0] : "\n";
  
  do {
    if(token.value == '{' &&
        // don't do anything for these constructions: {}
        token.next !== token.twin &&
        !token.objLiteral &&
        !token.isOnSameLine(token.twin)) {
      // clear on the left
      curToken = token;
      while((curToken = curToken.prev) && (curToken.white || curToken.lineEnd)) {
        curToken.remove();
      }
      // on the right
      curToken = token;
      while((curToken = curToken.next) && curToken.lineEnd) {
        curToken.remove();
      }
      // clear on the left for the closing brace
      curToken = token.twin;
      while((curToken = curToken.prev) && (curToken.white || curToken.lineEnd)) {
        curToken.remove();
      }
      indent = token.getIndent();
      
      // opening braces
      if(namedType === 'sameLine') {
        this.insertTokens(token, type);
      }
      if(namedType === 'newLine') {
        this.insertTokens(token, newLine + indent + "{" + newLine);
      }
      // closing braces
      if(typeof(namedType) !== 'undefined') {
        this.insertTokens(token.twin, newLine + indent + '}');
      }
    }
  } while(token = token.next);
};

BracesPlugin.insertTokens = function(token, value) {
  var prepend = true;
  var curToken = token;
  value.split(/(\r\n|\r|\n|\ |\t)|/).forEach(function(val) {
    if(! val) return;
    if(val === '{' || val === '}') {
      prepend = false;
      return;
    }
    curToken[prepend ? 'prepend' : 'append']({
      value : val,
      white : val === ' ' || val === '\t',
      lineEnd: val === '\n' || val === '\r' || val === '\r\n',
      depth : token.depth
    });
    if(!prepend) {
      curToken = curToken.next;
    }
  });
}
