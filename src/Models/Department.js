const mongoose = require('mongoose');
const { Schema } = mongoose;

const DepartmenSchema = new Schema({
    departmentName:{
        type:String,
        required:true,
        unique:true,
    }
});

module.exports = mongoose.model('Departmen', DepartmenSchema);