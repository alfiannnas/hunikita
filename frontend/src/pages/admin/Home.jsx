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

  useEffect(() => {
    if (!auth) {
      navigate('/admin-login');
      return;
    }
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