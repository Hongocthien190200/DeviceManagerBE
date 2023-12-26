const Status = require('../Models/status');
const statusController = {
    show:async(req, res) =>{
        try {
            const status = await Status.find({});
            res.status(200).json(status);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    create: async(req, res) =>  {
        try {
            const newStatus = await new Status({
                statusName: req.body.statusName,
            })
            const status = await newStatus.save();
                        res.status(200).json(status);
        } catch (error) {
            res.status(404).json(error);
        }
    },
    update: async (req, res) => {
        try {
            const statusId = req.params.id; // Lấy ID của trạng thái cần cập nhật
            const updateData = req.body; // Dữ liệu cần cập nhật
    
            // Kiểm tra xem trạng thái có tồn tại hay không
            const status = await Status.findOne({ _id: statusId });
    
            if (!status) {
                return res.status(404).json({ message: 'Trạng thái không tồn tại.' });
            }
    
            // Cập nhật thông tin của trạng thái
            let updatedStatus = await Status.findOneAndUpdate(
                { _id: statusId },
                { $set: updateData },
                { new: true } // Trả về trạng thái sau khi đã cập nhật
            );
    
            // Trả về thông tin của trạng thái sau khi đã cập nhật
            res.status(200).json(updatedStatus);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái.', error });
        }
    },
}
module.exports = statusController;
