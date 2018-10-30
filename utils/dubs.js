function checkdubs(hash) {
  const parts = hash.split('~');
  return parts[0] === parts[1];
}

module.exports = checkdubs;