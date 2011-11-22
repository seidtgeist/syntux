var IndentPlugin = module.exports = {};

IndentPlugin.transform = function(tokens, indent) {
  IndentPlugin.markLeadingWhite(tokens);
  IndentPlugin.replaceTabs(tokens, indent);
};

IndentPlugin.markLeadingWhite = function(tokens) {
  var leading = true,
      token   = tokens.first;

  do {
    if (!token.white && !token.asi) {
      leading = false;
    }

    token.leadingWhite = leading;

    if (token.lineEnd) {
      leading = true;
    }
  } while (token = token.next);
}

IndentPlugin.replaceTabs = function(tokens, indentation) {
  var token = tokens.first;

  do {
    if (token.leadingWhite && token.value == '\t') {
      token.value = indentation;
    }
  } while (token = token.next);
}
