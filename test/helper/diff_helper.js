var diff_match_patch = require('googlediff');

exports.diff = function(text1, text2, cb) {
  // See: http://code.google.com/p/google-diff-match-patch/wiki/LineOrWordDiffs
  var dmp = new diff_match_patch();
  var a = dmp.diff_linesToChars_(text1, text2);
  var lineText1 = a[0];
  var lineText2 = a[1];
  var lineArray = a[2];

  var diffs = dmp.diff_main(lineText1, lineText2, false);
  dmp.diff_charsToLines_(diffs, lineArray);

  var patches = dmp.patch_make(diffs);
  var diff = dmp.patch_toText(patches);

  // Make things pretty ...
  diff = diff
    .replace(/%0A/g, '')
    .split('\n')
    .reduce(function(output, line) {
      // Remove context info lines as they are partial and pretty useless
      if (!/^[@+-]/.test(line)) return output;

      return output + line + '\n';
    }, '');

  process.nextTick(cb.bind(null, null, diff));
};
