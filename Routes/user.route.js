const express = require('express');
const {UserModel} = require('../Models/user.model');

const UserRouter = express.Router();

UserRouter.post("/", async(req,res)=>{
    
 const {name,gender, dob,email, mobile,initialBalance,adharNo,panNo} = req.body;
 const payload = {name, gender, dob, email, mobile:Number(mobile),
    initialBalance:Number(initialBalance),adharNo:Number(adharNo),panNo,kyc:false,statements:[]};
    try {
        const user = await UserModel.find({email,panNo});
        if(user.length>0){
            res.send({"msg":"user already exist",user:user[0]});
        }
        else{
            const newUser = new UserModel(payload);
            await newUser.save()
            res.send({"msg":"User Saved successfully",user:payload});
        }
    } catch (error) {
        res.send({"msg":error.message});
    }
})

module.exports = {UserRouter}