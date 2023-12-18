const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const PurchaseHistory = require('../models/PurchaseHistory');

router.use(bodyParser.urlencoded({ extended: true }));

// Endpoint GET /purchase-history - Trả về danh sách tất cả lịch sử mua hàng
router.get('/purchase-history', async (req, res) => {
  try {
    const purchaseHistory = await PurchaseHistory.find();
    res.json(purchaseHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint GET /purchase-history/:purchaseId - Trả về thông tin chi tiết về một đơn hàng cụ thể
router.get('/purchase-history/:purchaseId', async (req, res) => {
  const { purchaseId } = req.params;
  try {
    const purchase = await PurchaseHistory.findById(purchaseId);
    res.json(purchase);
  } catch (err) {
    res.status(404).json({ message: 'Không tìm thấy lịch sử mua hàng' });
  }
});

// Endpoint POST /purchase - Tạo một lịch sử mua hàng mới
router.post('/purchase', async (req, res) => {
  const { customerId, productsPurchased, totalAmount, amountPaid, excessAmount } = req.body;
  try {
    const newPurchase = new PurchaseHistory({
      customerId,
      productsPurchased,
      totalAmount,
      amountPaid,
      excessAmount
    });

    const createdPurchase = await newPurchase.save();
    res.status(201).json(createdPurchase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;