const mongoose = require('mongoose');

const PurchaseHistorySchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customers' // Tham chiếu đến collection khách hàng
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  productsPurchased: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phones' // Tham chiếu đến collection điện thoại
      },
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  amountPaid: Number,
  excessAmount: Number
});

const PurchaseHistory = mongoose.model('PurchaseHistory', PurchaseHistorySchema, 'PurchaseHistories');

module.exports = PurchaseHistory;
