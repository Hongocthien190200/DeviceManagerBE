const Department = require('../Models/Department');
const departmentController = {
    
    show:async(req, res) =>{
        try {
            const department = await Department.find({});
            res.status(200).json(department);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    create: async(req, res) =>  {
        try {
            const newDepartment = new Department({
                departmentName: req.body.departmentName,
            })
            const department = await newDepartment.save();
                        res.status(200).json(department);
        } catch (error) {
            res.status(404).json(error);
        }
    },
    update: async (req, res) => {
        try {
            const departmentId = req.params.id; // Lấy ID của danh mục cần cập nhật
            const updateData = req.body; // Dữ liệu cần cập nhật
    
            // Kiểm tra xem danh mục có tồn tại hay không
            const department = await Department.findOne({ _id: departmentId });
    
            if (!department) {
                return res.status(404).json({ message: 'khu vực/phòng ban không tồn tại.' });
            }
    
            // Cập nhật thông tin của khu vực/phòng ban
            let updatedDepartment = await Department.findOneAndUpdate(
                { _id: departmentId },
                { $set: updateData },
                { new: true } // Trả về khu vực/phòng ban sau khi đã cập nhật
            );
    
            // Trả về thông tin của khu vực/phòng ban sau khi đã cập nhật
            res.status(200).json(updatedDepartment);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật khu vực/phòng ban.', error });
        }
    },
}
module.exports = departmentController;
