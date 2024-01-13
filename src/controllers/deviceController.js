const Category = require('../Models/category');
const Devices = require('../Models/devices');
const Location = require('../Models/location');
const Status = require('../Models/status');
const Maintenance = require('../Models/maintenanceHistory');
const RepairHis = require('../Models/repairHistory');
const Repairer = require('../Models/repairer');
const User = require('../Models/User');
const Unit = require('../Models/Unit');
const Department = require('../Models/Department');
const {addDays, format } = require('date-fns');

function convertToVietnamTimeZone(date) {
    const offset = 7 * 60; // Độ chênh múi giờ từ UTC đến GMT+7 (Việt Nam)
    const localTime = date.getTime() + (date.getTimezoneOffset() + offset) * 60 * 1000;
    return new Date(localTime);
}
const deviceController = {
    show: async (req, res) => {
        Promise.all([Devices.find({}), Location.find({}), Status.find({}), Category.find({}),  Unit.find({}), Department.find({})])
            .then(([devices, locations, statuses, categories, units, departments]) => {
                const listDevices = devices.map(device => {
                    const location = locations.find(function (location) {
                        return location._id == device.locationId
                    });
                    const status = statuses.find(function (status) {
                        return status._id == device.statusId
                    });
                    const category = categories.find(function (category) {
                        return category._id == device.categoryId
                    });
                    const unit = units.find(function (unit) {
                        return unit._id == device.unitId
                    });
                    let department;
                    if (device.departmentId) {
                        department = departments.find(function (item) {
                            return item._id == device.departmentId
                        })
                    }
                    else {
                        department = "";
                    }
                    return {
                        id: device._id,
                        deviceName: device.deviceName,
                        deviceImg: device.deviceImg,
                        deviceCode: device.deviceCode,
                        maintenanceSchedule: device.maintenanceSchedule,
                        lastMaintenanceDate: device.lastMaintenanceDate,
                        depreciation: device.depreciation,
                        nextMaintenance: device.nextMaintenance,
                        emloyeE: device.emloyeE,
                        modelSeri: device.modelSeri,
                        yearofMn: device.yearofMn,
                        yearofUse: device.yearofUse,
                        desCription: device.desCription,
                        maintenanceStatus: device.maintenanceStatus,
                        note: device.note,
                        price: device.price,
                        unit: unit.unitName,
                        department: department.departmentName,
                        locationId: location._id,
                        location: location.locationName,
                        categoryId: category._id,
                        category: category.categoryName,
                        statusId: status._id,
                        status: status.statusName
                    }
                })
                res.status(200).json(listDevices)
            })
            .catch((error) =>{
                console.log(error)
                res.status(500).json(error)
            })

    },
    showById: async (req, res) => {
        Promise.all([Devices.findOne({ _id: req.params.id }), Location.find({}), Status.find({}), Category.find({}), Unit.find({}), Department.find({})])
            .then(([device, locations, statuses, categories, units, departments]) => {

                const location = locations.find(function (location) {
                    return location._id == device.locationId
                });
                const status = statuses.find(function (status) {
                    return status._id == device.statusId
                });
                const category = categories.find(function (category) {
                    return category._id == device.categoryId
                });
                const unit = units.find(function (unit) {
                    return unit._id == device.unitId
                });
                let department;
                    if (device.departmentId) {
                        department = departments.find(function (item) {
                            return item._id == device.departmentId
                        })
                    }
                    else {
                        department = "";
                    }
                const Device = {
                    id: device._id,
                    deviceName: device.deviceName,
                    deviceImg: device.deviceImg,
                    deviceCode: device.deviceCode,
                    maintenanceSchedule: device.maintenanceSchedule,
                    lastMaintenanceDate: device.lastMaintenanceDate,
                    depreciation: device.depreciation,
                    nextMaintenance: device.nextMaintenance,
                    emloyeE: device.emloyeE,
                    modelSeri: device.modelSeri,
                    yearofMn: device.yearofMn,
                    yearofUse: device.yearofUse,
                    desCription: device.desCription,
                    maintenanceStatus: device.maintenanceStatus,
                    note: device.note,
                    price: device.price,
                    unit: unit.unitName,
                    department: department.departmentName,
                    locationId: location._id,
                    location: location.locationName,
                    categoryId: category._id,
                    category: category.categoryName,
                    statusId: status._id,
                    status: status.statusName
                }


                res.status(200).json(Device)
            })
            .catch(error => res.status(500).json(error))

    },
    create: async (req, res) => {
        try {
            
            console.log(req.body)
            let newDevice;
            if (req.body.maintenanceSchedule !== "") {
                const maintenanceInterval = await req.body.maintenanceSchedule; //lịch bảo dưỡng
                const lastMaintenanceDate = convertToVietnamTimeZone(new Date(req.body.lastMaintenanceDate)); //lần cuối bảo dưỡng
                const nextMaintenanceDate = convertToVietnamTimeZone(addDays(lastMaintenanceDate, maintenanceInterval)); //kỳ bảo dưỡng tiếp theo
                const formattedNextMaintenanceDate = format(nextMaintenanceDate, 'yyyy-MM-dd',{ timeZone: 'Asia/Ho_Chi_Minh' }); //định dạng ngày bảo dưỡng tiếp theo
                newDevice = new Devices({
                    deviceName: req.body.deviceName, //tên thiết bị
                    quantity: req.body.quantity,
                    deviceCode: req.body.deviceCode, //mã thiết bị
                    deviceImg: req.body.deviceImg, //hình ảnh
                    maintenanceSchedule: req.body.maintenanceSchedule, //lịch bảo dưỡng
                    lastMaintenanceDate: lastMaintenanceDate, //lần cuối bảo dưỡng
                    depreciation: req.body.depreciation, //khấu hao
                    nextMaintenance: formattedNextMaintenanceDate, //kỳ bảo dưỡng tiếp theo
                    emloyeE: req.body.emloyeE,
                    modelSeri: req.body.modelSeri,
                    yearofMn: req.body.yearofMn,
                    yearofUse: req.body.yearofUse,
                    desCription: req.body.desCription,
                    note: req.body.note,
                    price: req.body.price,
                    unitId: req.body.unitId,
                    departmentId: req.body.departmentId,
                    locationId: req.body.locationId, //vị trí
                    statusId: req.body.statusId, //trạng thái
                    categoryId: req.body.categoryId //phân loại
                });
            } else {
                newDevice = new Devices({
                    deviceName: req.body.deviceName, //tên thiết bị
                    deviceCode: req.body.deviceCode, //mã thiết bị
                    deviceImg: req.body.deviceImg, //hình ảnh
                    depreciation: req.body.depreciation, //khấu hao
                    emloyeE: req.body.emloyeE,
                    modelSeri: req.body.modelSeri,
                    yearofMn: req.body.yearofMn,
                    yearofUse: req.body.yearofUse,
                    desCription: req.body.desCription,
                    note: req.body.note,
                    price: req.body.price,
                    unitId: req.body.unitId,
                    departmentId: req.body.departmentId,
                    locationId: req.body.locationId, //vị trí
                    statusId: req.body.statusId, //trạng thái
                    categoryId: req.body.categoryId //phân loại
                });
            }
            const device = await newDevice.save();
            res.status(200).json(device);
        } catch (error) {
            res.status(404).json(error);
        }
    },

    update: async (req, res) => {
        try {
            const deviceId = req.params.id;
            const updateData = req.body;

            // Kiểm tra xem thiết bị có tồn tại hay không
            const device = await Devices.findOne({ _id: deviceId });

            if (!device) {
                return res.status(404).json({ message: 'Thiết bị không tồn tại.' });
            }

            // Cập nhật thông tin của thiết bị
            let updatedDevice = await Devices.findOneAndUpdate(
                { _id: deviceId },
                { $set: updateData },
                { new: true } // Trả về thiết bị sau khi đã cập nhật
            );

            // Kiểm tra nếu bạn đã cập nhật lịch bảo dưỡng (ví dụ: maintenanceSchedule)
            if (updateData.maintenanceSchedule) {
                const maintenanceInterval = updatedDevice.maintenanceSchedule; //lịch bảo dưỡng
                const lastMaintenanceDate = new Date(device.lastMaintenanceDate); //lần cuối bảo dưỡng
                const nextMaintenanceDate = addDays(lastMaintenanceDate, maintenanceInterval); //kỳ bảo dưỡng tiếp theo
                const formattedNextMaintenanceDate = format(nextMaintenanceDate, 'yyyy-MM-dd'); //định dạng ngày bảo dưỡng tiếp theo 

                const updatenewData = {
                    nextMaintenance: formattedNextMaintenanceDate
                }

                // Cập nhật thông tin kỳ bảo dưỡng tiếp theo
                updatedDevice = await Devices.findOneAndUpdate(
                    { _id: deviceId },
                    { $set: updatenewData },
                    { new: true } // Trả về thiết bị sau khi đã cập nhật
                );
            }

            // Trả về thông tin của thiết bị sau khi đã cập nhật
            res.status(200).json(updatedDevice);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật thiết bị.', error });
        }
    },

    countAll: async (req, res) => {
        Promise.all([Devices.find({}), Location.find({}), Category.find({}), Maintenance.find({}), RepairHis.find({}), Repairer.find({}), User.find({})])
            .then(([devices, locations, categories, maintenances, repairerhises, repairers, user]) => {
                const data = {
                    divices: devices.length,
                    locations: locations.length,
                    categories: categories.length,
                    maintenances: maintenances.length,
                    repairerhises: repairerhises.length,
                    repairers: repairers.length,
                    user: user.length
                };
                res.json(data);
            })
            .catch((error) => {
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }
}
module.exports = deviceController;
