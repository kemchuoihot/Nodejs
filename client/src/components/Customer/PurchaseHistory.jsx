import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PurchaseHistory.css';

const PurchaseHistory = ({ customerInfo }) => {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState(null);
  
  // Sử dụng thông tin khách hàng được truyền từ props
  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        // Gọi API để lấy lịch sử mua hàng cho khách hàng cụ thể (sử dụng thông tin từ props)
        const response = await axios.get(`http://localhost:5000/purchase-history/${customerInfo.id}`);
        setPurchases(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching purchase history:', error.message);
        setError('Error fetching purchase history');
      }
    };

    fetchPurchaseHistory();
  }, [customerInfo]); 

  // ... (hiển thị lịch sử mua hàng)
  return (
    <div>
      <h3>Purchase History</h3>
      {purchases && purchases.length > 0 ? (
        <div>
          {purchases.map((purchase, index) => (
            <div key={index}>
              <p><strong>Date:</strong> {purchase.purchaseDate}</p>
              <p><strong>Total Amount:</strong> {purchase.totalAmount}</p>
              <p><strong>Amount Paid:</strong> {purchase.amountPaid}</p>
              <p><strong>Excess Amount:</strong> {purchase.excessAmount}</p>
              <p><strong>Products Purchased:</strong></p>
              <ul>
                {purchase.productsPurchased.map((product, pIndex) => (
                  <li key={pIndex}>
                    <p><strong>Product ID:</strong> {product.productId}</p>
                    <p><strong>Quantity:</strong> {product.quantity}</p>
                    <p><strong>Price:</strong> {product.price}</p>
                  </li>
                ))}
              </ul>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>No purchase history available</p>
      )}
    </div>
  );
};

export default PurchaseHistory;