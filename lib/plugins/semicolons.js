module.exports = function semicolons(parser, type) {
  var prevToken;
  var token;
  var tree = parser.tokenizer.wtree;
  var l    = tree.length;
  while (--l) {
    token = tree[l];
    prevToken = tree[l-1];
    if (token.name === 13/*ASI*/ &&
        prevToken.isWhite) {
      token.value = ';';
      swapWtreeTokens(tree, l, l-1);
    }
  }
};

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
