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

  // Tambahkan state untuk kategori
  const [selectedKategori, setSelectedKategori] = useState("Semua");
  // Tambahkan state untuk search
  const [search, setSearch] = useState("");

  // Daftar kategori
  const kategoriList = [
    "Semua",
    "Berita",
    "Tips & Trik",
    "Lifestyle",
    "Properti",
    "Travel",
    "Lainnya"
  ];

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

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

  // Filter artikel berdasarkan kategori dan search
  const filteredArtikel = artikel.filter((item) => {
    const kategoriMatch = selectedKategori === "Semua" || item.kategori === selectedKategori;
    const searchMatch = item.judul?.toLowerCase().includes(search.toLowerCase());
    return kategoriMatch && searchMatch;
  });

  // Hitung total halaman
  const totalPages = Math.ceil(filteredArtikel.length / itemsPerPage);

  // Data yang ditampilkan berdasarkan halaman
  const displayedArtikel = filteredArtikel.slice(
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
        {/* Ganti ul kategori */}
        <ul className='flex gap-9 text-[#4E97D1] font-bold underline text-[25px]'>
          {kategoriList.map((kategori) => (
            <li
              key={kategori}
              className={`cursor-pointer ${selectedKategori === kategori ? "text-blue-700 underline" : ""}`}
              onClick={() => {
                setSelectedKategori(kategori);
                setCurrentPage(1); // Reset ke halaman 1 saat ganti kategori
              }}
            >
              {kategori}
            </li>
          ))}
        </ul>
        <div className="ml-[300px]">
          {/* Kirim props search dan setSearch ke Artikel */}
          <Artikel search={search} setSearch={setSearch} />
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