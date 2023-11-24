//xử lý đăng ký -- Sign up

const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator');
const signupValidator = require('./validator/signupValidator');

router.get('/', (req, res) => {
    res.send("Staff page")
});
router.post('/', async (req,res) =>{
    let result = validationResult(req);
    if(result.errors.length === 0){
        try {
            const account = await Account.findOne({email: req.body.email});
            if(account){
                return res.status(409).send({message: "Already exists"});
            }
            // const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password,10);
            console.log(req.body)
            const {name,email} = req.body
            const username = email.split('@')[0]
            await new Account({name:name,email:email,username:username,password:hashPassword}).save()
            res.status(201).send({message:"Success to create account!"})
    
        } catch (error) {
            console.log(error.message)
            res.status(500).send({message: "Server Error", error: error.message})
        }
    }else{
        let messages = result.mapped();
        let message = '';
        for(m in messages){
            message = messages[m].msg;
            break;
        }
        return res.json({message: message});
    }

    
})

module.exports = router;