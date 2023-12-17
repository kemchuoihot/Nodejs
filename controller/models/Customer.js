const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Customer', CustomerSchema, 'Customers');
