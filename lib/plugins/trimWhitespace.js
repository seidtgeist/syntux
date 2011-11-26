TrimWhitespacePlugin = module.exports = {};
TrimWhitespacePlugin.transform = function(tokens) {
  var token    = tokens.last;
  var trailing = true;
  do {
    if (!token.white && !token.asi) {
      trailing = false;
      continue;
    }

    if (token.comment) {
      token.value = token.value.replace(/[\t ]+$/gm, '');
      trailing    = false;
      continue;
    }

    if (token.newline) {
      trailing = true;
      continue;
    }

    if (token.white && trailing) {
      token.remove();
    }

  } while (token = token.prev);
};
