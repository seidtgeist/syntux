var Parser = require('../parser');
var Stringifier = require('../stringifier');

var removedTokenCount = 0;

module.exports = function braces(parser, type) {
  var braceDetail;
  var prevToken;
  var removeCount;
  var token;
  var btree = parser.tokenizer.btree;
  var braceStyles = {
    knr: ['{\n', '\n}'],
    sun: ['\n{\n', '\n}'],
    gnu: ['\n  {\n', '\n  }']
  };
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
      removeCount += wtree.splice(braceDetail.open.left+1, braceDetail.open.center-(braceDetail.open.left+1)).length;
      removeCount += wtree.splice(braceDetail.open.center+1-removeCount, braceDetail.open.right-(braceDetail.open.center+1)).length;
      removeCount += wtree.splice(braceDetail.close.left+1-removeCount, braceDetail.close.center-(braceDetail.close.left+1)).length;
      removeCount += wtree.splice(braceDetail.close.center+1-removeCount, braceDetail.close.right-(braceDetail.close.center+1)).length;
      globalRemoveCount += removeCount;
      
      // manipulate braces
      if(type === 'knr') {
        token.value = '{\n' + braceDetail.indent;
      }
      if(type === 'sun') {
        token.value = '\n' + braceDetail.indent + '{\n';
      }
      if(type === 'gnu') {
        token.value = '\n' + braceDetail.indent + '  {\n';
      }
      token.twin.value = '\n' + braceDetail.indent + '}\n';
      prevToken = token;
    }
  });
  parser = Parser.parse(Stringifier.stringify(parser));
  wtree = parser.tokenizer.wtree;
  //console.log(JSON.stringify(getTreeString(wtree)));
};

function getStripPositions(wtree, braceToken, removeCount) {
  var leftTokenPos;
  var rightTokenPos;
  var index = leftTokenPos = rightTokenPos = braceToken.tokposw - removeCount;
  
  while(wtree[leftTokenPos--] && wtree[leftTokenPos] &&
      (wtree[leftTokenPos].name === 9 /*WHITE_SPACE*/ || wtree[leftTokenPos].name === 10 /*LINETERMINATOR*/)) {
  };
  if(! wtree[leftTokenPos]) {
    leftTokenPos++;
  }
  
  while(wtree[rightTokenPos++] && wtree[rightTokenPos] &&
      (wtree[rightTokenPos].name === 9 /*WHITE_SPACE*/ || wtree[rightTokenPos].name === 10 /*LINETERMINATOR*/)) {
  };
  if(! wtree[rightTokenPos]) {
    rightTokenPos--;
  }

  return {
    left: leftTokenPos,
    right: rightTokenPos,
    center: index
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
