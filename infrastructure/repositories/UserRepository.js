const User = require('../database/models/userModel');

class UserRepository {
  async createUser(userData) {
    return await User.create(userData);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }
}

module.exports = new UserRepository();