const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser")
const Phone = require('../models/Phone');
const Customer = require('../models/Customer');

router.post('/check-phone', async (req, res) => {
    try {
      const { phone_number } = req.body;
  
      // Kiểm tra xem số điện thoại đã tồn tại trong cơ sở dữ liệu hay chưa
      const existingCustomer = await Customer.findOne({ phone_number });
  
      if (existingCustomer) {
        // Nếu số điện thoại đã tồn tại, trả về thông tin của khách hàng
        return res.status(200).json({ customer: existingCustomer });
      } else {
        // Nếu số điện thoại chưa tồn tại, trả về thông báo lỗi
        return res.status(404).json({ message: 'Customer not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

// Route handling for creating a new customer account
router.post('/create-account', async (req, res) => {
    try {
      const { fullname, address, phone_number } = req.body;
  
      // Check if the phone number already exists in the database
      const existingCustomer = await Customer.findOne({ phone_number });
  
      if (existingCustomer) {
        // If the phone number already exists, return a message indicating the account exists
        return res.status(409).json({ message: 'Account already exists for this phone number' });
      } else {
        // If the phone number doesn't exist, create a new customer account
        const newCustomer = new Customer({ fullname, address, phone_number });
        await newCustomer.save();
  
        // Return the newly created customer account information
        return res.status(201).json({ customer: newCustomer });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

module.exports = router;