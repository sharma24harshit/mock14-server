const express = require('express');
const {UserModel} = require('../Models/user.model');

const CloseRouter = express.Router();

CloseRouter.delete("/", async(req,res)=>{
    
 const {email,panNo} = req.body;
    
    try {
        const user = await UserModel.find({email,panNo});
        if(user.length>0){

                await UserModel.findByIdAndDelete({"_id":user[0]._id});
        
                res.send({"msg":"User Account Closed successfully"});
              
        }
        else{
            res.send({"msg":"Email and PAN No. does not match"});
        }
    } catch (error) {
        res.send({"msg":error.message});
    }
})

module.exports = {CloseRouter}