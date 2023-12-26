const Category = require('../Models/category');
const categoryController = {
    
    show:async(req, res) =>{
        try {
            const category = await Category.find({});
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    create: async(req, res) =>  {
        try {
            const newCategory = new Category({
                categoryName: req.body.categoryName,
            })
            const category = await newCategory.save();
                        res.status(200).json(category);
        } catch (error) {
            res.status(404).json(error);
        }
    },
    update: async (req, res) => {
        try {
            const categoryId = req.params.id; // Lấy ID của danh mục cần cập nhật
            const updateData = req.body; // Dữ liệu cần cập nhật
    
            // Kiểm tra xem danh mục có tồn tại hay không
            const category = await Category.findOne({ _id: categoryId });
    
            if (!category) {
                return res.status(404).json({ message: 'Danh mục không tồn tại.' });
            }
    
            // Cập nhật thông tin của danh mục
            let updatedCategory = await Category.findOneAndUpdate(
                { _id: categoryId },
                { $set: updateData },
                { new: true } // Trả về danh mục sau khi đã cập nhật
            );
    
            // Trả về thông tin của danh mục sau khi đã cập nhật
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật danh mục.', error });
        }
    },
}
module.exports = categoryController;
