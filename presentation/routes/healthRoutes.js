const express = require('express');
const router = express.Router();
const HealthController = require('../controllers/HealthCheckController.js');


//auth routes...


router.post('/health', HealthController.healthCheck);



module.exports = router;
