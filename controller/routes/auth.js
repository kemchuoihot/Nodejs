//xử lý đăng nhập - log in
const router = require("express").Router();
const Account = require('../models/Account');
const joi = require('joi')
const bcrypt = require('bcrypt');
const loginValidator = require('../routes/validator/loginValidator');
const jwt = require('jsonwebtoken');

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
            res.cookie('token',token);
            res.json({loginStatus: true, token: token});
        }
    } catch (error) {
        res.json({loginStatus: false});
        console.log(error.message)
        res.status(500).send({message:"Server Error"})
    }
})

module.exports = router;