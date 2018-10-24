const fs = require('fs');
const path = require('path');

const fnv1a = require('fnv1a');
const dict = fs.readFileSync(path.join(__dirname, 'words.txt')).toString().split('\n');

function hash(str) {
  let words = 3;
  let key = fnv1a(str.toString());
  const len = dict.length;

  let rem;
  const result = [];
  while(words--) {
    rem = key % len;
    key = Math.floor(key / len);
    if(key === 0) break;
    result.push(dict[rem]);
}
  if(result.length === 0) throw Error('No human hash to display.');
  return result.join('~');
}

module.exports = hash;