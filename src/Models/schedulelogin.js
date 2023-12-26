const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    userName:{
        type:String,
        required:true,
    },
    id:{
        type:String,
        required:true,
    },
    loginInfo :{
        type:Object,
        location: Array,
        timestamp: Date,
    },
});

module.exports = mongoose.model('Schedule', CategorySchema);