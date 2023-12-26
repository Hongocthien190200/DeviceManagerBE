const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScheduleMaintenanceSchema = new Schema({
    deviceId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    maintenanceSchedule: {
        type: Number,
        required: true,
    },
    lastMaintenanceDate: {
        type: Date,
        required: true,
    },
    nextMaintenance: {
        type: Date,
    }
}, {
    timestamps: {
        currentTime: () => new Date(Date.now() + 7 * 60 * 60 * 1000) // Đặt múi giờ +7
    }
});

module.exports = mongoose.model('ScheduleMaintenance', ScheduleMaintenanceSchema);