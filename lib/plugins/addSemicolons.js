var AddSemicolonsPlugin = module.exports = {};
AddSemicolonsPlugin.transform = function(tokens) {
  var token = tokens.first;
  do{
    if (!token.asi) continue;

    // Search for first black token before ASI token
    var lookbehind = token.prev;
    do{
      if (!lookbehind.white) break;
    } while (lookbehind = lookbehind.prev);

    // Remove ASI token
    token.remove();

    // Add Semicolon
    lookbehind.append({
      value: ';',
      depth: token.depth,
    });
  } while (token = token.next);
};
