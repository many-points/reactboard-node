function checkdubs(hash) {
  const parts = hash.split('~');
  return parts[0] == parts[1];
}

function loop() {
  let found = 0;
  let before = 0;
  while(found < 7) {
    let id = new mongoose.Types.ObjectId();
    let check = checkdubs(hash(id.toString()));
    if(check.length !== 0) {
      console.log('found dubs!', check.join('~'), `after ${before} tries`);
      found += 1;
      before = 0;
    } else {
      before += 1;
    }
  }
}

loop()

module.exports = checkdubs;