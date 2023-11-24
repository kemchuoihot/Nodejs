import {Route, Routes, Navigate} from 'react-router-dom'
import Main from './components/Main'
import Login from './components/Login'
import Signup from './components/Singup';
import Dashboard from './components/Dashboard';
// import Dashboard from './components/Dashboard';

function App() {
  const  user = localStorage.getItem('token')
  return (
    <Routes>
      {user && <Route path="/" exact element={<Main/>} />}
      <Route path="/signup" exact element={<Signup/>}/>
      <Route path="/login" exact element={<Login/>}/>
      <Route path="/dashboard" exact element={<Dashboard/>}/>
      <Route path="/" element={<Navigate replace to="/login"/>} />
    </Routes>
  );
}

export default App;

// Xử lý chính
