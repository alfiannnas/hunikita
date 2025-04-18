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
import Sidebar from "../../components/Sidebar";
import { API } from '../../constant';
import Header from "../../components/Header";

import { useSelector } from 'react-redux';

function AdminHome() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [properties, setProperties] = useState([]);
  const [artikel, setArtikel] = useState([]);
  const [penyewa, setPenyewa] = useState([]);

  useEffect(() => {
    if (!auth) {
      navigate('/admin-login');
      return;
    }
    fetchProperties();
    fetchArtikel();
    fetchPenyewa();
  }, [auth, navigate]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(API.GET_ADMIN_PROPERTIES, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      setProperties(response.data.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
      if (error.response?.data?.isRedirect) {
        navigate('/admin-login');
      }
    }
  };

  const fetchArtikel = async () => {
    try {
      const response = await axios.get(API.GET_ADMIN_ARTIKEL, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      setArtikel(response.data.data);
    } catch (error) {
      console.error("Error fetching artikel:", error);
      if (error.response?.status === 401) {
        navigate('/admin-login');
      }
    }
  };

  const fetchPenyewa = async () => {
    try {
      const response = await axios.get(API.GET_PENYEWA, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      setPenyewa(response.data.data);
    } catch (error) {
      console.error("Error fetching penyewa:", error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar/>
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Header />
        {/* Dashboard Content */}
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
          
          {/* Properties Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Properti</h3>
              <button 
                onClick={() => navigate('/admin-properti')}
                className="text-blue-500 hover:text-blue-600"
              >
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
                  {properties.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-6 text-gray-500">
                        No data found
                      </td>
                    </tr>
                  ) : (
                    properties.slice(0, 3).map(property => (
                      <tr key={property.id} className="border-b">
                        <td className="py-3">
                          <div className="flex items-center">
                            {property.foto_properti ? (
                              <img
                                src={property.foto_properti}
                                alt={property.name}
                                className="w-10 h-10 rounded object-cover mr-3"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-200 rounded mr-3 flex items-center justify-center">
                                <span className="text-gray-500 text-xs">No Image</span>
                              </div>
                            )}
                            {property.name}
                          </div>
                        </td>
                        <td className="py-3">{property.property_type_name}</td>
                        <td className="py-3">{property.owner_name}</td>
                        <td className="py-3">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            property.status === 'Disetujui' ? 'bg-green-500 text-white' : 
                            property.status === 'Diproses' ? 'bg-yellow-500 text-white' :
                            property.status === 'Ditolak' ? 'bg-red-500 text-white' : 
                            'bg-red-800 text-red-800'
                          }`}>
                            {property.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tambahkan Pemilik Properti Section setelah Properties Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Pemilik Properti</h3>
              <button 
                onClick={() => navigate('/admin-pemilik-properti')}
                className="text-blue-500 hover:text-blue-600"
              >
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
                    <th className="pb-3">Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-6 text-gray-500">
                        No data found
                      </td>
                    </tr>
                  ) : (
                    properties.slice(0, 3).map((property) => (
                      <tr key={property.id} className="border-b">
                        <td className="py-3">
                          <div className="flex items-center space-x-3">
                            {property.foto_properti ? (
                              <img 
                                src={property.foto_properti} 
                                alt={property.name}
                                className="w-12 h-12 object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                                <span className="text-center text-gray-500 text-xs">No Image</span>
                              </div>
                            )}
                            <span>{property.name}</span>
                          </div>
                        </td>
                        <td className="py-3">{property.property_type_name}</td>
                        <td className="py-3">{property.owner_name}</td>
                        <td className="py-3">
                          {new Intl.NumberFormat('id-ID', { 
                            style: 'currency', 
                            currency: 'IDR' 
                          }).format(property.harga)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Penyewa Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Penyewa</h3>
              <button 
                onClick={() => navigate('/admin-penyewa')}
                className="text-blue-500 hover:text-blue-600"
              >
                Lihat Semua
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3">Nama Properti</th>
                    <th className="pb-3">Jenis Properti</th>
                    <th className="pb-3">Nama Penyewa</th>
                    <th className="pb-3">Harga/Bulan</th>
                  </tr>
                </thead>
                <tbody>
                  {penyewa.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-6 text-gray-500">
                        No data found
                      </td>
                    </tr>
                  ) : (
                    penyewa.slice(0, 3).map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3">
                          <div className="flex items-center space-x-3">
                            {item.foto_properti ? (
                              <img 
                                src={item.foto_properti} 
                                alt={item.property_name}
                                className="w-12 h-12 object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                                <span className="text-center text-gray-500 text-xs">No Image</span>
                              </div>
                            )}
                            <span>{item.property_name}</span>
                          </div>
                        </td>
                        <td className="py-3">{item.property_type_name}</td>
                        <td className="py-3">{item.user_name}</td>
                        <td className="py-3">
                          {new Intl.NumberFormat('id-ID', { 
                            style: 'currency', 
                            currency: 'IDR' 
                          }).format(item.harga_property)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Articles Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Artikel</h3>
              <button 
                onClick={() => navigate('/admin-artikel/create')}
                className="flex items-center text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Buat Artikel
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {artikel.length === 0 ? (
                <div className="col-span-3 text-center py-6 text-gray-500">
                  No data found
                </div>
              ) : (
                artikel.slice(0, 3).map(article => (
                  <div key={article.id} className="border rounded-lg overflow-hidden">
                    {article.gambar ? (
                      <img
                        src={article.gambar}
                        alt={article.judul}
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No Image</span>
                      </div>
                    )}
                    <div className="p-4">
                      <h4 className="font-medium">{article.judul}</h4>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminHome;