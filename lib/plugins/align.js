module.exports = function align(parser, types) {
  types.map(alignType.bind(null, parser));
};

function alignType(parser, type) {
  var levels = tokensPerLevel(parser.stack, type);

  for (var depth in levels) {
    var tokens = levels[depth];
    if (tokens.length < 2) continue;

    alignLevel(tokens, parser);
  }
}

function alignLevel(tokens, parser) {
  var wtree = parser.tokenizer.wtree;

  var prefixLengths = [];
  var max = 1;
  tokens.forEach(function(token, i) {
    var prefixLength = getPrefix(token, wtree).length;
    if (prefixLength > max) max = prefixLength;
    prefixLengths[i] = prefixLength;
  });

  tokens.forEach(function(token, i) {
    var addSpaces = max - prefixLengths[i] + 1;
    var whiteSpaceToken = getOrAddWhitespaceTokenBefore(token, wtree);

    var spaces = '';
    for (var i = 0; i < addSpaces; i++) {
      spaces += ' ';
    }

    whiteSpaceToken.value = spaces;
  });

}

function getPrefix(token, wtree) {
  var i      = token.tokposw;
  var prefix = '';

  while(i--) {
    var prevToken = wtree[i];
    prefix = prevToken.value + prefix;

    if (prevToken.newline) {
      break;
    }
  }

  return prefix.trimRight();
}

function getOrAddWhitespaceTokenBefore(token, wtree) {
  var before = wtree[token.tokposw - 1];

  if (before.isWhite) return before;

  var whitespace = {name: 9, isWhite: true, value: ' '};
  wtree.splice(token.tokposw, 0, whitespace);

  for (var i = token.tokposw; i < wtree.length; i++) {
    wtree[i].tokposw++;
  }

  return whitespace;
}

function tokensPerLevel(nodes, type, levels, depth) {
  depth  = depth || 1;
  levels = levels || {};

  nodes.forEach(function(node) {
    if (Array.isArray(node)) return tokensPerLevel(node, type, levels, depth + 1);

    if (node.value !== type) return;

    var level = levels[depth] = levels[depth] || [];
    level.push(node);
  });

  return levels;
}
