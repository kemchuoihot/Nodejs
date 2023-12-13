const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser")
const Phone = require('../models/Phone');

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
    const { name, brand, color, photo, desc, price, status } = req.body;
    const phone = new Phone({ name, brand, color, photo, desc, price, status });
    await phone.save();
    res.status(201).send(phone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  console.log(req.body);
});

module.exports = router;