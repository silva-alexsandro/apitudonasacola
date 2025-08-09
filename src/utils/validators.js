function isValidListName(name) {
  if (!name) return false;
  if (typeof name !== 'string') return false;
  if (name.trim().length < 3) return false;
  return true;
}

module.exports = {
  isValidListName,
};
