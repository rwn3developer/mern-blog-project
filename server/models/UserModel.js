const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String,
        required: true 
    },
    password:  {  
        type: String,
        required: true 
    },
    gender:{
        type: String,
        required: true 
    },
    city:{
        type: String,
        required: true 
    },
    contact:{
        type: String,
        required: true 
    },
    image:{
        type:String,
        required: true
    },
    public_id:{
        type:String,
        required: true
    },
    status:{
        type:String,
        default:'deactive'
    },
    role:{
        type : String,
        enum : ['admin','manager','user'],
        default:'user'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
const user = mongoose.model('user', userSchema);
module.exports = user;
