

class HealthController {

async healthCheck(req, res){
    try {
        res.status(200).json({ status: "OK", uptime: process.uptime(), timestamp: Date.now() });
    } catch (error) {
        res.status(400).json({  status: error.message, uptime: process.uptime(), timestamp: Date.now() });
    }
}

};



module.exports = new HealthController();