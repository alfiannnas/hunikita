import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { API } from '../../constant'
import { useSelector } from "react-redux";
import { MapPinned } from "lucide-react";

const DetailSewa = () => {
    const { uuid } = useParams();
    const navigate = useNavigate();
    const [pengajuan, setPengajuan] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchPengajuan = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${API.GET_PENGAJUAN_BY_UUID}/${uuid}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                setPengajuan(response.data.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                if (error.response?.status === 401) {
                    navigate('/login');
                } else {
                    alert('Gagal mengambil data pengajuan');
                }
            }
        };
        if (uuid && auth?.token) fetchPengajuan();
    }, [uuid, auth, navigate]);

    const formatRupiah = (angka) => {
        if (!angka) return "Rp 0";
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(angka);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!pengajuan) {
        return <div>Data pengajuan tidak ditemukan.</div>;
    }

    return (
        <div>
            <Navbar />
            <main className="px-4 md:px-32 lg:px-80">
                <h1 className="mt-4 text-3xl font-bold text-gray-800 mb-1">Detail Pengajuan Sewa</h1>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-6 items-start">
                    <div className="flex flex-col gap-4 w-full md:w-2/3">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">1</div>
                                        <div className={`flex-1 h-1 ${pengajuan.status === 'Menunggu Persetujuan' || pengajuan.status === 'Disetujui' || pengajuan.status === 'Lunas' ? 'bg-blue-200 mx-2' : 'bg-gray-200 mx-2'}`}></div>
                                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${pengajuan.status === 'Menunggu Persetujuan' || pengajuan.status === 'Disetujui' || pengajuan.status === 'Lunas' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'} font-bold`}>2</div>
                                        <div className={`flex-1 h-1 ${pengajuan.status === 'Disetujui' || pengajuan.status === 'Lunas' ? 'bg-blue-200 mx-2' : 'bg-gray-200 mx-2'}`}></div>
                                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${pengajuan.status === 'Disetujui' || pengajuan.status === 'Lunas' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'} font-bold`}>3</div>
                                        <div className={`flex-1 h-1 ${pengajuan.status === 'Lunas' ? 'bg-blue-200 mx-2' : 'bg-gray-200 mx-2'}`}></div>
                                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${pengajuan.status === 'Lunas' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'} font-bold`}>4</div>
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
                            {/* <div className="mb-4">
                                <b>Invoice No:</b> {pengajuan.invoice_number || '-'}
                            </div> */}
                            <div className="mb-4">
                                <b>Nama Penyewa:</b> {pengajuan.user_name || '-'}
                            </div>
                            <div className="mb-4">
                                <b>Nama Properti:</b> {pengajuan.property_name || '-'}
                            </div>
                            <div className="mb-4">
                                <b>Status:</b> {pengajuan.status || '-'}
                            </div>
                            <div className="mb-4">
                                <b>Durasi Sewa:</b> {pengajuan.durasi_sewa || '-'} bulan
                            </div>
                            <div className="mb-4">
                                <b>Tanggal Masuk:</b> {pengajuan.tgl_masuk ? new Date(pengajuan.tgl_masuk).toLocaleDateString('id-ID') : '-'}
                            </div>
                            <div className="mb-4">
                                <b>Total Sewa:</b> {formatRupiah(pengajuan.total)}
                            </div>
                            <div className="mb-4">
                                <b>Catatan:</b> {pengajuan.catatan || '-'}
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-6 self-start mx-auto">
                        <h2 className="text-xl font-semibold mb-2">Informasi Properti</h2>
                        <div className="flex items-start gap-4">
                            {pengajuan.foto_properti && (
                                <img
                                    src={pengajuan.foto_properti}
                                    alt="Property"
                                    className="w-[180px] rounded-lg object-cover shadow-sm"
                                />
                            )}
                            <div className="flex-1">
                                <div className="mb-2">
                                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                                        {pengajuan.jenis_properti}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-medium text-gray-800 text-lg">{pengajuan.property_name}</span>
                                </div>
                                <div className="mb-2 flex items-center gap-1">
                                    <MapPinned size={16} className="text-gray-400" />
                                    <span className="text-gray-600 text-sm">{pengajuan.address || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <hr className="my-4 border-gray-300" />
                        <h2 className="text-xl font-semibold mb-2">Detail Pembayaran</h2>
                        <div className="text-sm text-gray-500 mt-1">
                            Periode: {pengajuan.durasi_sewa} Bulan<br />
                            Tanggal Masuk: {pengajuan.tgl_masuk ? new Date(pengajuan.tgl_masuk).toLocaleDateString('id-ID') : '-'}
                        </div>
                        <div className="mt-4">
                            <span className="font-medium text-gray-800 text-md underline">Biaya sewa: </span>
                            <span className="ml-3 text-gray-800 font-bold text-lg">{formatRupiah(pengajuan.total)}</span>
                        </div>
                        <hr className="my-4 border-dashed border-gray-300" />
                        <div className="mt-4">
                            <span className="font-medium text-gray-800 text-xl">Grand Total: </span>
                            <span className="ml-3 text-green-600 font-bold text-lg">{formatRupiah(pengajuan.total)}</span>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default DetailSewa