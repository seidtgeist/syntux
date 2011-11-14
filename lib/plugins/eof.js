module.exports = function eof(parser, type) {
  var wtree = parser.tokenizer.wtree;
  var i     = wtree.length;

  if(i === 0) {
    wtree[0] = { value: type };
  } else { 
    while(wtree[--i].name == 13 /*ASI*/ || wtree[i] == 14 /*ERROR*/);
    if(wtree[i].value != type) {
      wtree[i].value += type;
    }
  }
};
