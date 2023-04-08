const express = require('express');
const {UserModel} = require('../Models/user.model');

const UpdateKycRouter = express.Router();

UpdateKycRouter.post("/", async(req,res)=>{
    
 const {name, dob,email, mobile,adharNo,panNo} = req.body;
    
    try {
        const user = await UserModel.find({email,panNo});
        if(user.length>0){
            if(user[0].name==name && user[0].dob ==dob && user[0].mobile ==mobile && user[0].adharNo == adharNo){
                await UserModel.findByIdAndUpdate({"_id":user[0]._id},{"kyc":true})
                res.send({"msg":"KYC updated successfully",user:user[0]});
            }
            else{
                res.send({"msg":"Please fill correct details"});
            }
            
        }
        else{
            res.send({"msg":"Email and PAN No. does not match"});
        }
    } catch (error) {
        res.send({"msg":error.message});
    }
})

module.exports = {UpdateKycRouter}