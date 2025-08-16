const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function comparePassword(raw, hashed) {
  return await bcrypt.compare(raw, hashed);
}

module.exports = { hashPassword, comparePassword };