const mongoose = require('mongoose');
const { Schema } = mongoose;

const RepairerSchema = new Schema({
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
});

module.exports = mongoose.model('Repairers', RepairerSchema);