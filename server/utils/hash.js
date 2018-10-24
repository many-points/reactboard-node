const fs = require('fs');
const path = require('path');

const fnv1ax = require('fnv-plus').hash;
const dict = fs.readFileSync(path.join(__dirname, 'words.txt')).toString().split('\n');

function hash(str) {
  if(typeof str !== 'string') str = str.toString();
  let words = 2;
  let key = fnv1a(str).dec();
  const len = dict.length;

  let rem;
  const result = [];
  while(words--) {
    rem = key % len;
    key = Math.floor(key / len);
    if(key === 0) break;
    result.push(dict[rem]);
  }

  return result.join('~');
}

module.exports = hash;