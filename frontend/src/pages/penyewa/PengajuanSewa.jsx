import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { API } from '../../constant'
import { useSelector } from "react-redux";
import { ExternalLink, MapPinned } from "lucide-react";
import MapComponent from '../../components/MapComponent'

const PengajuanSewa = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [properties, setProperties] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState({});

    const auth = useSelector((state) => state.auth);

    const {
        totalSewa,
        tanggalMasuk,
        periodeSewa,
        harga,
        namaProperti,
        alamat,
        foto,
        jenisProperti
    } = location.state || {};

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

    useEffect(() => {
        fetchProperties();
        fetchUsers();
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
            <main className="px-4 md:px-32 lg:px-80">
                <h1 className="mt-4 text-3xl font-bold text-gray-800 mb-1">Pengajuan Sewa</h1>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-6 items-start">
                    <div className="flex flex-col gap-4 w-full md:w-2/3">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">1</div>
                                        <div className="flex-1 h-1 bg-blue-300 mx-2"></div>
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-bold">2</div>
                                        <div className="flex-1 h-1 bg-gray-200 mx-2"></div>
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-bold">3</div>
                                    </div>
                                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                                        <span>Pengajuan</span>
                                        <span>Persetujuan</span>
                                        <span>Pembayaran</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-xl font-semibold">Informasi Penyewa</h2>
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors w-fit"
                                >
                                    Ubah
                                </button>
                            </div>
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
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-6 self-start mx-auto">
                        <h2 className="text-xl font-semibold mb-2">Informasi Properti</h2>
                        <div className="flex items-start gap-4">
                            <img
                                src={foto || DEFAULT_PROPERTY_IMAGE}
                                alt="Property"
                                className="w-[180px] rounded-lg object-cover shadow-sm"
                            />
                            <div className="flex-1">
                                <div className="mb-2">
                                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                                        {jenisProperti}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-medium text-gray-800 text-lg">{namaProperti}</span>
                                </div>
                                <div className="mb-2 flex items-center gap-1">
                                    <MapPinned size={16} className="text-gray-400" />
                                    <span className="text-gray-600 text-sm">{alamat}</span>
                                </div>
                            </div>
                        </div>
                        <hr className="my-4 border-gray-300" />
                        <h2 className="text-xl font-semibold mb-2">Detail Pembayaran</h2>
                        <p>
                            Pembayaran dapat dilakukan setelah Pemilik Properti menyetujui pengajuan sewa.
                        </p>
                        <div className="text-sm text-gray-500 mt-1">
                            Periode: {periodeSewa} Bulan<br />
                            Tanggal Masuk: {tanggalMasuk}
                        </div>
                        <div className="mt-4">
                            <span className="font-medium text-gray-800 text-md underline">Biaya sewa: </span>
                            <span className="ml-3 text-gray-800 font-bold text-lg">{formatRupiah(totalSewa)}</span>
                        </div>
                        <hr className="my-4 border-dashed border-gray-300" />
                        <div className="mt-4">
                            <span className="font-medium text-gray-800 text-xl">Grand Total: </span>
                            <span className="ml-3 text-green-600 font-bold text-lg">{formatRupiah(totalSewa)}</span>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default PengajuanSewa