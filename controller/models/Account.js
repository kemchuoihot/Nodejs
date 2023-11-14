const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const joi = require('joi')
// const passwordComplexity = require('joi-password-complexity');

const AccountSchema = new mongoose.Schema({
    name: {type: String, required: true, minLength: 3},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minLength: 6},
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account