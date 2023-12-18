import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerInfo.css';

const CustomerInfo = () => {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/customer/customers');
        setCustomerData(response.data);

      } catch (error) {
        console.error('Error fetching customer info:', error);
      }
    };

    fetchCustomerInfo();
  }, []);

  return (
    <div className="customer-info-container">
      <h2>Customer Information</h2>
      {customerData ? (
        <div className="customer-details">
          {customerData.map((customer, index) => (
            <div key={index}>
              <p><strong>Name:</strong> {customer.fullname}</p>
              <p><strong>Address:</strong> {customer.address}</p>
              <p><strong>Phone Number:</strong> {customer.phone_number}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CustomerInfo;
