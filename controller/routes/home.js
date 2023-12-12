/* Content: Handles HTTP requests to perform CRUD (Create, Read, Update, Delete) operations on phone objects */
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser")
const Phone = require('../models/Phone');

router.use(bodyParser.urlencoded({ extended: true }));
router.get('/', async (req, res) => {
  try {
    const phones = await Phone.find();
    console.log(phones);
    res.status(200).json(phones);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
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
