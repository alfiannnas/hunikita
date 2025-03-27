import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  Home,
  Users,
  UserCircle,
  FileText,
  HelpCircle,
  UserCog,
  LogOut,
  Search,
  Plus
} from 'lucide-react';
import axios from 'axios';
import { API } from '../../constant';
import { useSelector } from 'react-redux';

function AdminHome() {
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

      const response = await axios.get(API.GET_USER_DATA, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      
      if (response.data && response.data.data) {
        setUserData({
          name: response.data.data.name,
          role: response.data.data.role || 'Admin'
        });
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

  const properties = [
    {
      id: 1,
      name: "Kos Jangkar Telang",
      type: "Kos",
      owner: "Dimas Putra",
      status: "Tersedia",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 2,
      name: "Kos Putri Telang",
      type: "Kos",
      owner: "Denuarta",
      status: "Diproses",
      image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 3,
      name: "Kontrakan Nyaman II",
      type: "Kontrakan",
      owner: "Budi",
      status: "Diterima",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=200"
    }
  ];

  const articles = [
    {
      id: 1,
      title: "Tips makan hemat ala anak kos",
      image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 2,
      title: "5 Rekomendasi makeup murah",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 3,
      title: "3 Wisata Buat Anak Kos",
      image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&q=80&w=200"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <img src="/hunikita-logo-3.png" className="h-14 w-auto"/>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center p-2 text-blue-600 bg-blue-50 rounded-lg">
                <LayoutGrid className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Home className="w-5 h-5 mr-3" />
                <span>Properti</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Users className="w-5 h-5 mr-3" />
                <span>Pemilik Properti</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <UserCircle className="w-5 h-5 mr-3" />
                <span>Penyewa</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 mr-3" />
                <span>Artikel</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <HelpCircle className="w-5 h-5 mr-3" />
                <span>Pusat Bantuan</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <UserCog className="w-5 h-5 mr-3" />
                <span>Profil Admin</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
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
                <p className="text-white font-medium">{userData.name || 'Loading...'}</p>
                <p className="text-white text-sm">{userData.role || 'Loading...'}</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=50"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
          
          {/* Properties Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Properti</h3>
              <button className="text-blue-500 hover:text-blue-600">
                Lihat Semua
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3">Nama Properti</th>
                    <th className="pb-3">Jenis Properti</th>
                    <th className="pb-3">Nama Pemilik Properti</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map(property => (
                    <tr key={property.id} className="border-b">
                      <td className="py-3">
                        <div className="flex items-center">
                          <img
                            src={property.image}
                            alt={property.name}
                            className="w-10 h-10 rounded object-cover mr-3"
                          />
                          {property.name}
                        </div>
                      </td>
                      <td className="py-3">{property.type}</td>
                      <td className="py-3">{property.owner}</td>
                      <td className="py-3">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          property.status === 'Tersedia' ? 'bg-yellow-100 text-yellow-800' :
                          property.status === 'Diproses' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {property.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Articles Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Artikel</h3>
              <button className="flex items-center text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">
                <Plus className="w-4 h-4 mr-2" />
                Buat Artikel
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.map(article => (
                <div key={article.id} className="border rounded-lg overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-medium">{article.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminHome;