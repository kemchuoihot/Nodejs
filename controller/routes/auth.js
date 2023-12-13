//xử lý đăng nhập - log in
const router = require("express").Router();
const Account = require('../models/Account');
const joi = require('joi')
const bcrypt = require('bcrypt');
const loginValidator = require('../routes/validator/loginValidator');
const jwt = require('jsonwebtoken');
const midAdd = require('../middleware/login');

router.post('/',loginValidator,async (req,res) =>{
    try {
        const account = await Account.findOne({username: req.body.username});
        if(!account){
            res.json({loginStatus: false});
            return res.status(401).send({message:"Invalid email or password"});
        }
        const validPassword = await bcrypt.compare(
            req.body.password, account.password
        );
        if(!validPassword){
            res.json({loginStatus: false});
            return res.status(401).send({message:"Invalid email or password"});
        }
        else{
            const token = jwt.sign({username: account.username},process.env.JWTPRIVATEKEY,{expiresIn: '1h'});
            res.json({loginStatus: true, token: token});
        }
    } catch (error) {
        res.json({loginStatus: false});
        console.log(error.message)
        res.status(500).send({message:"Server Error"})
    }
})



router.get('/employee',async (req, res) => {
    try {
        const employee = await Account.find();
        res.json({Status: true, employee});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.post('/block_employee',async (req, res) => {
    try {
        const employee = await Account.findOne({email: req.body.email});
        if (employee) {
            if(employee.status === "inactive"){
                return res.status(401).send({message:"Can not block a inactive account"});
            }
            else if (employee.status === "active") {
                newStatus = "block";
            } else if (employee.status === "block") {
                newStatus = "active";
            }
            employee.status = newStatus;
            await employee.save();
            console.log(employee)
            res.json({Status: true, employee});
        } else {
            res.status(404).json({message: "Employee not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})
module.exports = router;