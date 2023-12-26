const mongoose = require('mongoose');
const { Schema } = mongoose;

const StatusSchema = new Schema({
    statusName:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('Status', StatusSchema);