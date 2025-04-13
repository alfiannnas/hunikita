import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { API } from '../../constant';
import axios from 'axios';
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import { Input } from '../../components/Input';
import { Select } from "../../components/Select";
import MapComponent from '../../components/MapComponent';


const Formtambah = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const auth = useSelector((state) => state.auth )
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth, navigate]);


  const [formData, setFormData] = useState({
    owner_name: "",
    owner_email: "",
    owner_phone: "",
    name: "",
    address: "",
    room_count: "",
    foto_properti: "",
    province: "",
    city: "",
    subdistrict: "",
    property_type_id: "",
    umur_bangunan: "",
    jam_bertamu: "",
    pelihara_binatang: "",
    petunjuk_arah: "",
    status: "Diproses",
    harga: "",
    harga_1: "",
    jenis_properti: "",
    fasilitas: "",
    fasilitas_bersama: "",
    fasilitas_1: "",
    fasilitas_bersama_1: "",
    longitude: "",
    latitude: ""
  });

  const handleValidation = () => {
    const requiredFields = [
      'owner_name',
      'owner_email',
      'owner_phone',
      'name',
      'address',
      'room_count',
      'property_type_id'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Mohon isi ${field.replace(/_/g, ' ')}`);
        return false;
      }
    }

    return true;
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    try {
      if (selectedImage) {
        setFormData((prevFormData) => ({ ...prevFormData, foto_properti: selectedImage }));
        return selectedImage;
      }
    } catch (err) {
      alert('Error mengkonversi gambar');
      console.error(err);
    }
    return null;
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!handleValidation()) {
      return;
    }

    try {
      const imageUrl = await handleImageUpload();
      
      if (!imageUrl) {
        alert('Mohon upload gambar properti');
        return;
      }

      const token = auth?.token;
      const userId = auth?.id;
      
      const response = await axios.post(API.POST_PROPERTIES_BY_PEMILIK, 
        {
          ...formData,
          foto_properti: imageUrl,
          user_id: userId
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert('Properti berhasil ditambahkan!');
        navigate('/list-iklan');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response?.status === 401) {
        alert('Sesi anda telah berakhir. Silakan login kembali.');
        navigate('/login');
      } else {
        alert('Terjadi kesalahan saat menambahkan properti. Silakan coba lagi.');
        console.error('Error details:', error.response?.data);
      }
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleMapClick = (lat, lng) => {
    setSelectedLocation({ lat, lng });
    setFormData(prev => ({
      ...prev,
      latitude: lat.toString(),
      longitude: lng.toString()
    }));
  };

  return (
    <div>
        <Navbar />
      <div className="w-[1148px] mx-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="text-[36px] font-bold mt-[65px]">Buat Iklan</h1>
          <hr className="mt-[10px] h-[2px] bg-gray-300" />
          <div className="mt-[20px]">
            <Input
              label="Nama Pemilik"
              type="text"
              name='owner_name'
              value={formData.owner_name}
              placeholder="Masukkan Nama"
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <Input
              label="Email"
              type="email"
              name='owner_email'
              value={formData.owner_email}
              autoComplete='on'
              placeholder="Masukkan Email"
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <Input
              label="No. Handphone"
              type="text"
              name='owner_phone'
              value={formData.owner_phone}
              placeholder="Masukkan No. Handphone"
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <Input
              label="Nama Properti"
              type="text"
              name='name'
              value={formData.name}
              placeholder="Masukkan Nama Properti"
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
          <Select
              label="Tipe Properti"
              name='property_type_id'
              value={formData.property_type_id}
              placeholder="Pilih Tipe Properti"
              options={[
                { value: "1", label: "Kos" },
                { value: "2", label: "Kontrakan" }
              ]}
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <Input
              label="Alamat"
              type="text"
              name='address'
              value={formData.address}
              placeholder="Masukkan Alamat"
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <Input
              label="Jumlah Kamar"
              type="text"
              name='room_count'
              value={formData.room_count}
              placeholder="Masukkan Jumlah Kamar"
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <Input
              label="Provinsi"
              type="text"
              name='province'
              value={formData.province}
              placeholder="Masukkan Provinsi"
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <Input
              label="Kota"
              type="text"
              name='city'
              value={formData.city}
              placeholder="Masukkan Kota"
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <Input
              label="Kecamatan"
              type="text"
              name='subdistrict'
              value={formData.subdistrict}
              placeholder="Masukkan Kecamatan"
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <Select
              label="Jenis Properti"
              name='jenis_properti'
              value={formData.jenis_properti}
              placeholder="Pilih Jenis Properti"
              options={[
                { value: "Kost Putra", label: "Kost Putra" },
                { value: "Kost Putri", label: "Kost Putri" },
                { value: "Kost Campur", label: "Kost Campur" },
                { value: "4", label: "Kontrakan" }
              ]}
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <Input
              label="Umur Bangunan"
              type="number"
              name='umur_bangunan'
              value={formData.umur_bangunan}
              placeholder="Masukkan Umur Bangunan (tahun)"
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <Input
              label="Jam Bertamu"
              type="text"
              name='jam_bertamu'
              value={formData.jam_bertamu}
              placeholder="Contoh: Bebas/Pukul 08.00 - 20.00 WIB"
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <Input
              label="Pelihara Binatang"
              type="text"
              name='pelihara_binatang'
              value={formData.pelihara_binatang}
              placeholder="Contoh: Diperbolehkan/Tidak Diperbolehkan"
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <label className="block text-sm font-medium text-gray-700">Petunjuk Arah</label>
            <textarea
              name="petunjuk_arah"
              value={formData.petunjuk_arah}
              onChange={handleChange}
              placeholder="Masukkan petunjuk arah ke properti"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>
          <div className="mt-[20px]">
            <Input
              label="Harga"
              type="number"
              name='harga'
              value={formData.harga}
              placeholder="Masukkan Harga"
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <Input
              label="Fasilitas"
              type="text"
              name='fasilitas'
              value={formData.fasilitas}
              placeholder="Masukkan Fasilitas"
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <Input
              label="Fasilitas Bersama"
              type="text"
              name='fasilitas_bersama'
              value={formData.fasilitas_bersama}
              placeholder="Masukkan Fasilitas Bersama"
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <Input
              label="Harga Tipe Kamar Mandi Luar (Jika ada)"
              type="number"
              name='harga_1'
              value={formData.harga_1}
              placeholder="Masukkan Harga Kamar Mandi Luar"
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <Input
              label="Fasilitas Tambahan Kamar Mandi Luar (Jika ada)"
              type="text"
              name='fasilitas_1'
              value={formData.fasilitas_1}
              placeholder="Masukkan Fasilitas Tambahan Kamar Mandi Luar"
              onChange={handleChange}
            />
          </div>
          <div className="mt-[20px]">
            <Input
              label="Fasilitas Bersama Tambahan Kamar Mandi Luar (Jika ada)"
              type="text"
              name='fasilitas_bersama_1'
              value={formData.fasilitas_bersama_1}
              placeholder="Masukkan Fasilitas Bersama Tambahan Kamar Mandi Luar"
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <h1 className="block text-[18px] font-medium  text-gray-700">Pilih Lokasi di Peta</h1>
            <div className="w-full h-[400px] mb-4">
              <MapComponent 
                latitude={formData.latitude || null} 
                longitude={formData.longitude || null}
                onLocationSelect={handleMapClick}
                isEditable={true}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Longitude"
                type="text"
                name='longitude'
                value={formData.longitude}
                placeholder="Longitude akan terisi otomatis"
                onChange={handleChange}
                disabled
              />
              <Input
                label="Latitude"
                type="text"
                name='latitude'
                value={formData.latitude}
                placeholder="Latitude akan terisi otomatis"
                onChange={handleChange}
                disabled
              />
            </div>
          </div>
          <div className="mt-[30px]">
            <label className="block text-[18px] font-medium  text-gray-700 mt-2">Foto Properti</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                {selectedImage ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={selectedImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-white bg-opacity-75 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">Klik untuk memilih gambar</p>
                    <p className="text-xs text-gray-500">PNG, JPG, atau JPEG (MAX. 5MB)</p>
                  </div>
                )}
                <input 
                  type="file" 
                  onChange={handleImageChange} 
                  name='img' 
                  className="hidden" 
                  accept="image/*"
                />
              </label>
            </div>
          </div>
          <div className="mt-[32px] flex gap-3">
            <input
              type="checkbox"
              name='valid'
              className="bg-gray-300 border-none"
            />
            <h1 className="text-md">Pastikan semua data sudah benar!</h1>
          </div>
          <button
                className="text-md justify-center items-center flex mx-auto bg-blue-500 hover:bg-blue-400 px-2 py-2 mt-5 rounded-lg font-semibold text-white font-Poppins focus:bg-blue-400 focus:outline-none transition duration-200"
                type="submit"
              >
                Pasang Iklan
              </button>
        </form>
      </div>
      <div className="mt-[50px]">
        <Footer />
      </div>
    </div>
  )
}

export default Formtambah