import Navbar from '../../components/Navbar'
import {useSelector, useDispatch} from 'react-redux'
import Footer from '../../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import axios from "axios";
import { API } from '../../constant'
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Alert } from "../../components/Alert";
import { SuccessMessage } from "../../components/SuccessMessage";
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { updateAuth } from '../../store/auth/action'

const PemilikProfil = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Format tanggal dari ISO string ke format YYYY-MM-DD
  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  };

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
    tgl_lahir: "",
    profile_image: ""
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

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedProfileImage(reader.result);
        setValues(prev => ({ ...prev, profile_image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch user profile data
  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axios.get(API.GET_PEMILIK_PROFILE, {
        headers: {
          Authorization: 'Bearer ' + auth.token
        }
      });

      if (response.data.status) {
        const userData = response.data.data;
        const { password, ...userDataWithoutPassword } = userData;
        setValues({
          ...userDataWithoutPassword,
          password: '',
          tgl_lahir: formatDate(userData.tgl_lahir)
        });
        if (userData.profile_image) {
          setSelectedProfileImage(userData.profile_image);
        }
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Gagal mengambil data profil");
    }
  }, [auth.token]);

  // Update user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Buat object formData tanpa password terlebih dahulu
      const { password, ...formDataWithoutPassword } = values;
      
      // Hanya masukkan password ke formData jika tidak kosong dan bukan string kosong
      const formData = {
        ...formDataWithoutPassword,
        ...(password && password.trim() !== '' ? { password } : {})
      };

      const response = await axios.put(API.UPDATE_PEMILIK_PROFILE, formData, {
        headers: {
          Authorization: 'Bearer ' + auth.token
        }
      });

      if (response.data.status) {
        setIsSuccess(true);
        // Update redux state dengan data terbaru
        dispatch(updateAuth({
          ...auth,
          name: values.name,
          email: values.email,
          role: values.role,
          no_kontak: values.no_kontak
        }));
        // Reset password field
        setValues(prev => ({ ...prev, password: '' }));
        // Refresh data setelah update
        fetchUserProfile();
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.response?.data?.message || "Gagal mengupdate profil");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    } else {
      fetchUserProfile();
    }
  }, [auth, navigate, fetchUserProfile]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <div className="gap-4 ml-[36px] mt-[44px]">
        <h1 className="text-[36px] font-bold">Profil Anda</h1>
      </div>

      {/* Form Profil */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 mb-6 mx-[36px]">
        <h2 className="text-xl font-semibold mb-6">Data Profil</h2>
        
        {/* Alert Error */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {isSuccess && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
            Profil berhasil diperbarui!
          </div>
        )}
        
        {/* Foto Profil */}
        <div className="mb-6">
          <label className="block text-[18px] font-medium text-gray-700 mb-2">Foto Profil</label>
          <div className="flex flex-col items-center gap-4">
            {/* Preview Foto */}
            <div className="w-64 h-64 border-2 border-gray-300 rounded-full overflow-hidden">
              {selectedProfileImage ? (
                <img 
                  src={selectedProfileImage} 
                  alt="Preview Profil" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Tombol Upload */}
            <div className="flex flex-col items-center gap-2">
              <label className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
                <span>Pilih Foto</span>
                <input 
                  type="file" 
                  onChange={handleProfileImageChange} 
                  name="profile_image" 
                  className="hidden" 
                  accept="image/*"
                />
              </label>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nama"
            name="name"
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
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Masukkan password baru"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-[38px] text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

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

          <Input
            label="Tanggal Lahir"
            type="date"
            name="tgl_lahir"
            value={values.tgl_lahir}
            onChange={(e) => setValues({ ...values, tgl_lahir: e.target.value })}
            required
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>

      <Footer />

      {isSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <SuccessMessage 
            isOpen={isSuccess} 
            onClose={() => setIsSuccess(false)}
            title="Update Sukses"
            message="Data profil telah berhasil diperbarui!"
            type="success"
          />
        </div>
      )}
    </div>
  )
}

export default PemilikProfil