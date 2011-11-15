module.exports = function trimWhitespace(parser, type) {
  var token;
  var trailing = true;
  var wtree    = parser.tokenizer.wtree;
  var i        = wtree.length;
  while (token = wtree[--i]) {
    if (!token.isWhite && token.name !== 13/*ASI*/) {
      trailing = false;
      continue;
    }

    var isComment = (token.name === 7/*COMMENT_SINGLE*/) ||
                    (token.name === 8/*COMMENT_MULTI*/);
    if (isComment) {
      token.value = token.value.replace(/[\t ]+$/gm, '');
      trailing    = false;
      continue;
    }

    var isNewline = (token.name === 10/*LINETERMINATOR*/);
    if (isNewline) {
      trailing = true;
      continue;
    }

    var isWhite = (token.name === 9/*WHITE_SPACE*/);
    if (isWhite && trailing) {
      token.value = '';
    }
  };
};
