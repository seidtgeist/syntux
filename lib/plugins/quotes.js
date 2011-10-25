module.exports = function quotes(nodes, type) {
  nodes.forEach(function(node) {
    if (Array.isArray(node)) return quotes(node, type);

    if (!node.isString) return;

    var prevType = node.value.substr(0, 1);
    if (type === prevType) return;

    var value  = node.value.substr(1, node.value.length - 2);
    value      = value.replace(new RegExp('\\\\' + prevType, 'g'), prevType);
    node.value = type + value+ type;
  });
};
