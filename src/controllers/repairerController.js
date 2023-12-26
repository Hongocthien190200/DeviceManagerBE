const Repairers = require('../Models/repairer');
const repairerController = {
    show:async(req, res) =>{
        try {
            const repairer = await Repairers.find({});
            res.status(200).json(repairer);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    create: async(req, res) =>  {
        try {
            const newRepairer = new Repairers({
                repairerName: req.body.repairerName,
                repairerDeputy: req.body.repairerDeputy,
                repairerAddress: req.body.repairerAddress,
                repairerPhone: req.body.repairerPhone,
            })
            const repairer = await newRepairer.save();
                        res.status(200).json(repairer);
        } catch (error) {
            res.status(404).json(error);
        }
    },
    update: async (req, res) => {
        try {
            const repairerId = req.params.id; // Lấy ID của đơn vị bảo dưỡng cần cập nhật
            const updateData = req.body; // Dữ liệu cần cập nhật
            // Kiểm tra xem đơn vị bảo dưỡng có tồn tại hay không
            const repairer = await Repairers.findOne({ _id: repairerId });
    
            if (!repairer) {
                return res.status(404).json({ message: 'đơn vị bảo dưỡng không tồn tại.' });
            }
    
            // Cập nhật thông tin của đơn vị bảo dưỡng
            let updatedRepairer = await Repairers.findOneAndUpdate(
                { _id: repairerId },
                { $set: updateData },
                { new: true } // Trả về đơn vị bảo dưỡng sau khi đã cập nhật
            );
    
            // Trả về thông tin của đơn vị bảo dưỡng sau khi đã cập nhật
            res.status(200).json(updatedRepairer);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật đơn vị bảo dưỡng.', error });
        }
    },
}
module.exports = repairerController;
