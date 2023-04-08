const express = require('express');
const {UserModel} = require('../Models/user.model');

const WithdrawRouter = express.Router();

WithdrawRouter.post("/", async(req,res)=>{
    
 const {email,panNo,amount} = req.body;
    
    try {
        const user = await UserModel.find({email,panNo});
        if(user.length>0){ 
          let balance = user[0].initialBalance;
          let total = balance - Number(amount);
          let prevStatements = user[0].statements;
          let finalStatement = [...prevStatements,{type:"withdrawed",value:Number(amount)}];
          
                await UserModel.findByIdAndUpdate({"_id":user[0]._id},{"initialBalance":total});
                await UserModel.findByIdAndUpdate({"_id":user[0]._id},{"statements":finalStatement});

                res.send({"msg":"Amount Withdrawed successfully"});
              
        }
        else{
            res.send({"msg":"Email and PAN No. does not match"});
        }
    } catch (error) {
        res.send({"msg":error.message});
    }
})

module.exports = {WithdrawRouter}