var AlignPlugin = module.exports = {};
AlignPlugin.transform = function(tokens, types) {
  types.forEach(this.alignType.bind(this, tokens));
};

AlignPlugin.alignType = function(tokens, type) {
  var groups = TokenGrouper.groups(tokens, type);
  groups.forEach(this.alignGroup.bind(this));
};

AlignPlugin.alignGroup = function(group) {
  var prefixLengths = this.prefixLengths(group);
  group.forEach(function(token, i) {
    while (token = token.prev) {
      if (!token.white) break;

      token.remove();
    }

    var prefixLength = prefixLengths.lookup[i];
    var insertSpaces = prefixLengths.max - prefixLength + 1;
    for (var i = 0; i < insertSpaces; i++) {
      token.append({
        value : ' ',
        white : true,
        depth : token.depth,
      });
    }
  });
};

AlignPlugin.prefixLengths = function(group) {
  var max    = 0;
  var lookup = [];

  group.forEach(function(token) {
    var prefixLength = 0;
    var leadingWhiteSpace = true;

    while (token = token.prev) {
      if (!token.white) leadingWhiteSpace = false;

      if (!token.white || !leadingWhiteSpace) {
        prefixLength += token.value.length;
      }

      if (token.lineStart) break;
    }

    if (prefixLength > max) max = prefixLength;
    lookup.push(prefixLength);
  });

  return {
    max    : max,
    lookup : lookup,
  };
}

var TokenGrouper = {};
TokenGrouper.groups = function(tokens, type) {
  var groups = [];
  var levels = this.levels(tokens, type);

  for (var level in levels) {
    var tokens = levels[level];
    groups = groups.concat(this.group(tokens));
  }

  return groups;
};

TokenGrouper.group = function(tokens) {
  var groups = [];
  while (tokens.length) {
    var token = tokens.shift();
    var group = [token];
    var lookahead  = token.next;
    var newlines = 0;

    do {
      if (lookahead.lineEnd) {
        newlines++;

        if (newlines === 2) break;
        continue;
      }

      if (lookahead === tokens[0]) {
        if (this.isMultiLineAssignment(tokens[0])) break;

        group.push(tokens.shift());
        newlines = 0;
      }
    } while(lookahead = lookahead.next);

    if (group.length >= 2) groups.push(group);
  }

  return groups;
};

TokenGrouper.levels = function(tokens, type) {
  var levels = {};
  var token  = tokens.first;

  do{
    if (token.value !== type) continue;

    if (!levels[token.depth]) levels[token.depth] = [];

    levels[token.depth].push(token);
  } while(token = token.next);

  return levels;
};

TokenGrouper.isMultiLineAssignment = function(token) {
  var lookahead = token.next;
  do{
    if (lookahead.lineEnd) return (lookahead.depth > token.depth);
  } while (lookahead = lookahead.next);

  return false;
};
