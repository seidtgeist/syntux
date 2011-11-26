var QuotesPlugin = module.exports = {};
QuotesPlugin.transform = function(tokens, type) {
  var token = tokens.first;
  do{
    if (!token.string) continue;

    var prevType = token.value.substr(0, 1);
    if (type === prevType) return;

    var value  = token.value.substr(1, token.value.length - 2);
    value      = value.replace(new RegExp('\\\\' + type, 'g'), '');
    value      = value.replace(new RegExp(type, 'g'), '\\' + type);
    value      = value.replace(new RegExp('\\\\' + prevType, 'g'), prevType);
    token.value = type + value+ type;
  } while(token = token.next);
};
