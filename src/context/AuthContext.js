'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUserApi, registerUserApi } from '../lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('amazon_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginUserApi(email, password);
    setUser(data);
    localStorage.setItem('amazon_user', JSON.stringify(data));
    return data;
  };

  const register = async (name, email, password) => {
    const data = await registerUserApi(name, email, password);
    setUser(data);
    localStorage.setItem('amazon_user', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('amazon_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
