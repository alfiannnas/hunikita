import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { API } from '../constant'
import { useSelector } from "react-redux";
import { ExternalLink, MapPinned } from "lucide-react";
import MapComponent from '../components/MapComponent'

const Detailkosan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [tanggalMasuk, setTanggalMasuk] = useState('');
  const [periodeSewa, setPeriodeSewa] = useState('bulan');

  const auth = useSelector((state) => state.auth);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API.GET_PROPERTIES_BY_ID}/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      setProperties(response.data.data);
      setIsLoading(false);
      console.log("Data properties:", response.data.data);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching properties:", error);
      if (error.response?.status === 401) {
        navigate('/admin-login');
      }
    }
  };

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const formatRupiah = (angka) => {
    if (!angka) return "Rp 0";
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(angka);
  };

  return (
    <div>
      <Navbar />
      <main className="p-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="relative">
              <img
                src={properties.foto_properti || DEFAULT_PROPERTY_IMAGE}
                alt="Property"
                className="w-full h-[480px] rounded-lg object-cover shadow-sm"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent rounded-b-lg">
                <p className="text-white font-medium">{properties?.name || 'Nama Properti'}</p>
                <p className="text-white/80 text-sm mt-1">{properties?.property_type_name || 'Tipe Properti'}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="mt-4 text-3xl font-bold text-gray-800 mb-1">{properties.name}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPinned className="w-5 h-5 text-blue-600" />
                <span>{properties?.address || 'Alamat tidak tersedia'}</span>
              </div>
            </div>
            <div>
              <div className="mt-2 bg-[#3182CE] shadow-sm rounded-lg p-4 border border-gray-100">
                <p className="text-sm text-white mb-1">Mulai</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-white">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(properties?.harga || 0)}
                  </p>
                  <span className="text-sm text-white ml-1">/bulan</span>
                </div>
              </div>
            </div>

          </div>

          {/* Flex row: Card Sewa di kanan, deskripsi di kiri */}
          <div className="flex gap-8 mt-4">
            <div className="flex-1">
              <div>
                <p className="text-sm text-gray-500 mt-2">
                  Terakhir diupdate: {new Date(properties?.updated_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
                <hr className="my-4 border-gray-300" />
              </div>
              <h1 className="text-xl font-medium text-gray-800 mb-1">Lokasi {properties.property_type_name}</h1>
              <div className="grid grid-cols-[100px_1fr] gap-1 text-sm">
                <p className="font-medium text-gray-700">Provinsi</p>
                <p className="text-gray-700">: {properties?.province || '-'}</p>

                <p className="font-medium text-gray-700">Kab/Kota</p>
                <p className="text-gray-700">: {properties?.city || '-'}</p>

                <p className="font-medium text-gray-700">Kecamatan</p>
                <p className="text-gray-700">: {properties?.subdistrict || '-'}</p>

                <p className="font-medium text-gray-700">Kelurahan</p>
                <p className="text-gray-700">: {properties?.village || '-'}</p>

                <p className="font-medium text-gray-700">Alamat</p>
                <p className="text-gray-700">: {properties?.address || '-'}</p>
              </div>
              <hr className="my-4 border-gray-300" />
              <div className="flex gap-12">
                {/* Kolom Kiri - Tipe */}
                <div className="flex-1 max-w-[400px]">
                  <h1 className="text-xl font-medium text-gray-800 mb-1">Tipe {properties.property_type_name}</h1>
                  <div className="grid grid-cols-[100px_1fr] gap-1 text-sm">
                    <p className="font-medium text-gray-700">Jenis</p>
                    <p className="text-gray-700">: {properties?.jenis_properti || '-'}</p>

                    <p className="font-medium text-gray-700">Umur</p>
                    <p className="text-gray-700">: {properties?.umur_bangunan || '-'} tahun</p>

                    <p className="font-medium text-gray-700">Jam Bertamu</p>
                    <p className="text-gray-700">
                      : {properties?.jam_bertamu === 'Bebas'
                        ? 'Bebas'
                        : properties?.jam_bertamu
                          ? `Pukul ${properties.jam_bertamu}`
                          : '-'}
                    </p>

                    <p className="font-medium text-gray-700">Peliharaan</p>
                    <p className="text-gray-700">: {properties?.pelihara_binatang || '-'}</p>
                  </div>
                </div>
              </div>
              <hr className="my-4 border-gray-300" />
              {/* Deskripsi Properti */}
              <h1 className="text-xl font-medium text-gray-800 mb-1">Deskripsi {properties.property_type_name}</h1>

              <h1 className="text-lg font-medium text-gray-800 mb-1">
                {properties?.fasilitas ? `Kamar Mandi Dalam: ${formatRupiah(properties?.harga)} / Bulan` : ''}
              </h1>
              {/* Fasilitas dan Fasilitas Bersama dalam layout flex */}
              <div className="flex flex-wrap gap-8">
                {/* Fasilitas */}
                <div className="flex-1 min-w-[300px]">

                  <h1 className="text-lg font-medium text-gray-800 mb-1">
                    {properties?.fasilitas ? `Fasilitas:` : ''}
                  </h1>
                  <div
                    className="text-gray-700 facilities-content"
                    dangerouslySetInnerHTML={{ __html: properties?.fasilitas || '-' }}
                  />
                </div>

                {/* Fasilitas Bersama */}
                <div className="flex-1 min-w-[300px]">
                  <h1 className="text-lg font-medium text-gray-800 mb-1">
                    {properties?.fasilitas_bersama ? `Fasilitas Bersama:` : ''}
                  </h1>
                  <div
                    className="text-gray-700 facilities-content"
                    dangerouslySetInnerHTML={{ __html: properties?.fasilitas_bersama || '-' }}
                  />
                </div>
              </div>

              {/* Style untuk kedua facilities-content */}
              <style jsx>{`
                                .facilities-content ul {
                                    list-style-type: disc;
                                    padding-left: 1.5rem;
                                    margin-bottom: 1rem;
                                }
                                .facilities-content li {
                                    margin-bottom: 0.25rem;
                                }
                            `}</style>

              <h1 className="text-lg font-medium text-gray-800 mb-1">
                {properties?.fasilitas_1 ? `Kamar Mandi Luar: ${formatRupiah(properties?.harga_1)} / Bulan` : ''}
              </h1>
              {/* Fasilitas dan Fasilitas Bersama dalam layout flex */}
              <div className="flex flex-wrap gap-8">
                {/* Fasilitas */}
                <div className="flex-1 min-w-[300px]">

                  <h1 className="text-lg font-medium text-gray-800 mb-1">
                    {properties?.fasilitas_1 ? `Fasilitas:` : ''}
                  </h1>
                  <div
                    className="text-gray-700 facilities-content"
                    dangerouslySetInnerHTML={{ __html: properties?.fasilitas_1 || '' }}
                  />
                </div>

                {/* Fasilitas Bersama */}
                <div className="flex-1 min-w-[300px]">
                  <h1 className="text-lg font-medium text-gray-800 mb-1">
                    {properties?.fasilitas_bersama_1 ? `Fasilitas Bersama:` : ''}
                  </h1>
                  <div
                    className="text-gray-700 facilities-content"
                    dangerouslySetInnerHTML={{ __html: properties?.fasilitas_bersama_1 || '' }}
                  />
                </div>
              </div>

              {/* Style untuk kedua facilities-content */}
              <style jsx>{`
                                .facilities-content ul {
                                    list-style-type: disc;
                                    padding-left: 1.5rem;
                                    margin-bottom: 1rem;
                                }
                                .facilities-content li {
                                    margin-bottom: 0.25rem;
                                }
                            `}</style>


            </div>
            <div className="w-full max-w-xs">
              {/* Card Sewa */}
              <div className="p-6 bg-gray-50 rounded-lg shadow flex flex-col gap-2">
                <h1 className="mt-4 text-2xl font-bold text-gray-800 underline mb-1">Pengajuan Sewa</h1>
                <label className="font-medium text-gray-700">Tanggal Masuk</label>
                <input
                  type="date"
                  className="border rounded px-3 py-2"
                  value={tanggalMasuk}
                  onChange={e => setTanggalMasuk(e.target.value)}
                />
                <label className="font-medium text-gray-700">Pilih Periode Sewa</label>
                <select
                  className="border rounded px-3 py-2"
                  value={periodeSewa}
                  onChange={e => setPeriodeSewa(e.target.value)}
                >
                  <option value="bulan">Per Bulan</option>
                  <option value="3bulan">Per 3 Bulan</option>
                  <option value="6bulan">Per 6 Bulan</option>
                  <option value="tahun">Per Tahun</option>
                </select>
                <div className="mt-2">
                  <span className="font-semibold underline">Total Sewa: </span>
                  <span className="ml-2 font-semibold">
                    {(() => {
                      const harga = properties?.harga || 0;
                      switch (periodeSewa) {
                        case '3bulan': return formatRupiah(harga * 3);
                        case '6bulan': return formatRupiah(harga * 6);
                        case 'tahun': return formatRupiah(harga * 12);
                        default: return formatRupiah(harga);
                      }
                    })()}
                  </span>
                </div>
                <button
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition"
                  onClick={() => alert('Pengajuan sewa berhasil diajukan!')}
                  disabled={!tanggalMasuk}
                >
                  Ajukan Sewa
                </button>
                <a
                  href={`https://wa.me/${properties?.no_kontak?.replace(/^0/, '62')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-600 text-white rounded-md font-bold rounded-md 
                            hover:bg-green-700 transition text-center"
                >
                  Hubungi
                </a>
              </div>
            </div>
          </div>
          <div className="w-[1000px]">
            <h1 className="text-xl font-medium text-gray-800 mt-4">Petunjuk Arah</h1>
            <p className="text-gray-700">{properties?.petunjuk_arah || '-'}</p>
          </div>
          <div>
            <h1 className="text-xl font-medium text-gray-800 mt-4">Peta</h1>
            <MapComponent
              latitude={properties?.latitude}
              longitude={properties?.longitude}
            />
            {properties?.latitude && properties?.longitude && (
              <div className="mt-2 flex justify-end">
                <a
                  href={`https://www.google.com/maps?q=${properties.latitude},${properties.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <ExternalLink />
                  Lihat di Google Maps
                </a>
              </div>
            )}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  )
}

export default Detailkosan