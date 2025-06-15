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
    const [buktiPembayaran, setBuktiPembayaran] = useState(null);
    const [buktiBase64, setBuktiBase64] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Fungsi untuk handle file upload dan konversi ke base64
    const handleBuktiChange = (e) => {
        const file = e.target.files[0];
        setBuktiPembayaran(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBuktiBase64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClickUpload = () => {
        document.getElementById('bukti-upload').click();
    };

    const handleSubmitBukti = async () => {
        if (!buktiBase64) {
            alert("Silakan upload bukti pembayaran terlebih dahulu.");
            return;
        }
        setIsSubmitting(true);
        try {
            // Ganti URL dan payload sesuai kebutuhan backend kamu
            await axios.post(`${API.POST_BUKTI_PEMBAYARAN}/${uuid}`, {
                bukti_pembayaran: buktiBase64,
            }, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            alert("Bukti pembayaran berhasil dikirim!");
            // (Opsional) Refresh data pengajuan
            window.location.reload();
        } catch (error) {
            alert("Gagal mengirim bukti pembayaran.");
        }
        setIsSubmitting(false);
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
                                        {/* Step 1: Pengajuan */}
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">1</div>
                                        <div className={`flex-1 h-1 ${[
                                            'Menunggu Persetujuan',
                                            'Disetujui',
                                            'Lunas (Menunggu Persetujuan)',
                                            'Pembayaran Disetujui',
                                            'Lunas'
                                        ].includes(pengajuan.status)
                                            ? 'bg-blue-200 mx-2'
                                            : 'bg-gray-200 mx-2'
                                            }`}></div>

                                        {/* Step 2: Persetujuan */}
                                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${[
                                            'Menunggu Persetujuan',
                                            'Disetujui',
                                            'Lunas (Menunggu Persetujuan)',
                                            'Pembayaran Disetujui',
                                            'Lunas'
                                        ].includes(pengajuan.status)
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-300 text-gray-600'
                                            } font-bold`}>2</div>
                                        <div className={`flex-1 h-1 ${[
                                            'Disetujui',
                                            'Lunas (Menunggu Persetujuan)',
                                            'Pembayaran Disetujui',
                                            'Lunas'
                                        ].includes(pengajuan.status)
                                            ? 'bg-blue-200 mx-2'
                                            : 'bg-gray-200 mx-2'
                                            }`}></div>

                                        {/* Step 3: Pembayaran */}
                                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${[
                                            'Disetujui',
                                            'Lunas (Menunggu Persetujuan)',
                                            'Pembayaran Disetujui',
                                            'Lunas'
                                        ].includes(pengajuan.status)
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-300 text-gray-600'
                                            } font-bold`}>3</div>
                                        <div className={`flex-1 h-1 ${[
                                            'Pembayaran Disetujui',
                                            'Lunas'
                                        ].includes(pengajuan.status)
                                            ? 'bg-blue-200 mx-2'
                                            : 'bg-gray-200 mx-2'
                                            }`}></div>

                                        {/* Step 4: Check-in */}
                                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${[
                                            'Pembayaran Disetujui',
                                            'Lunas'
                                        ].includes(pengajuan.status)
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-300 text-gray-600'
                                            } font-bold`}>4</div>
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

                            {pengajuan.status === "Pembayaran Disetujui" && (
                                <div className="mb-4 p-4 bg-green-50 border border-green-300 rounded text-green-800 font-semibold">
                                    <h2 className="text-xl font-semibold">Informasi Check-in</h2>
                                    <span>
                                        Pembayaran Anda telah <b>disetujui</b>. Silakan lakukan <b>check-in</b> ke properti pada tanggal: <b>
                                            {pengajuan.tgl_masuk ? new Date(pengajuan.tgl_masuk).toLocaleDateString('id-ID') : '-'}</b>.
                                    </span>
                                    <br />
                                    <span>
                                        Mohon tunjukkan bukti pembayaran dan identitas diri saat check-in ke pemilik properti.
                                    </span>
                                </div>
                            )}
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
                            <hr className="my-4 border-gray-300" />
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 cursor-pointer border border-dashed rounded-md">
                                {pengajuan.ktp && (
                                    <img
                                        src={pengajuan.ktp}
                                        alt="Dokumen"
                                        className="flex w-60 rounded-lg object-cover shadow-sm justify-center"
                                    />
                                )}
                            </div>
                            <hr className="my-4 border-gray-300" />
                            {/* Upload bukti pembayaran jika status Disetujui */}
                            {pengajuan.status === "Disetujui" && (
                                <div className="mb-4">
                                    <label className="block font-semibold mb-2">Upload Bukti Pembayaran:</label>
                                    <div
                                        className="flex flex-col items-center justify-center pt-5 pb-6 cursor-pointer border border-dashed rounded-md"
                                        onClick={handleClickUpload}
                                    >
                                        {buktiBase64 ? (
                                            <img
                                                src={buktiBase64}
                                                alt="Preview Bukti Pembayaran"
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
                                            id="bukti-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleBuktiChange}
                                        />
                                    </div>
                                    <button
                                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md font-sm hover:bg-blue-700 transition"
                                        onClick={handleSubmitBukti}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Mengirim..." : "Submit Pembayaran"}
                                    </button>
                                </div>
                            )}
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