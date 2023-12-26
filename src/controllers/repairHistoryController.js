const RepairHistory = require('../Models/repairHistory');
const Devices = require('../Models/devices');
const Repairer = require('../Models/repairer');

const repairHistoryController = {
    show: async (req, res) => {
        try {
            const listRpHistorys = await RepairHistory.find({});
            res.status(200).json(listRpHistorys);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    showById: async (req, res) => {
        try {
            const rpHistoryById = await RepairHistory.findOne({ _id: req.params.id });
            res.status(200).json(rpHistoryById);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    showByIdDevice: async (req, res) => {
        try {
            const listrpHis = await RepairHistory.find({ deviceId: req.params.id });
            res.status(200).json(listrpHis)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    create: async (req, res) => {
        try {
            const device = await Devices.findOne({ _id: req.params.id });
            const repairer = await Repairer.findOne({ _id: req.body.repairerId });
            const newRepairHistory = new RepairHistory({
                deviceId: device._id,
                deviceName: device.deviceName,
                deviceCode: device.deviceCode,
                reasonRepair: req.body.reasonRepair,
                decriptionRepair: req.body.decriptionRepair,
                repairPrice: req.body.repairPrice,
                repairerName : repairer.repairerName,
                repairerDeputy: repairer.repairerDeputy,
                repairerAddress: repairer.repairerAddress,
                repairerPhone: repairer.repairerPhone
            });
            const repairHistory = await newRepairHistory.save();
            res.status(200).json(repairHistory);
        } catch (error) {
            res.status(404).json(error);
        }
    },
    update: async (req, res) => {
        try {
            const repairHisId = req.params.id;
            const updateData = req.body;

            // Kiểm tra xem thiết bị có tồn tại hay không
            const repairHis = await RepairHistory.findOne({ _id: repairHisId });

            if (!repairHis) {
                return res.status(404).json({ message: 'Thiết bị không tồn tại.' });
            }

            // Cập nhật thông tin của thiết bị
            let updatedrepairHis = await RepairHistory.findOneAndUpdate(
                { _id: repairHisId },
                { $set: updateData },
                { new: true } // Trả về thiết bị sau khi đã cập nhật
            );
            // Trả về thông tin của thiết bị sau khi đã cập nhật
            res.status(200).json(updatedrepairHis);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật thiết bị.', error });
        }
    },

}
module.exports = repairHistoryController;
