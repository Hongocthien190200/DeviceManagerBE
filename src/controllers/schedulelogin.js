const Schedule = require('../Models/schedulelogin');
const scheduleController = {
    
    show:async(req, res) =>{
        try {
            const schedule = await Schedule.find({});
            res.status(200).json(schedule);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
module.exports = scheduleController;
