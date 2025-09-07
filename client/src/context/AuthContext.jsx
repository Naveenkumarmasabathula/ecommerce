// client/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react'; // 👈 ADD THIS LINE
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  axios.defaults.baseURL = 'https://ecommerce-backend-r2vu.onrender.com/api';
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (email, password) => {
    const { data } = await axios.post('/auth/login', { email, password });
    setToken(data.token);
    setUser({ email: data.email });
  };

  const signup = async (email, password) => {
    const { data } = await axios.post('/auth/signup', { email, password });
    setToken(data.token);
    setUser({ email: data.email });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;