const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{type:String, required:true},
    gender:{type:String, required:true},
    dob:{type:String, required:true},
    email:{type:String, required:true},
    mobile:{type:Number, required:true},
    initialBalance:{type:Number, required:true},
    adharNo:{type:Number, required:true},
    panNo:{type:String, required:true},
    kyc:{type:Boolean,required:true},
    statements:{type:Array,required:true}
},{
    versionKey:false
});

const UserModel = mongoose.model("user",userSchema);

module.exports = {UserModel}