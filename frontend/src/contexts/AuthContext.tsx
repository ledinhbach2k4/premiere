import React, {createContext, useState, useEffect } from 'react'
import api from '../api/axios'
import About from './../screens/About';
import { Response } from 'express';

export const AuthContext = createContext(null)
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token){
      api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      })
    }
  }, []);
  const login = async (token) => {
    localStorage.setItem('token', token);
    try {
      const res = await api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser(res.data.user);
    } catch (error){
      logout();
    }
  }
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
