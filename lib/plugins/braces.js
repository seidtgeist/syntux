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
  var wtree = parser.tokenizer.wtree;
  
  btree.forEach(function(token) {
    if(token.name === 11 /* PUNCTUACTION */ && token.value == '{' &&
        // don't do anything for these constructions: {}
        token.tokposw+1 !== token.twin.tokposw) {
      braceDetail = {
        open: getStripPositions(wtree, token),
        close: getStripPositions(wtree, token.twin)
      }
      braceDetail.open.center = token.tokposw;
      braceDetail.close.center = token.twin.tokposw;
      braceDetail.indent = getLineIndentation(wtree, braceDetail.open.left);
      braceDetails.push(braceDetail);
      
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
  var removeCount = 0;
  braceDetails.forEach(function(detail) {
    removeCount += wtree.splice(detail.open.left+1-removeCount, detail.open.center-detail.open.left-1).length;
    removeCount += wtree.splice(detail.open.center+1-removeCount, detail.open.right-detail.open.center-1).length;
    removeCount += wtree.splice(detail.close.left+1-removeCount, detail.close.center-detail.close.left-1).length;
    removeCount += wtree.splice(detail.close.center+1-removeCount, detail.close.right-detail.close.center-1).length;
  });
  //console.log(getTreeString(wtree));
};

function getStripPositions(wtree, braceToken) {
  var leftTokenPos;
  var rightTokenPos;
  var index = braceToken.tokposw;
  var leftTokenPos = braceToken.tokposw;
  var rightTokenPos = braceToken.tokposw;
  
  while(wtree[leftTokenPos] && 
      (wtree[leftTokenPos].name === 9 /*WHITE_SPACE*/ || wtree[leftTokenPos--].name === 10 /*LINETERMINATOR*/)) {
  };

  while(wtree[rightTokenPos] && 
      (wtree[rightTokenPos].name === 9 /*WHITE_SPACE*/ || wtree[rightTokenPos++].name === 10 /*LINETERMINATOR*/)) {
  };

  return {
    left: leftTokenPos,
    right: rightTokenPos
  }
}

function getLineIndentation(wtree, index) {
  var indent = '';
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
