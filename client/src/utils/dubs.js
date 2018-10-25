function checkDubs(hash) {
  const parts = hash.split('~');
  if (parts.length !== 2) return false;
  return parts[0] == parts[1];
}

export { checkDubs };