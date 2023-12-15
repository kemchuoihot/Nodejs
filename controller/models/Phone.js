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
    type: [{
      type: String,
      enum: ['available', 'unavailable']
    }],
    default: ['available']
  },
  import:{
    type: Number,
    // required: true,
    default: 0
  }
})

PhoneSchema.pre('save', function(next) {
  const currentDate = new Date();

  this.createdAt = currentDate;

  next();
});

module.exports = mongoose.model('Phone', PhoneSchema, 'Phones');