const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username:{
        unique: true,
        type: String,
        required: true,
        minlength:8,
        maxlenght: 20,
    },
    fullname:{
        type: String,
        required: true,
        minlength:8,
        maxlenght: 255,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        minlength:8,
        maxlenght: 16,
    },
    admin:{
        type: Boolean,
        default: false,
    }
},{timestamps:true}
);
module.exports = mongoose.model("User",UserSchema);