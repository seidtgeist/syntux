module.exports = function whitespace(nodes, type) {
  var isTrailingWhite;
  var i = nodes.length;
  var node;
  while (node = nodes[--i]) {
    if (Array.isArray(node)) {
      whitespace(node, type);
      continue;
    }

    if (!node.isWhite) {
      isTrailingWhite = false;
      continue;
    }

    if (node.name === 10) {
      isTrailingWhite = true;
    }

    var isWhite = (node.name === 9);
    if (isWhite && isTrailingWhite) {
      node.value = '';
    }
  };
};
