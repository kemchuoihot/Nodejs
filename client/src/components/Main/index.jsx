
  import 'bootstrap/dist/js/bootstrap.bundle.min.js';
  import '@popperjs/core/dist/umd/popper.min';
  import './main.css';
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';

  const Main = () => {
    const [iphoneItems, setIphoneItems] = useState([]);
    const [androidItems, setAndroidItems] = useState([]);

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedBrand, setSelectBrand] = useState('APPLE');

    const [showModal, setShowModal] = useState(false);

    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [customerInfo, setCustomerInfo] = useState(null);
    const[showNewCustomerForm, setShowNewCustomerForm] = useState(false);

    const handleShowModal = () => setShowModal(true);

    const handleCloseModal = (id) => {
      // setSelectedItem(null);
      // setShowModal(false);
      // console.log("Modal closed");
      document.getElementById(id).style.display = 'none';
    }

    useEffect(() => {
      const fetchIphoneData = async () => {
          try {
              const response = await axios.get('/home');
              setIphoneItems(response.data.filter(item => item.brand === 'Apple'));
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
              const response = await axios.get('/android');
              setAndroidItems(response.data.filter(item => item.brand === 'Android'));
              console.log(response.data);
          }
          catch (error) {
              console.log('Error fetching Android data:', error);
          }
      };
      if(selectedBrand === 'ANDROID') {
        fetchAndroidData();
      }
    }, [selectedBrand])

    const handleBrandClick = (brand) => {
      setSelectBrand(brand);
      console.log(brand)
    }

    const handleItemClick = (item) => {
      setSelectedItem(item);
      handleShowModal(true);
    };

    const addToCart = (item) => {
      const newItem = {
        id: item._id,
        name: item.name,
        price: item.price,
        image: item.photo[0]
      };
    
    const updatedOrderArray = [...orderArray, newItem];
      setOrderArray(updatedOrderArray);
      handleCloseModal();
  };

  const [orderArray, setOrderArray] = useState([]);
  const orderTotalItems = () => orderArray.length;
    
  const orderTotalCost = () => orderArray.reduce((total, item) => {
    return total + (item.price || 0);
  }, 0).toFixed(2);
    
  const orderBasketClear = () => {
    setOrderArray([]);
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace(/\D00(?=\D*$)/, '');
    }
    return "Price not available"; // Hoặc giá trị mặc định khác tùy vào yêu cầu của bạn
  };


 /* Xử lí CHECKOUT */
  const handleCheckout = () => {
    setShowPhoneModal(true);
  }

  const handlePhoneInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullname(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePhoneSubmit = async() => {
    try {
      const response = await axios.post('/check-phone', {phone_number: phoneNumber});
      const { customer } = response.data;

      if(customer) {
        setCustomerInfo(customer);
      }
      else {
        setShowPhoneModal(false);
        setShowNewCustomerForm(true);
      }
    } catch (error) {
      console.log('Error checking phone number:', error);
    }
  };

  const handleCreateAccount = async () => {
    try {
      const response = await axios.post('/create-account', {
        phone_number: phoneNumber,
        fullname: fullname,
        address: address,
      });
      const { customer } = response.data;

      if (customer) {
        setCustomerInfo(customer);
        setShowNewCustomerForm(false);
        // Hiển thị thông tin của khách hàng sau khi tạo tài khoản thành công
      }
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };
    
    return (
      <div className="bg-dark h-100 p-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7 bg-white"> {}
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

                  <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-iphone" role="tabpanel" aria-labelledby="pills-iphone-tab">
                      <div className="row">
                          {selectedBrand === 'APPLE' ? (
                            iphoneItems.map(item => (
                              <div className="col-12 col-sm-6 col-md-3 mb-3"  key={item._id}>
                                <div className="card" onClick={() => handleItemClick(item)}>
                                  <img draggable="false" src={item.photo[0]} className="card-img-iphone" alt="..." />
                                  <div className="card-body">
                                    <h5 className="card-title name">{item.name}</h5>
                                    <p className="card-text price">{item.price ? formatPrice(item.price) : "Price not available"}</p>
                                    {selectedItem && selectedItem._id === item._id && (
                                      <div className="modal" id={item._id} tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                                        <div className="modal-dialog" role="document">
                                          <div className="modal-content">
                                            <div className="modal-header">
                                              <h5 className="modal-title">{selectedItem.name}</h5>
                                              <button type="button" className="btn-close" onClick={()=>handleCloseModal(item._id)}></button>

                                            </div>
                                            <div className="modal-body">
                                              <img src={selectedItem.photo[0]} alt={selectedItem.name} className="img-fluid" />
                                              <p>{selectedItem.desc}</p>
                                              <p>Status: {selectedItem.status}</p>
                                              <p>Price: {selectedItem.price ? formatPrice(selectedItem.price) : "Price not available"}</p>
                                            </div>
                                            <div className="modal-footer">
                                              <button type="button" className="btn btn-primary" onClick={() => addToCart(selectedItem)}>Add to Cart</button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))
                          ): null}
                          {selectedBrand === 'ANDROID' ? (
                            androidItems.map(item => (
                              <div className="col-12 col-sm-6 col-md-3 mb-3" key={item._id}>
                                <div className="card" onClick={() => handleItemClick(item)}>
                                <img draggable="false" src={item.photo[0]} className="card-img" alt="..." />
                                  <div className="card-body">
                                    <h5 className="card-title name">{item.name}</h5>
                                    <p className="card-text price">{item.price ? formatPrice(item.price) : "Price not available"}</p>
                                    {selectedItem && selectedItem._id === item._id && (
                                      <div className="modal" tabIndex="-1" role="dialog">
                                        <div className="modal-dialog" role="document">
                                          <div className="modal-content">
                                            <div className="modal-header">
                                              <h5 className="modal-title">{selectedItem.name}</h5>
                                              <button type="button" className="btn-close"></button>
                                            </div>
                                            <div className="modal-body">
                                              {/* Hiển thị thông tin chi tiết sản phẩm */}
                                              <img src={selectedItem.photo[0]} alt={selectedItem.name} className="img-fluid" />
                                              <p>{selectedItem.desc}</p>
                                              <p>Status: {selectedItem.status}</p>
                                              <p>Price: {selectedItem.price ? formatPrice(selectedItem.price) : "Price not available"}</p>
                                            </div>
                                            <div className="modal-footer">
                                              <button type="button" className="btn btn-primary" onClick={() => addToCart(selectedItem)}>Add to Cart</button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
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
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <h5 className="d-flex justify-content-between align-items-center">
                  <span>Cart</span>
                  <button onClick={orderBasketClear} className="btn btn-sm btn-danger rounded-pill">Clear</button>
                </h5>
                <ul id="orderlist" className="list-unstyled" style={{ height: '30vh', overflowY: 'auto' }}>
                  {orderArray.map((item, index) => (
                    <li key={index} className="d-flex align-items-center">
                      <img src={item.image} alt={item.name} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '0 10px' }}>{item.name}</p>
                      <p style={{ whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '16px', color: 'red', margin: '0 10px' }}>{formatPrice(item.price)}</p>
                    </li>
                  ))}
                </ul>
                <hr/>
                <ul id="orderlist" className="list-unstyled" style={{ height: '30vh', overflowY: 'auto' }}></ul>
                <hr/>
                <ul className="list-unstyled">
                  <li className="d-flex justify-content-between align-items-center">
                    <big className="fw-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Total items:</big>
                    <big className="fw-bold">{orderTotalItems()}</big>
                  </li>
                  <li className="d-flex justify-content-between align-items-center">
                    <big className="fw-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Total amount:</big>
                    <big className="fw-bold">{parseFloat(orderTotalCost()).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</big>
                  </li>
                  <hr />
                  <li>
                    <button className="btn btn-primary btn-lg w-100">CHECK OUT</button>
                    {showPhoneModal && (
                      <div className="modal">
                        <div className="modal-content">
                          <span className="close" onClick={() => setShowPhoneModal(false)}>&times;</span>
                          <input type="tel" placeholder="Nhập số điện thoại của bạn..." value={phoneNumber} onChange={handlePhoneInputChange}/>
                          <button onClick={handlePhoneSubmit}>Xác nhận</button>
                        </div>
                      </div>
                    )}
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

// Modal boostrap react