const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const validate = require("../middlewares/validate");
const createUserSchema = require("../validators/userValidator");

//auth routes...


router.post('/register', validate(createUserSchema) , AuthController.register);
router.post('/login', AuthController.login);


module.exports = router;
