import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';
import Register from './components/Register';
import Createtasks from './components/Createtasks';
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('token'); // Example authentication check
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/createtasks' element={<ProtectedRoute><Createtasks /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
