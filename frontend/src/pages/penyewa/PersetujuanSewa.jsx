import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { API } from '../../constant'
import { useSelector } from "react-redux";
import { ExternalLink, MapPinned } from "lucide-react";
import MapComponent from '../../components/MapComponent'
import { DEFAULT_PROPERTY_IMAGE } from '../../components/DefaultImage'

const PersetujuanSewa = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [properties, setProperties] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState({});
    const [ktpPreview, setKtpPreview] = useState(null);
    const [catatan, setCatatan] = useState('');
    const [penyewa, setPenyewa] = useState('');


    const auth = useSelector((state) => state.auth);

    // const {
    //     totalSewa,
    //     tanggalMasuk,
    //     periodeSewa,
    //     harga,
    //     namaProperti,
    //     alamat,
    //     foto,
    //     jenisProperti
    // } = location.state || {};

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
        } catch (error) {
            setIsLoading(false);
            console.error("Error fetching properties:", error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API.GET_PEMILIK_PROFILE}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setUsers(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Error fetching properties:", error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const fetchPenyewa = async () => {
        try {
            const response = await axios.get(`${API.GET_PENYEWA_BY_ID}/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setPenyewa(response.data.data);
        } catch (error) {
            console.error("Error fetching penyewa:", error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        fetchProperties();
        fetchUsers();
        fetchPenyewa();
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

    const handleUploadImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setKtpPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!handleValidation()) {
            return;
        }

        try {
            const imageUrl = await handleUploadImage();

            if (!imageUrl) {
                alert('Mohon upload gambar properti');
                return;
            }

            const token = auth?.token;
            const userId = auth?.id;

            const response = await axios.post(API.POST_PENGAJUAN,
                {
                    ...formData,
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

    return (
        <div>
            <Navbar />
            <main className="px-4 md:px-32 lg:px-80">
                <h1 className="mt-4 text-3xl font-bold text-gray-800 mb-1">Persetujuan Sewa</h1>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-6 items-start">
                    <div className="flex flex-col gap-4 w-full md:w-2/3">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">1</div>
                                        <div className="flex-1 h-1 bg-blue-300 mx-2"></div>
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">2</div>
                                        <div className="flex-1 h-1 bg-gray-200 mx-2"></div>
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-bold">3</div>
                                        <div className="flex-1 h-1 bg-gray-200 mx-2"></div>
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-bold">4</div>
                                    </div>
                                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                                        <span>Pengajuan</span>
                                        <span>Persetujuan</span>
                                        <span>Pembayaran</span>
                                        <span>Check-in</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="grid gap-2">
                                <div className="mt-3">
                                    <span className="font-medium">Nama:</span>
                                    <p className="text-gray-700">{users.name}</p>
                                </div>
                                <div className="mt-3">
                                    <span className="font-medium">Nomor HP:</span>
                                    <p className="text-gray-700">{users.no_kontak}</p>
                                </div>
                                <div className="mt-3">
                                    <span className="font-medium">Jenis Kelamin:</span>
                                    <p className="text-gray-700">{users.jenis_kelamin}</p>
                                </div>
                                <div className="mt-3">
                                    <span className="font-medium">Nama Perguruan Tinggi:</span>
                                    <p className="text-gray-700">{users.nama_kampus}</p>
                                </div>
                                <div className="mt-3">
                                    <span className="font-medium">Pekerjaan:</span>
                                    <p className="text-gray-700">{users.pekerjaan}</p>
                                </div>
                                <hr className="my-4 border-gray-300" />
                                <h2 className="text-xl font-semibold">Persyaratan Dokumen</h2>
                                <p className="text-gray-700">Untuk memudahkan proses pengajuan sewa, silakan upload dokumen KTP Anda dengan jelas. Dokumen ini diperlukan untuk keperluan lapor kepada RT/RW setempat.</p>
                                <div
                                    className="flex flex-col items-center justify-center pt-5 pb-6 cursor-pointer border border-dashed rounded-md"
                                    onClick={() => document.getElementById('ktp-upload').click()}
                                >
                                    {ktpPreview ? (
                                        <img
                                            src={ktpPreview}
                                            alt="Preview KTP"
                                            className="w-40 h-40 object-cover rounded-lg border mb-2"
                                        />
                                    ) : (
                                        <>
                                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                            <p className="mt-2 text-sm text-gray-500">Klik untuk memilih gambar</p>
                                            <p className="text-xs text-gray-500">PNG, JPG, atau JPEG (MAX. 5MB)</p>
                                        </>
                                    )}
                                    <input
                                        id="ktp-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleUploadImage}
                                    />
                                </div>
                                <hr className="my-4 border-gray-300" />
                                <h2 className="text-xl font-semibold">Catatan</h2>
                                <p className="text-gray-700">Anda bisa menambahkan catatan untuk Pemilik terkait pengajuan sewa yang akan dilakukan.</p>
                                <textarea
                                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    rows={4}
                                    placeholder="Tulis catatan tambahan untuk pemilik di sini (opsional)..."
                                    value={catatan}
                                    onChange={e => setCatatan(e.target.value)}
                                />

                                <hr className="my-4 border-gray-300" />
                                <h2 className="text-xl font-semibold">Status Persetujuan</h2>
                                <p className="text-gray-700">Untuk melakukan pembayaran, data anda harus disetujui terlebih dahulu oleh Pemilik!</p>

                                <div className="mt-4">
                                    <span className="px-4 py-2 rounded-md bg-yellow-200">
                                        Status: Diproses
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-6 self-start mx-auto">
                        <h2 className="text-xl font-semibold mb-2">Informasi Properti</h2>
                        <div className="flex items-start gap-4">
                            <img
                                src={properties.foto_properti}
                                alt="Property"
                                className="w-[180px] rounded-lg object-cover shadow-sm"
                            />
                            <div className="flex-1">
                                <div className="mb-2">
                                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                                        {properties.jenis_properti}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-medium text-gray-800 text-lg">{properties.name}</span>
                                </div>
                                <div className="mb-2 flex items-center gap-1">
                                    <MapPinned size={16} className="text-gray-400" />
                                    <span className="text-gray-600 text-sm">{properties.address}</span>
                                </div>
                            </div>
                        </div>
                        <hr className="my-4 border-gray-300" />
                        <h2 className="text-xl font-semibold mb-2">Detail Pembayaran</h2>
                        <p>
                            Pembayaran dapat dilakukan setelah Pemilik Properti menyetujui pengajuan sewa.
                        </p>
                        <div className="text-sm text-gray-500 mt-1">
                            Periode: Hardcode Bulan<br />
                            Tanggal Masuk: Hardcode
                        </div>
                        {/* <div className="mt-4">
                            <span className="font-medium text-gray-800 text-md underline">Biaya sewa: </span>
                            <span className="ml-3 text-gray-800 font-bold text-lg">{formatRupiah(totalSewa)}</span>
                        </div>
                        <hr className="my-4 border-dashed border-gray-300" />
                        <div className="mt-4">
                            <span className="font-medium text-gray-800 text-xl">Grand Total: </span>
                            <span className="ml-3 text-green-600 font-bold text-lg">{formatRupiah(totalSewa)}</span>
                        </div> */}
                    </div>

                </div>

            </main>
            <Footer />
        </div>
    )
}

export default PersetujuanSewa