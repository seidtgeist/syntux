var Parser = require('../parser');

var removedTokenCount = 0;

module.exports = function braces(parser, type) {
  var braceDetail;
  var token;
  var btree = parser.tokenizer.btree;
  var braceDetails = [];
  var braceStyles = {
    knr: ['{\n', '\n}'],
    sun: ['\n{\n', '\n}'],
    gnu: ['\n  {\n', '\n  }']
  };
  var removeCount = 0;
  var wtree = parser.tokenizer.wtree;
  
  btree.forEach(function(token) {
    if(token.name === 11 /* PUNCTUACTION */ && token.value == '{' &&
        // don't do anything for these constructions: {}
        token.tokposw+1 !== token.twin.tokposw) {
      braceDetail = {
        open: getStripPositions(wtree, token, removeCount),
        close: getStripPositions(wtree, token.twin, removeCount)
      }
      braceDetail.open.center = token.tokposw;
      braceDetail.close.center = token.twin.tokposw;
      braceDetail.indent = getLineIndentation(wtree, braceDetail.open.left, removeCount);
      braceDetails.push(braceDetail);
      
      removeCount += wtree.splice(braceDetail.open.left+1-removeCount, braceDetail.open.center-braceDetail.open.left-1).length;
      removeCount += wtree.splice(braceDetail.open.center+1-removeCount, braceDetail.open.right-braceDetail.open.center-1).length;
      removeCount += wtree.splice(braceDetail.close.left+1-removeCount, braceDetail.close.center-braceDetail.close.left-1).length;
      removeCount += wtree.splice(braceDetail.close.center+1-removeCount, braceDetail.close.right-braceDetail.close.center-1).length;
      
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
    }
  });
  braceDetails.forEach(function(detail) {
    
  });
  //console.log(getTreeString(wtree));
};

function getStripPositions(wtree, braceToken, removeCount) {
  var leftTokenPos;
  var rightTokenPos;
  var index = leftTokenPos = rightTokenPos = braceToken.tokposw - removeCount;
  
  while(wtree[leftTokenPos--] && wtree[leftTokenPos] &&
      (wtree[leftTokenPos].name === 9 /*WHITE_SPACE*/ || wtree[leftTokenPos].name === 10 /*LINETERMINATOR*/)) {
  };

  while(wtree[rightTokenPos++] && wtree[rightTokenPos] &&
      (wtree[rightTokenPos].name === 9 /*WHITE_SPACE*/ || wtree[rightTokenPos].name === 10 /*LINETERMINATOR*/)) {
  };

  return {
    left: leftTokenPos,
    right: rightTokenPos
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
