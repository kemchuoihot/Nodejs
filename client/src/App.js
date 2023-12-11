import {Route, Routes, Navigate} from 'react-router-dom'
import Main from './components/Main'
import Login from './components/Login'
// import Signup from './components/Singup';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Employee from './components/Employee';
import Product from './components/Product';
import Profile from './components/Profile';
import AddEmployee from './components/Employee/addEmployee';
import Verify from './components/Verify';
function App() {
  const user = localStorage.getItem('token');
  return (
    <Routes>
      {/* {user && <Route path="/" exact element={<Main />} />} */}
      {/* <Route path="/signup" exact element={<Signup />} /> */}
      <Route path="/login" exact element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="" element={<Home />} />
        <Route path="/dashboard/employee" element={<Employee />} />
        <Route path="/dashboard/product" element={<Product />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/add_employee" element={<AddEmployee />} />
      </Route>
      <Route path="/main" exact element={<Main />} />
      <Route path="/verify" exact element={<Verify />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;

// Xử lý chính
