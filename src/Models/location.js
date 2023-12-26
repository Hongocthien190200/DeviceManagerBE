const mongoose = require('mongoose');
const { Schema } = mongoose;

const LocationSchema = new Schema({
    locationName:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('Locations', LocationSchema);