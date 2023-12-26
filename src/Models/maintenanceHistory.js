const mongoose = require('mongoose');
const { Schema } = mongoose;

const MaintenanceHistorySchema = new Schema({
    deviceId: {
        type: String,
        required: true,
    },
    deviceName: {
        type: String,
        required: true,
    },
    deviceCode: {
        type: String,
        required: true,
    },
    reasonMaintenance: {
        type: String,
        required: true,
    },
    decriptionMaintenance: {
        type: String,
        required: true,
    },
    maintenancePrice:{
        type:Number
    },
    repairerId: {
        type: String,
    },
    repairerName:{
        type:String,
        required:true,
    },
    repairerDeputy:{
        type:String,
        required:true,
    },
    repairerAddress:{
        type:String,
        required:true,
    },
    repairerPhone:{
        type:String,
        required:true,
    },
}, {
    timestamps: {
        currentTime: () => new Date(Date.now() + 7 * 60 * 60 * 1000) // Đặt múi giờ +7
    }
});
module.exports = mongoose.model('MaintenanceHistory', MaintenanceHistorySchema);