//xử lý đăng nhập - log in
const router = require("express").Router();
const Account = require('../models/Account');
const joi = require('joi')
const bcrypt = require('bcrypt');

router.post('/',async (req,res) =>{
    try {
        // const {error} = validate(req.body);
        // if(error){
        //     return res.status(400).send({message: error.details[0].message});
        // }
        const account = await Account.findOne({email: req.body.email});
        if(!account){
            return res.status(401).send({message:"Invalid email or password"});
        }
        const validPassword = await bcrypt.compare(
            req.body.password, account.password
        );
        if(!validPassword){
            return res.status(401).send({message:"Invalid email or password"});
        }
        // const token = account.generateAuthToken();
        res.status(200).send({message:"Logged in successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:"Server Error"})
    }
})
// const validate = (data) =>{
//     const schema = joi.object({
//         email: joi.string().email().required().label("Email"),
//         password: joi.string().required().label("Password")
//     });
//     return schema.validate(data)
// }

module.exports = router;