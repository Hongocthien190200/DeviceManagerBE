const Devices = require('../Models/devices');
const { addDays, format } = require('date-fns');

const deviceController = {
    create: async (req, res) => {
        try {
            const maintenanceInterval = await req.body.maintenanceSchedule; //lịch bảo dưỡng
            const lastMaintenanceDate = new Date(req.body.lastMaintenanceDate); //lần cuối bảo dưỡng
            const nextMaintenanceDate = addDays(lastMaintenanceDate, maintenanceInterval); //kỳ bảo dưỡng tiếp theo
            const formattedNextMaintenanceDate = format(nextMaintenanceDate, 'yyyy-MM-dd'); //định dạng ngày bảo dưỡng tiếp theo
            const newSchedule = new Devices({
                deviceId: req.body.deviceId, //tên thiết bị
                deviceCode: req.body.deviceCode, //mã thiết bị
                deviceImg: req.body.deviceImg, //hình ảnh
                purchaseDate: req.body.purchaseDate, //ngày mua
                maintenanceSchedule: req.body.maintenanceSchedule, //lịch bảo dưỡng
                lastMaintenanceDate: lastMaintenanceDate, //lần cuối bảo dưỡng
                depreciation: req.body.depreciation, //khấu hao
                nextMaintenance: formattedNextMaintenanceDate, //kỳ bảo dưỡng tiếp theo
                locationId: req.body.locationId, //vị trí
                statusId: req.body.statusId, //trạng thái
                categoryId: req.body.categoryId //phân loại
            });
            const device = await newSchedule.save();
            res.status(200).json(device);
        } catch (error) {
            res.status(404).json(error);
        }
    }
}
module.exports = deviceController;
