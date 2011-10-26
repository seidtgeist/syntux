module.exports = function whitespace(nodes, type) {
  var removeTrailingWhite;
  var i = nodes.length;
  var node;
  while (node = nodes[--i]) {
    if (Array.isArray(node)) {
      whitespace(node, type);
      continue;
    }

    if (!node.isWhite) {
      removeTrailingWhite = false;
      continue;
    }

    var isComment = (node.name === 7) || (node.name === 8);
    if (isComment) {
      node.value = node.value.replace(/\s+$/gm, '');
      removeTrailingWhite = false;
      continue;
    }

    var isNewline = (node.name === 10);
    if (isNewline) {
      removeTrailingWhite = true;
      continue;
    }

    var isWhite = (node.name === 9);
    if (isWhite && removeTrailingWhite) {
      node.value = '';
    }
  };
};
