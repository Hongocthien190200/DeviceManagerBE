const MaintenanceHistory = require('../Models/maintenanceHistory');
const Devices = require('../Models/devices');
const Repairer = require('../Models/repairer');
const { addDays, format } = require('date-fns');

const maintenanceHistoryController = {
    show: async (req, res) => {
        try {
            const listmnHistorys = await MaintenanceHistory.find({})
            res.status(200).json(listmnHistorys)
        } catch (error) {
            res.status(500).json(error);
        }
    },
    showById: async (req, res) => {
        try {
            const mnHistoryById = await MaintenanceHistory.findOne({ _id: req.params.id });
            res.status(200).json(mnHistoryById)
        } catch (error) {
            res.status(500).json(error);
        }
    },
    showByIdDevice: async (req, res) => {
        try {
            const listMnById = await MaintenanceHistory.find({ deviceId: req.params.id });
            res.status(200).json(listMnById)
        } catch (error) {
            res.status(500).json(error);
        }
    },
    create: async (req, res) => {
        try {
            const currentDate = new Date();
            currentDate.setHours(currentDate.getHours() + 7);
            const device = await Devices.findOne({ _id: req.params.id });
            const repairer = await Repairer.findOne({ _id: req.body.repairerId });
            const newMaintenanceHistory = new MaintenanceHistory({
                deviceId: device._id,
                deviceName: device.deviceName,
                deviceCode: device.deviceCode,
                reasonMaintenance: req.body.reasonMaintenance,
                decriptionMaintenance: req.body.decriptionMaintenance,
                maintenancePrice: req.body.maintenancePrice,
                repairerName : repairer.repairerName,
                repairerDeputy: repairer.repairerDeputy,
                repairerAddress: repairer.repairerAddress,
                repairerPhone: repairer.repairerPhone
            });
            const maintenanceHistory = await newMaintenanceHistory.save();
            if (maintenanceHistory) {
                const maintenanceInterval = device.maintenanceSchedule; //lịch bảo dưỡng
                const nextMaintenanceDate = addDays(currentDate, maintenanceInterval); //kỳ bảo dưỡng tiếp theo
                const formattedNextMaintenanceDate = format(nextMaintenanceDate, 'yyyy-MM-dd');
                const updateData = {
                    lastMaintenanceDate: currentDate,
                    nextMaintenance: formattedNextMaintenanceDate,
                    maintenanceStatus: false,
                }
                await Devices.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: updateData },
                    { new: true } // Trả về thiết bị sau khi đã cập nhật
                );
            }
            res.status(200).json(maintenanceHistory);
        } catch (error) {
            res.status(404).json(error);
        }
    },
    update: async (req, res) => {
        try {
            const mnHisId = req.params.id;
            const updateData = req.body;

            // Kiểm tra xem thiết bị có tồn tại hay không
            const mnHis = await MaintenanceHistory.findOne({ _id: mnHisId });

            if (!mnHis) {
                return res.status(404).json({ message: 'Thiết bị không tồn tại.' });
            }

            // Cập nhật thông tin của thiết bị
            let updatedMnHis = await MaintenanceHistory.findOneAndUpdate(
                { _id: mnHisId },
                { $set: updateData },
                { new: true } // Trả về thiết bị sau khi đã cập nhật
            );
            // Trả về thông tin của thiết bị sau khi đã cập nhật
            res.status(200).json(updatedMnHis);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật thiết bị.', error });
        }
    },
}
module.exports = maintenanceHistoryController;
