const Locations = require('../Models/location');
const locationController = {
    show: async (req, res) => {
        try {
            const location = await Locations.find({});
            res.status(200).json(location);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    create: async (req, res) => {
        try {
            const newLocation = await new Locations({
                locationName: req.body.locationName,
            })
            const location = await newLocation.save();
            res.status(200).json(location);
        } catch (error) {
            res.status(404).json(error);
        }
    },
    update: async (req, res) => {
        try {
            const locationId = req.params.id; // Lấy ID của vị trí cần cập nhật
            const updateData = req.body; // Dữ liệu cần cập nhật
            // Kiểm tra xem vị trí có tồn tại hay không
            const location = await Locations.findOne({ _id: locationId });
    
            if (!location) {
                return res.status(404).json({ message: 'Vị trí không tồn tại.' });
            }
    
            // Cập nhật thông tin của vị trí
            let updatedLocation = await Locations.findOneAndUpdate(
                { _id: locationId },
                { $set: updateData },
                { new: true } // Trả về vị trí sau khi đã cập nhật
            );
    
            // Trả về thông tin của vị trí sau khi đã cập nhật
            res.status(200).json(updatedLocation);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật vị trí.', error });
        }
    },
}
module.exports = locationController;
