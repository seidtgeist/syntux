var Parser = require('../parser');
var Stringifier = require('../stringifier');

var removedTokenCount = 0;

module.exports = function braces(parser, type) {
  var braceDetail;
  var prevToken;
  var namedType;
  var removeCount;
  var token;
  var btree = parser.tokenizer.btree;
  var globalRemoveCount = 0;
  var wtree = parser.tokenizer.wtree;
  
  btree.forEach(function(token) {
    if(token.name === 11 /* PUNCTUACTION */ && token.value == '{' &&
        // don't do anything for these constructions: {}
        token.tokposw+1 !== token.twin.tokposw) {
      braceDetail = {
        open: getStripPositions(wtree, token, globalRemoveCount),
        close: getStripPositions(wtree, token.twin, globalRemoveCount)
      }
      braceDetail.indent = getLineIndentation(wtree, braceDetail.open.left, globalRemoveCount);
      
      removeCount = 0;
      removeCount += wtree.splice(braceDetail.open.left+1, braceDetail.open.lengthLeft).length;
      removeCount += wtree.splice(braceDetail.open.center+1-removeCount, braceDetail.open.lengthRight).length;
      removeCount += wtree.splice(braceDetail.close.left+1-removeCount, braceDetail.close.lengthLeft).length;
      //removeCount += wtree.splice(braceDetail.close.center+1-removeCount, braceDetail.close.lengthRight).length;
      globalRemoveCount += removeCount;
      
      namedType = new RegExp('^[\t ]*{\\n$').test(type) ? 'sameLine' : type.indexOf('\n') === 0 ? 'newLine' : null;
      // opening braces
      if(namedType === 'sameLine') {
        token.value = type;
      }
      if(namedType === 'newLine') {
        token.value = '\n' + braceDetail.indent + '{\n';
      }
      // closing braces
      //if(typeof(namedType) !== 'undefined') {
      token.twin.value = '\n' + braceDetail.indent + '}';
      //}
      prevToken = token;
    }
  });
  parser = Parser.parse(Stringifier.stringify(parser));
  wtree = parser.tokenizer.wtree;
  console.log(JSON.stringify(getTreeString(wtree)));
};

function getStripPositions(wtree, braceToken, removeCount) {
  var leftTokenPos;
  var rightTokenPos;
  var index = leftTokenPos = rightTokenPos = braceToken.tokposw - removeCount;
  
  while(wtree[leftTokenPos--] && wtree[leftTokenPos] &&
      (wtree[leftTokenPos].name === 9 /*WHITE_SPACE*/ || wtree[leftTokenPos].name === 10 /*LINETERMINATOR*/)) {};
  if(! wtree[leftTokenPos]) {
    leftTokenPos++;
  }
  
  while(wtree[rightTokenPos++] && wtree[rightTokenPos] &&
      wtree[rightTokenPos].name === 10 /*LINETERMINATOR*/) {};
  if(! wtree[rightTokenPos]) {
    rightTokenPos--;
  }

  return {
    left: leftTokenPos,
    right: rightTokenPos,
    center: index,
    lengthLeft: index-(leftTokenPos+1),
    lengthRight: rightTokenPos-(index+1)
  }
}

function getLineIndentation(wtree, index, removeCount) {
  var indent = '';
  var index = index - removeCount;
  while(wtree[index] && wtree[index].name !== 10 /*LINETERMINATOR*/) {
    if(wtree[index].name === 9 /*WHITE_SPACE*/) {
      indent = wtree[index].value + indent;
    }
    else {
      indent = '';
    }
    index -= 1;
  }
  return indent;
}

function getTokens(wtree, from, to) {
  var tokens = [];
  for(;from<to;from++){
    tokens.push(wtree[from-removedTokenCount]);
  }
  return tokens;
}

function getTreeString(wtree) {
  return wtree.map(function(token){
    return token.value;
  }).join('');
}