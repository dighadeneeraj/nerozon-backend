const userRepository  = require('../../infrastructure/repositories/UserRepository');
const {comparePassword, hashPassword }  = require('../../common/utils/hash');
const jwt = require('jsonwebtoken');

class AuthService {

    // register user...
   async registerUser({ name, email, password, phone }) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      return { exists: true };
    };

    const hashedPassword = await hashPassword(password);
    const user = await userRepository.createUser({ name, email, password: hashedPassword , phone});
    return {exists: false, user};
  };

    // login user...
    async loginUser({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user._id, email: user.email }, 'SECRET_KEY', { expiresIn: '1h' });
    return { token, user };
  }
};



module.exports = new AuthService();
