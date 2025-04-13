import Navbar from '../../components/Navbar'
import {useSelector} from 'react-redux'
import Footer from '../../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import axios from "axios";
import { API } from '../../constant'
import { Edit, Trash2 } from "lucide-react";
import { Alert } from "../../components/Alert";
import { SuccessMessage } from "../../components/SuccessMessage";
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'

const PemilikProfil = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [idProperty, setIdProperty] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const itemsPerPage = 8;
  const auth = useSelector((state) => state.auth )
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    jenis_kelamin: "",
    kota_asal: "",
    pekerjaan: "",
    nama_kampus: "",
    status: "",
    pendidikan_terakhir: "",
    no_kontak: "",
    no_kontak_darurat: "",
  });

  // Opsi untuk dropdown
  const jenisKelaminOptions = [
    { value: "Laki-laki", label: "Laki-laki" },
    { value: "Perempuan", label: "Perempuan" }
  ];

  const statusOptions = [
    { value: "Belum Kawin", label: "Belum Kawin" },
    { value: "Sudah Kawin", label: "Sudah Kawin" }
  ];

  const pendidikanOptions = [
    { value: "SD", label: "SD" },
    { value: "SMP", label: "SMP" },
    { value: "SMA/SMK", label: "SMA/SMK" },
    { value: "D3", label: "D3" },
    { value: "S1", label: "S1" },
    { value: "S2", label: "S2" },
    { value: "S3", label: "S3" }
  ];

  console.log(API.GET_PROPERTIES_BY_USER)
  const fetchData = useCallback(() => {
    const userId = auth?.id;
    
    if (!userId) {
      console.error("User ID tidak tersedia");
      return;
    }
    
    axios
      .get(API.GET_PROPERTIES_BY_USER, {
        params: {
          userId: userId,
          limit: 10,
          offset: 0
        }, 
        headers: {
          Authorization: 'Bearer ' + auth.token
        }
      })
      .then((res) => {
        if (res.status === 200) {
          setData((data) => [...data, ...res.data.data])
        }
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        if (err.response?.status === 400) {
          alert(err.response.data.detail)
        } else {
          alert("Server Error! Coba lagi beberapa saat")
        }
      });
  }, [auth.token, auth?.id])
  
  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth, navigate]);

  // Hitung total halaman
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Data yang ditampilkan berdasarkan halaman
  const displayedProperties = data.slice(
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

  const handleDelete = async () => {
    if (idProperty === null) return;

    try {
      const response = await axios.delete(`${API.DELETE_PROPERTIES_BY_USER}/${idProperty}`, {
        headers: {
          Authorization: 'Bearer ' + auth.token
        }
      });

      if (response.status === 200) {
        setIsAlertOpen(false);
        setIsOpen(true);
        // Refresh data setelah menghapus
        setData(data.filter(item => item.id !== idProperty));
      }
    } catch (err) {
      console.error("Error deleting property:", err);
      if (err.response?.status === 400) {
        alert(err.response.data.detail)
      } else {
        alert("Server Error! Coba lagi beberapa saat")
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <div className="gap-4 ml-[36px] mt-[44px]">
        <h1 className="text-[36px] font-bold">Profil Anda</h1>
      </div>

      {/* Form Profil */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 mx-[36px]">
        <h2 className="text-xl font-semibold mb-6">Data Profil</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nama"
            name="nama"
            placeholder="Masukkan nama"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Masukkan email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />

          <Select
            label="Jenis Kelamin"
            name="jenis_kelamin"
            options={jenisKelaminOptions}
            value={values.jenis_kelamin}
            onChange={(e) => setValues({ ...values, jenis_kelamin: e.target.value })}
            placeholder="Pilih Jenis Kelamin"
            required
          />

          <Input
            label="Kota Asal"
            name="kota_asal"
            placeholder="Masukkan kota asal"
            value={values.kota_asal}
            onChange={(e) => setValues({ ...values, kota_asal: e.target.value })}
            required
          />

          <Input
            label="Pekerjaan"
            name="pekerjaan"
            placeholder="Masukkan pekerjaan"
            value={values.pekerjaan}
            onChange={(e) => setValues({ ...values, pekerjaan: e.target.value })}
            required
          />

          <Input
            label="Nama Kampus"
            name="nama_kampus"
            placeholder="Masukkan nama kampus"
            value={values.nama_kampus}
            onChange={(e) => setValues({ ...values, nama_kampus: e.target.value })}
            required
          />

          <Select
            label="Status"
            name="status"
            options={statusOptions}
            value={values.status}
            onChange={(e) => setValues({ ...values, status: e.target.value })}
            placeholder="Pilih Status"
            required
          />

          <Select
            label="Pendidikan Terakhir"
            name="pendidikan_terakhir"
            options={pendidikanOptions}
            value={values.pendidikan_terakhir}
            onChange={(e) => setValues({ ...values, pendidikan_terakhir: e.target.value })}
            placeholder="Pilih Pendidikan Terakhir"
            required
          />

          <Input
            label="Nomor Kontak"
            name="no_kontak"
            placeholder="Masukkan nomor kontak"
            value={values.no_kontak}
            onChange={(e) => setValues({ ...values, no_kontak: e.target.value })}
            required
          />

          <Input
            label="Nomor Kontak Darurat"
            name="no_kontak_darurat"
            placeholder="Masukkan nomor kontak darurat"
            value={values.no_kontak_darurat}
            onChange={(e) => setValues({ ...values, no_kontak_darurat: e.target.value })}
            required
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Simpan Perubahan
          </button>
        </div>
      </div>


      <Footer />

      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
           style={{ display: isAlertOpen || isOpen ? 'flex' : 'none' }}>
        
        <SuccessMessage 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          title="Hapus Sukses"
          message="Data properti telah berhasil dihapus!"
          type="delete"
        />
      </div>
    </div>
  )
}

export default PemilikProfil