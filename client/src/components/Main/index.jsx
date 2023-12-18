import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import './main.css';

import CustomerInfo from '../Customer/CustomerInfo';
import PurchaseHistory from '../Customer/PurchaseHistory';
import OrderDetails from '../Customer/OrderDetails';

const Main = () => {
  const [iphoneItems, setIphoneItems] = useState([]);
  const [androidItems, setAndroidItems] = useState([]);

  const [selectedBrand, setSelectBrand] = useState('APPLE');

  const [showModal, setShowModal] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');

  const [registerPhoneNumber, setRegisterPhoneNumber] = useState('');

  const [showModalCheckout, setShowModalCheckout] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [message, setMessage] = useState('');


  const [customerInfo, setCustomerInfo] = useState(null);

  const [fullNameError, setFullNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  // Đăng ký thành công
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [firstCheckout, setFirstCheckout] = useState(true);

  const [showCustomerInfo, setShowCustomerInfo] = useState(false);
  const [showPurchaseHistory, setShowPurchaseHistory] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const [foundCustomer, setFoundCustomer] = useState(null);

  const handleShowCustomerInfo = () => {
    setShowCustomerInfo(true);
  };

  const handleShowPurchaseHistory = () => {
    setShowPurchaseHistory(true);
  };

  const handleShowOrderDetails = () => {
    setShowOrderDetails(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Cập nhật mỗi giây
  
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchIphoneData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/home');
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
            const response = await axios.get('http://localhost:5000/android');
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

  useEffect(() => {
    const handleCloseModalOutside = (event) => {
      if (showModal && event.target.className === 'modal') {
        handleCloseModal();
      }
    };
  
    window.addEventListener('click', handleCloseModalOutside);
  
    return () => {
      window.removeEventListener('click', handleCloseModalOutside);
    };
  }, [showModal]);

  const handleBrandClick = (brand) => {
    setSelectBrand(brand);
  }

  const handleShowModal = () => setShowModal(true);
  
  const handleCloseModal = () => {
    if (!selectedModalItem) {
      setShowModal(false);
    } else {
      setSelectedModalItem(null);
    }
  };

  const handleItemClick = (item) => {
    setSelectedModalItem(item);
    setShowModal(true);
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
  return "Price not available";
};

const handleCheckout = async () => {
  if (firstCheckout) {
    setFirstCheckout(false);
  }
  setShowModalCheckout(true);

  try {
    const response = await axios.post('http://localhost:5000/customer/checkout', { phoneNumber });
    const { success, customer, message: msg } = response.data;

    if (success) {
      setCustomerInfo(customer);
      setMessage('');
      setShowModalCheckout(true);
      
    } else {
      setCustomerInfo(null);
      if (!firstCheckout) {
        setMessage(msg || 'Không tìm thấy thông tin khách hàng. Vui lòng nhập thông tin mới.');
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleConfirmPhoneNumber = async () => {
  try {
    const response = await axios.post('http://localhost:5000/customer/checkout', { phoneNumber });
    const { success, customer, message: msg } = response.data;

    if (success && customer) {
      setCustomerInfo(customer);
      setMessage('Tài khoản đã mua hàng trước đó.');
      setShowModalCheckout(false);
    } else {
      setCustomerInfo(null);
      setMessage(msg || 'Không tìm thấy thông tin khách hàng. Vui lòng nhập thông tin mới.');

      if (!customer) {
        setShowCreateAccountModal(true);
      } else {
        setShowCreateAccountModal(false);
      }
      setShowModalCheckout(false);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleCreateAccount = async (e) => {
  e.preventDefault();

  if (!phoneNumber.trim()) {
    setPhoneNumberError(true);
    return;
  }
  if (!fullName.trim()) {
    setFullNameError(true);
    return;
  }
  if (!address.trim()) {
    setAddressError(true);
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/customer/create', {
      fullName,
      address,
      phoneNumber: phoneNumber.trim(),
    });

    if (response.status === 200) {
      const { success, customer, message: msg } = response.data || {};

      if (success) {
        setCustomerInfo(customer);
        setMessage('');
        setShowCreateAccountModal(false);
        setShowModalCheckout(false);
      } else {
        setCustomerInfo(null);
        setMessage(msg);
      }

      setFullName('');
      setAddress('');
      setPhoneNumber('');
    } else {
      console.error('Request failed with status:', response.status);
    }
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};

const searchProductByBarcode = async () => {
  if (selectedBrand === 'APPLE') {
    try {
      const response = await axios.get(`http://localhost:5000/home/barcode/${barcode}`);
      setProduct(response.data);
      setError('');
    } catch (error) {
      setError('Không tìm thấy sản phẩm');
      setProduct(null);
    }
  } else if (selectedBrand === 'ANDROID') {
    try {
      const response = await axios.get(`http://localhost:5000/android/barcode/${barcode}`);
      setProduct(response.data);
      setError('');
    } catch (error) {
      setError('Không tìm thấy sản phẩm');
      setProduct(null);
    }
  }
};

const getDayOfWeek = (date) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[date.getDay()];
};


    return (
      <div className="bg-dark h-100 p-3">
        <div className="container-fluid">
          {/* ... */}
            {message && (
              <div className="alert alert-info" role="alert">
                {message}
              </div>
            )}
            {/* ... */}
          <div className="row">            
            <div className="col-md-7 bg-white">
            {customerInfo ? (
              <CustomerInfo />
            ) : null}
              {/* Phần thông báo khi đăng ký thành công */}
              {showSuccessMessage && (<div className="alert alert-success" role="alert">Đăng ký thành công!</div>)}
              
              {/* Phần tìm kiếm sản phẩm */}
              <p><small className="text-muted">{getDayOfWeek(currentDateTime)}, {currentDateTime.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}, {currentDateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</small></p>
                <div className="card rounded-3 mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <button onClick={handleShowCustomerInfo} className="btn btn-primary mb-2">Xem thông tin khách hàng</button>
                          <button onClick={handleShowPurchaseHistory} className="btn btn-primary mb-2">Xem lịch sử mua hàng</button>
                          <button onClick={handleShowOrderDetails} className="btn btn-primary mb-2">Xem chi tiết đơn hàng</button>
                          {/* Modal cho thông tin khách hàng */}
                          <Modal show={showCustomerInfo} onHide={() => setShowCustomerInfo(false)}>
                            <Modal.Header closeButton>
                              <Modal.Title>Thông tin khách hàng</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <CustomerInfo />
                            </Modal.Body>
                          </Modal>

                          {/* Modal cho lịch sử mua hàng */}
                          <Modal show={showPurchaseHistory} onHide={() => setShowPurchaseHistory(false)}>
                            <Modal.Header closeButton>
                              <Modal.Title>Lịch sử mua hàng</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              {foundCustomer && <PurchaseHistory customerInfo={foundCustomer} />}
                            </Modal.Body>
                          </Modal>

                          {/* Modal cho chi tiết đơn hàng */}
                          <Modal show={showOrderDetails} onHide={() => setShowOrderDetails(false)}>
                            <Modal.Header closeButton>
                              <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <OrderDetails />
                            </Modal.Body>
                          </Modal>
                        </div>
                      </div>
                      <div className="search-bar-container">
                        <input type="text" className="search-input" placeholder="Nhập mã vạch sản phẩm" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
                        <button className="search-button" onClick={searchProductByBarcode}>Tìm kiếm</button>
                        {product && (
                          <div>
                            <h2>{product.name}</h2>
                            <p>{product.desc}</p>
                          </div>
                        )}
                      </div>
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
                              <div className="col-12 col-md-6 mb-3"  key={item._id}>
                                <div className="card" onClick={() => handleItemClick(item)}>
                                  <img draggable="false" src={item.photo[0]} className="card-img-iphone" alt="..." />
                                  <div className="card-body">
                                    <h5 className="card-title name">{item.name}</h5>
                                    <p className="card-text price">{item.price ? formatPrice(item.price) : "Price not available"}</p>
                                    {selectedModalItem  && selectedModalItem._id === item._id && (
                                        <div className="modal" id={item._id} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                                        <div className="modal-dialog" role="document">
                                          <div className="modal-content">
                                            <div className="modal-header">
                                              <h5 className="modal-title">{selectedModalItem.name}</h5>
                                              <button type="button" className="btn-close" onClick={handleCloseModal}></button>

                                            </div>
                                            <div className="modal-body">
                                              <img src={selectedModalItem.photo[0]} alt={selectedModalItem.name} className="item-image" />
                                              <div className="item-details">
                                                <p>{selectedModalItem.desc}</p>
                                                <p>{selectedModalItem.price ? formatPrice(selectedModalItem.price) : "Price not available"}</p>
                                                <p>Status: {selectedModalItem.status}</p>
                                              </div>
                                            </div>
                                            <div className="modal-footer">
                                              <button type="button" className="btn btn-primary" onClick={() => addToCart(selectedModalItem)}>Add to Cart</button>
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
                              <div className="col-12 col-md-6 mb-3" key={item._id}>
                                <div className="card" onClick={() => handleItemClick(item)}>
                                <img draggable="false" src={item.photo[0]} className="card-img-android" alt="..." />
                                  <div className="card-body">
                                    <h5 className="card-title name">{item.name}</h5>
                                    <p className="card-text price">{item.price ? formatPrice(item.price) : "Price not available"}</p>
                                    {selectedModalItem && selectedModalItem._id === item._id && (
                                      <div className="modal" id={item._id} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                                      <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5 className="modal-title">{selectedModalItem.name}</h5>
                                            <button type="button" className="btn-close" onClick={() => handleCloseModal()}></button>

                                          </div>
                                          <div className="modal-body">
                                            <img src={selectedModalItem.photo[0]} alt={selectedModalItem.name} className="item-image" />
                                            <div className="item-details">
                                              <p>{selectedModalItem.desc}</p>
                                              <p>{selectedModalItem.price ? formatPrice(selectedModalItem.price) : "Price not available"}</p>
                                              <p>Status: {selectedModalItem.status}</p>
                                            </div>
                                          </div>
                                          <div className="modal-footer">
                                            <button type="button" className="btn btn-primary" onClick={() => addToCart(selectedModalItem)}>Add to Cart</button>
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
                  <span>CART</span>
                  <button onClick={orderBasketClear} className="btn btn-sm btn-danger rounded-pill">Clear</button>
                </h5>
                <ul id="orderlist" className="list-unstyled" style={{ maxHeight: '20vh', overflowY: 'auto' }}>
                  {orderArray.map((item, index) => (
                    <li key={index} className="d-flex align-items-center">
                      <img src={item.image} alt={item.name} style={{ maxHeight: '60px' }} />
                      <p style={{ fontSize: '14px', margin: '0 10px', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                      <p style={{ fontSize: '14px', color: 'red', margin: '0 10px' }}>{formatPrice(item.price)}</p>
                    </li>
                  ))}
                </ul>
                <hr />
              <div className="totals-container">
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
                    <button className="btn btn-success btn-lg w-100" onClick={handleCheckout}>CHECK OUT</button>
                    <button className="btn btn-danger btn-lg w-100 buyButton">BUY</button>
                    {/* Modal */}
                    <Modal show={showModalCheckout} onHide={() => setShowModalCheckout(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Checkout Modal</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h5 style={{ marginBottom: '10px' }}>Order Information</h5>
                          <ul style={{ padding: '0', listStyleType: 'none', marginLeft: '0' }}>
                            {orderArray.map((item, index) => (
                              <li>
                                <span>
                                  {item.name} - {formatPrice(item.price)}
                                </span>
                              </li>
                            ))}
                          </ul>
                          <p>Total items: {orderTotalItems()}</p>
                          <p>Total amount: {parseFloat(orderTotalCost()).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        </div>
                        </Modal.Body>
                        <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: '10px' }}>
                              <label htmlFor="phoneNumber" style={{ marginBottom: '0' }}>Phone Number:</label>
                            </div>
                            <div style={{ flex: '1', minWidth: '0' }}>
                              <input 
                                type="text" 
                                id="phoneNumber" 
                                value={phoneNumber} 
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                                placeholder="Enter your phone number"
                                style={{ width: '100%', boxSizing: 'border-box', padding: '8px' }}
                              />
                            </div>
                          </div>
                          <div style={{ display: 'flex' }}>
                            <button variant="secondary" onClick={() => setShowModalCheckout(false)} style={{ marginRight: '5px' }}>Cancel</button>
                            <button variant="primary" onClick={handleConfirmPhoneNumber}>Confirm</button>
                          </div>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showCreateAccountModal} onHide={() => setShowCreateAccountModal(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>Create New Account</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form onSubmit={handleCreateAccount}>
                          <div className="mb-3">
                          <label>Full name</label>
                            <input 
                              type="text" 
                              className={`form-control ${fullNameError ? 'is-invalid' : ''}`} 
                              id="fullName" 
                              value={fullName} 
                              onChange={(e) => {
                                setFullName(e.target.value);
                                setFullNameError(false);
                              }}
                              placeholder='Full Name'
                            />
                            {fullNameError && <div className="invalid-feedback">Please enter full name</div>}

                            <label>Address</label>
                            <input 
                              type="text" 
                              className={`form-control ${addressError ? 'is-invalid' : ''}`} 
                              id="address" 
                              value={address} 
                              onChange={(e) => {
                                setAddress(e.target.value);
                                setAddressError(false);
                              }}
                              placeholder='Address'
                            />
                            {addressError && <div className="invalid-feedback">Please enter address</div>}

                            <label>Phone number</label>
                            <input 
                              type="text" 
                              className={`form-control ${phoneNumberError ? 'is-invalid' : ''}`} 
                              id="registerPhoneNumber" 
                              value={registerPhoneNumber} 
                              onChange={(e) => {
                                setRegisterPhoneNumber(e.target.value);
                                setPhoneNumberError(false);
                              }}
                            />
                            {phoneNumberError && <div className="invalid-feedback">Please enter phone number</div>}
                          </div>
                          <button type="submit" className="btn btn-primary">Create Account</button>
                          <button type="button" className="btn btn-secondary" onClick={() => setShowCreateAccountModal(false)}>Cancel</button>
                        </form>
                      </Modal.Body>
                    </Modal>
                  </li>
                </ul>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;