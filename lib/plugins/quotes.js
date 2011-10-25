module.exports = function quotes(nodes, type) {
  nodes.forEach(function(node) {
    if (Array.isArray(node)) return quotes(node, type);

    if (!node.isString) return;

    node.value = type + node.value.substr(1, node.value.length - 2) + type;
  });
};
