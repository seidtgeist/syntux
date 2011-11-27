var BracesPlugin = module.exports = {};
BracesPlugin.transform = function(tokens, type) {
  var indent;
  var curToken;
  var token = tokens.first;
  // ensure that it is escaped right
  type = type.replace('\\n', '\n');
  var namedType = new RegExp('^[\t ]*{\n$').test(type) ? 'sameLine' : type.indexOf('\n') === 0 ? 'newLine' : null;
  
  do {
    if(token.value == '{' &&
        // don't do anything for these constructions: {}
        token.next !== token.twin &&
        // TODO: do we want to use that value?
        !token._zeToken.isObjectLiteralStart &&
        !token.isOnSameLine(token.twin)) {
      // clear on the left
      curToken = token;
      while((curToken = curToken.prev) && (curToken.white || curToken.newline)) {
        curToken.remove();
      }
      // on the right
      curToken = token;
      while((curToken = curToken.next) && curToken.newline) {
        curToken.remove();
      }
      // clear on the left for the closing brace
      curToken = token.twin;
      while((curToken = curToken.prev) && (curToken.white || curToken.newline)) {
        curToken.remove();
      }
      indent = token.getIndent();
      
      // opening braces
      if(namedType === 'sameLine') {
        token.value = type;
      }
      if(namedType === 'newLine') {
        token.value = '\n' + indent + '{\n';
      }
      // closing braces
      if(typeof(namedType) !== 'undefined') {
        token.twin.value = '\n' + indent + '}';
      }
    }
  } while(token = token.next);
};
