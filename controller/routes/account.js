//xử lý đăng ký -- Sign up

const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.send("Staff page")
});
router.post('/', async (req,res) =>{
    try {
        // if(error){
        //     return res.status(400).send({message: error.details[0].message});
        // }
        const account = await Account.findOne({email: req.body.email});
        if(account){
            return res.status(409).send({message: "Already exists"});
        }
        // const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password,10);
        console.log(req.body)
        await new Account({...req.body,password:hashPassword}).save()
        res.status(201).send({message:"Success to create account!"})

    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: "Server Error", error: error.message})
    }
})

module.exports = router;