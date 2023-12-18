import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderDetails.css';

const OrderDetails = ({orderId}) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Gọi endpoint để lấy thông tin chi tiết đơn hàng dựa vào purchaseId (ID đơn hàng)
        const response = await axios.get(`http://localhost:5000/purchase-history/${orderId}`);
        setOrder(response.data);

      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // ... (hiển thị chi tiết đơn hàng)
  return (
    <div>
      {order ? (
        <div>
          <h3>Order Details</h3>
          <p><strong>Date:</strong> {order.purchaseDate}</p>
          <p><strong>Total Amount:</strong> {order.totalAmount}</p>
          <p><strong>Amount Paid:</strong> {order.amountPaid}</p>
          <p><strong>Excess Amount:</strong> {order.excessAmount}</p>
          <p><strong>Products Purchased:</strong></p>
          <ul>
            {order.productsPurchased.map((product, index) => (
              <li key={index}>
                <p><strong>Product ID:</strong> {product.productId}</p>
                <p><strong>Quantity:</strong> {product.quantity}</p>
                <p><strong>Price:</strong> {product.price}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default OrderDetails;