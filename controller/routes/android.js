const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser")
const Phone = require('../models/Phone');
const Customer = require('../models/Customer');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async(req, res) => {
    try {
      const androidPhones = await Phone.find({brand: 'Android'});
      console.log(androidPhones);
      res.status(200).json(androidPhones);
    } catch(error) {
      res.status(500).json({message: 'Server error'});
    }
  });

router.post('/', async (req, res) => {
  try {
    const { barcode, name, brand, color, photo, desc, price, status } = req.body;
    const androidPhones = new Phone({ barcode, name, brand, color, photo, desc, price, status });
    await androidPhones.save();
    res.status(201).send(phone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  console.log(req.body);
});

router.post('/checkout', async (req, res) => {
  try {
    const { phone_number } = req.body;

    // Kiểm tra xem số điện thoại đã tồn tại trong cơ sở dữ liệu hay chưa
    const existingCustomer = await Customer.findOne({ phone_number });

    if (existingCustomer) {
      // Nếu số điện thoại đã tồn tại, trả về thông tin của khách hàng
      return res.status(200).json({ customer: existingCustomer });
    } else {
      // Nếu số điện thoại chưa tồn tại, tạo khách hàng mới
      const { fullname, address } = req.body; // Lấy thông tin fullname và address từ request

      const newCustomer = new Customer({ fullname, address, phone_number });
      await newCustomer.save();

      return res.status(201).json({ customer: newCustomer });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;