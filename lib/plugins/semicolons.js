module.exports = function semicolons(parser, type) {
  var tree = parser.tokenizer.wtree;
  moveSemicolons(tree);
  fixSemicolonValues(tree);
};

function fixSemicolonValues(tree) {
  var l = tree.length;
  var token;
  while (token = tree[--l]) {
    if (token.name === 13/*ASI*/) {
      token.value = ';';
    }
  }
}

function moveSemicolons(tree) {
  var l = tree.length;
  var prevToken;
  var token;
  while (--l) {
    token = tree[l];
    prevToken = tree[l-1];
    if (token.name === 13/*ASI*/ &&
        prevToken.isWhite) {
      swapWtreeTokens(tree, l, l-1);
    }
  }
}

function swapWtreeTokens(wtree, i, j) {
  var tokeni   = wtree[i];
  var tokposwi = tokeni.tokposw;
  var tokenj   = wtree[j];
  var tokposwj = tokenj.tokposw;
  wtree[j] = tokeni;
  wtree[i] = tokenj;
  tokeni.tokposw = tokposwj;
  tokenj.tokposw = tokposwi;
}
