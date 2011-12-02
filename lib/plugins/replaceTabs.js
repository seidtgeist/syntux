var ReplaceTabsPlugin = module.exports = {};

ReplaceTabsPlugin.transform = function(tokens, indent) {
  ReplaceTabsPlugin.markLeadingWhite(tokens);
  ReplaceTabsPlugin.replaceTabs(tokens, indent);
};

ReplaceTabsPlugin.markLeadingWhite = function(tokens) {
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

ReplaceTabsPlugin.replaceTabs = function(tokens, indentation) {
  var token = tokens.first;

  do {
    if (token.leadingWhite && token.value == '\t') {
      token.append({
        value : indentation,
        white : true,
        depth : token.depth,
      });
      token.remove();
    }
  } while (token = token.next);
}
