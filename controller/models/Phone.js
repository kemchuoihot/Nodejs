const mongoose = require('mongoose');


const PhoneSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  brand:{
    type: String,
    required: true
  },
  color:{
    type: String,
    required: true
  },
  photo:{
    type: [String]
  },
  desc:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true,
    min: 0
  },
  status:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Phone', PhoneSchema);;