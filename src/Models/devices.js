const mongoose = require('mongoose');
const { Schema } = mongoose;

const DeviceSchema = new Schema({
    deviceName: {
        type: String,
        required: true,
    },
    quantity:{
        type:String,
        required: true,
    },
    deviceCode: {
        type: String,
        required: true,
        unique: true,
    },
    deviceImg: {
        type: String,
    },
    maintenanceSchedule: {
        type: Number,
    },
    lastMaintenanceDate: {
        type: Date,
    },
    depreciation: {
        type: String,
    },
    nextMaintenance: {
        type: Date,
    },
    emloyeE: {
        type: String
    },
    modelSeri: {
        type: String,
    },
    yearofMn: {
        type: String
    },
    yearofUse: {
        type: String
    },
    desCription: {
        type: String
    },
    maintenanceStatus: {
        type: Boolean,
        default: false,
    },
    note: {
        type: String
    },
    price:{
        type:String
    },
    unitId:{
        type:String
    },
    departmentId:{
        type:String
    },
    locationId: {
        type: String
    },
    statusId: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
        required: true,
    }
}, {
    timestamps: {
        currentTime: () => new Date(Date.now() + 7 * 60 * 60 * 1000) // Đặt múi giờ +7
    }
});

module.exports = mongoose.model('Devices', DeviceSchema);