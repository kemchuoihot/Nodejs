
  import 'bootstrap/dist/js/bootstrap.bundle.min.js';
  import '@popperjs/core/dist/umd/popper.min';
  import styles from "./styles.module.css";

  import React, { useState, useEffect } from 'react';
  import axios from 'axios';

  const Main = () => {
    const [iphoneItems, setIphoneItems] = useState([]);
    const [androidItems, setAndroidItems] = useState([]);

    const [selectedItem, setSelectedItem] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const [selectedBrand, setSelectedBrand] = useState('APPLE');
    
    useEffect(() => {
      const fetchIphoneData = async () => {
          try {
              const response = await axios.get('http://localhost:5000/home');
              setIphoneItems(response.data);
              console.log(response.data);
          }
          catch (error) {
              console.log('Error fetching iPhone data:', error);
          }
      };
      fetchIphoneData();
    }, []);

    useEffect(() => {
      const fetchAndroidData = async () => {
          try {
              const response = await axios.get('http://localhost:5000/android');
              setAndroidItems(response.data);
              console.log(response.data);
          }
          catch (error) {
              console.log('Error fetching Android data:', error);
          }
      };
      if(selectedBrand === 'ANDROID') {
        fetchAndroidData();
        console.log(selectedBrand);
      }
    }, [selectedBrand]);

    const handleBrandClick = (brand) => {
      setSelectedBrand(brand);
    }

    const handleIphoneItemClick = (item) => {
      console.log('Item clicked:', item);
      if (selectedItem && selectedItem._id === item._id) {
        setSelectedItem(null);
        setShowDetails(false);
      } else {
        setSelectedItem(item);
        setShowDetails(true);
      }
    };

    const [orderItemsArray, setOrderItemsArray] = useState([]);
    const [orderPriceArray, setOrderPriceArray] = useState([]);

    const orderBasket = (itemName, itemPrice, itemImage) => {
      const newOrderItem = {
        name: itemName,
        price: itemPrice,
        image: itemImage
      };

      setOrderItemsArray(prevItems => [...prevItems, itemName]);
      setOrderPriceArray(prevPrices => [...prevPrices, itemPrice]);

    };

    const orderTotalItems = () => {
      return orderItemsArray.length; // kdhfjdhjfhdjfhdjf
    };

    const orderTotalCost = () => {
      if (orderPriceArray.length === 0) {
        return 0;
      } else {
        return orderPriceArray.reduce((total, price) => total + price, 0).toFixed(2);
      }
    };

    const orderBasketClear = () => {
      // Clear order items and prices
      setOrderItemsArray([]);
      setOrderPriceArray([]);
    };

    const formatPrice = (price) => {
      if (typeof price === 'number') {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace(/\D00(?=\D*$)/, '');
      }
      return "Price not available"; // Hoặc giá trị mặc định khác tùy vào yêu cầu của bạn
    };
    
    return (
      <div className="bg-dark h-100 p-3">
        <div className="container">
        <div className="row mx-0 py-3 bg-light">
          <div className="col-sm">
            <p>Order #88 <small className="text-muted">Today, 14 Nov 2023, 17:20 PM</small></p>
              <div className="card rounded-3 mb-3">
                  <div className="card-body">
                  <ul className="nav nav-pills" id="pills-tab" role="tablist">
                      <li className="nav-item" role="presentation">
                      <button className={`nav-link rounded-pill ${selectedBrand === 'APPLE' ? 'active' : ''}`} onClick={() => handleBrandClick('APPLE')}>APPLE</button>
                      </li>
                      <li className="nav-item" role="presentation">
                      <button className={`nav-link rounded-pill ${selectedBrand === 'ANDROID' ? 'active' : ''}`} onClick={() => handleBrandClick('ANDROID')}>ANDROID</button>
                      </li>
                  </ul>
                  </div>
              </div>

              <div className="col-sm">
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-iphone" role="tabpanel" aria-labelledby="pills-iphone-tab">
                      {selectedBrand === 'APPLE' ? (
                        iphoneItems.map(item => (
                          <div className="col" key={item._id}>
                              <div className="card" style={{marginBottom: '10px', padding: '20px'}} onClick={() => handleIphoneItemClick(item)}>
                                  <img draggable="false" src={item.photo[0]} className="card-img-top" alt="..." />
                                  <div className="card-body">
                                    <h5 className="card-title" style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '1em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</h5>
                                    <p className="card-text fw-bold iphone-price" style={{ color: 'red', fontSize: '0.8em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.price ? formatPrice(item.price) : "Price not available"}</p>
                                      {selectedItem && selectedItem._id === item._id ? (
                                        <>
                                          <p className="card-text">{item.color}</p>
                                          <p className="card-text">{item.desc}</p>
                                          <p className="card-text">{item.status}</p>
                                        </>
                                      ) : null}
                                  </div>
                              </div>
                          </div>
                        ))
                      ): null}

                      {selectedBrand === 'ANDROID' ? (
                        androidItems.map(item => (
                          <div className="col" key={item._id}>
                            {/* Hiển thị dữ liệu điện thoại Android */}
                            <div className="card" style={{ padding: '20px', width: '100%' }}>
                            <img draggable="false" src={item.photo[0]} className="card-img-top" alt="..." />
                              <div className="card-body">
                                <h5 className="card-title" style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '1em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {item.name}
                                </h5>
                                <p className="card-text fw-bold iphone-price" style={{ color: 'red', fontSize: '0.8em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {item.price ? formatPrice(item.price) : "Price not available"}</p>
                                <p className="card-text">{item.color}</p>
                                <p className="card-text">{item.desc}</p>
                                <p className="card-text">{item.status}</p>
                              </div>
                          </div>
                          </div>
                        ))
                      ) : null}
                  </div>
                </div>
              </div>
          </div>

          {/* Order */}
          <div className="col-sm">
            <div className="card">
              <div className="card-body">
                <h5 className="d-flex justify-content-between align-items-center">
                  <span>Order</span>
                  <button onClick={orderBasketClear} className="btn btn-sm btn-danger rounded-pill">Clear</button>
                </h5>
                <hr />
                <ul id="orderlist" className="list-unstyled" style={{ height: '30vh', overflowY: 'auto' }}>
                </ul>
                <hr />
                <ul className="list-unstyled">
                  <li className="d-flex justify-content-between align-items-center">
                    <big className="fw-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Total items:</big>
                    <big className="fw-bold"> <span id="total-cost" className="card-text">0.00</span></big>
                  </li>
                  <li className="d-flex justify-content-between align-items-center">
                    <big className="fw-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Total amount:</big>
                    <big className="fw-bold">$ <span id="total-cost" className="card-text">0.00</span></big>
                  </li>
                  <hr />
                  <li>
                    <button className="btn btn-primary btn-lg w-100">CHECK OUT</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;