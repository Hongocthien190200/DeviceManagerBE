const Units = require('../Models/Unit');
const unitController = {
    show:async(req, res) =>{
        try {
            const unit = await Units.find({});
            res.status(200).json(unit);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    create: async(req, res) =>  {
        try {
            const newUnit = await new Units({
                unitName: req.body.unitName,
            })
            const unit = await newUnit.save();
                        res.status(200).json(unit);
        } catch (error) {
            res.status(404).json(error);
        }
    },
    update: async (req, res) => {
        try {
            const unitId = req.params.id; // Lấy ID của Đơn vị tính cần cập nhật
            const updateData = req.body; // Dữ liệu cần cập nhật
    
            // Kiểm tra xem Đơn vị tính có tồn tại hay không
            const unit = await Units.findOne({ _id: unitId });
    
            if (!unit) {
                return res.status(404).json({ message: 'Đơn vị tính không tồn tại.' });
            }
    
            // Cập nhật thông tin của Đơn vị tính
            let updateUnit = await Units.findOneAndUpdate(
                { _id: unitId },
                { $set: updateData },
                { new: true } // Trả về Đơn vị tính sau khi đã cập nhật
            );
    
            // Trả về thông tin của Đơn vị tính sau khi đã cập nhật
            res.status(200).json(updateUnit);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật Đơn vị tính.', error });
        }
    },
}
module.exports = unitController;
