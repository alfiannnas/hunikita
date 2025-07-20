import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Artikel from '../components/Artikel'
import List from '../components/List'
import List2 from '../components/Listcopy'
import List3 from '../components/Listcopy2'
import Pagination from '../components/Pagination'
import Footer from '../components/Footer'
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { API } from "../constant/constant";

const Listartikel = () => {
  const [artikel, setArtikel] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Tampilkan 8 artikel per halaman

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [idArtikel, setIdArtikel] = useState(null); // State untuk menyimpan ID artikel yang akan dihapus
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol tampilan SuccessMessage

  useEffect(() => {
    if (!auth || !auth.token) {
      navigate('/admin/login');
      return;
    }
    fetchArtikel();
  }, [auth, navigate]);

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
        navigate('/admin/login');
      }
    }
  };

  // Hitung total halaman
  const totalPages = Math.ceil(artikel.length / itemsPerPage);

  // Data yang ditampilkan berdasarkan halaman
  const displayedArtikel = artikel.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fungsi untuk navigasi halaman
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-[43px] ml-[96px] flex">
        <ul className='flex gap-9 text-[#4E97D1] text-["Poppins"] font-bold underline text-[25px]'>
          <li className="cursor-pointer">Gaya Hidup</li>
          <li className="cursor-pointer">Kecantikan</li>
          <li className="cursor-pointer">Wisata</li>
          <li className="cursor-pointer">Kuliner</li>
        </ul>
        <div className="ml-[300px]">
          <Artikel />
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-[40px]">
        {/* Kirim data ke List */}
        <List artikel={displayedArtikel} />

      </div>
      <div className="mt-[50px]">
        <Footer />
      </div>
    </div>
  )
}

export default Listartikel