const express = require('express');
const { connection } = require('./db');
require('dotenv').config();
const cors  =require("cors");
const {UserRouter} = require("./Routes/user.route"); 
const {UpdateKycRouter} = require("./Routes/updateKyc.route");
const {DepositRouter} = require("./Routes/deposit.route");
const {WithdrawRouter} = require("./Routes/withdraw.route");
const {CloseRouter} = require("./Routes/close.route");

const app = express();
app.use(cors({origin:"*"}));
app.use(express.json());

app.use("/create", UserRouter);
app.use("/updatekyc", UpdateKycRouter);
app.use("/deposit", DepositRouter);
app.use("/withdraw", WithdrawRouter);
app.use("/closeaccount", CloseRouter);

app.get("/",(req,res)=>{
    res.send("Homepage")
});

app.listen(process.env.port, async()=>{
try {
    await connection
    console.log("connected to db")
} catch (error) {
    console.log(error)
}
console.log("connected to port")
})