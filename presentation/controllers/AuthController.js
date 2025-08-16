const authService  = require('../../application/services/AuthService');
const MSG = require("../../presentation/constants/apiMessages");


class AuthController {

async register(req, res){
    try {
      const {user, exists} = await authService.registerUser(req.body);
      if(exists){
         return  res.status(409).json({ message: MSG.USER_EXISTS, user:null, success: false });
      }
        res.status(201).json({ message: MSG.USER_SUCCESS, user, success: true });
    } catch (error) {
        res.status(400).json({ message: error.message, error: error.message });
    }
}
async login(req, res){
    try {
        const { token, user } = await authService.loginUser(req.body);
      res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
};



module.exports = new AuthController();