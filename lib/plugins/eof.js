var EofPlugin = module.exports = {};
EofPlugin.processEmptyFiles = true;

EofPlugin.transform = function(tokens, type) {
  var token = tokens.last;
  if (!token) {
    tokens.append({
      value: type,
      white: true,
    });

    return;;
  }

  do{
    if (!token || !token.asi) break;
  } while(token = token.prev);

  if (token.value === type) return;

  token.append({
    depth: token.depth,
    value: type,
    white: true,
  });
};
