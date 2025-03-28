import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API } from '../constant';

const Header = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    name: '',
    role: ''
  });

  const getCurrentUser = async () => {
    try {
      if (!auth || !auth.token) {
        console.error('No token found');
        navigate('/admin/login');
        return;
      }

      // Cek apakah data pengguna sudah ada di localStorage
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
        return; // Tidak perlu memanggil API jika data sudah ada
      }

      const response = await axios.get(API.GET_USER_DATA, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      
      if (response.data && response.data.data) {
        const user = {
          name: response.data.data.name,
          role: response.data.data.role || 'Admin'
        };
        setUserData(user);
        
        // Simpan data pengguna ke localStorage
        localStorage.setItem('userData', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    }
  };

  useEffect(() => {
    if (!auth) {
      navigate('/admin/login');
      return;
    }
    getCurrentUser();
  }, [auth, navigate]);

  return (
    <header className="bg-[#3182CE] shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-white font-medium">{userData.name }</p>
            <p className="text-white text-sm">{userData.role }</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=50"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;  
        
