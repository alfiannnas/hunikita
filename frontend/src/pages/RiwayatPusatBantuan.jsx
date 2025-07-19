import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import axios from "axios";
import { API } from '../constant'
import { Edit, Eye, Trash2 } from "lucide-react";
import { Alert } from "../components/Alert";
import { SuccessMessage } from "../components/SuccessMessage";
import { ModalDropdown } from '../components/ModalDropdown'

const RiwayatPusatBantuan = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const auth = useSelector((state) => state.auth)
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth || !auth.token) {
            navigate('/login');
            return;
        }
        fetchPusatBantuan();
        // eslint-disable-next-line
    }, [auth, navigate]);

    const fetchPusatBantuan = async () => {
        try {
            const response = await axios.get(API.GET_ADMIN_PUSAT_BANTUAN, {
                params: { user_id: auth.id },
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setData(response.data.data || []);
        } catch (error) {
            setData([]);
        }
    };

    // Hitung total halaman
    const totalPages = Math.ceil((data.length || 0) / itemsPerPage);

    // Data yang ditampilkan berdasarkan halaman
    const displayedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) || [];

    // Fungsi untuk navigasi halaman
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <div className="gap-4 ml-[36px] mt-[44px]">
                <h1 className="text-[36px] font-bold">Riwayat Pusat Bantuan</h1>
            </div>

            {/* Tabel Pusat Bantuan */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 mx-[36px] flex-grow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Daftar Pusat Bantuan</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-gray-500 border-b">
                                <th className="pb-3">Nama Lengkap</th>
                                <th className="pb-3">Email</th>
                                <th className="pb-3">Tentang</th>
                                <th className="pb-3">Pesan</th>
                                <th className="pb-3">Action</th> {/* Tambahkan kolom Action */}
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-6 text-gray-500">
                                        Tidak ada data
                                    </td>
                                </tr>
                            ) : (
                                displayedData.map((item) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="py-3">{item.nama_lengkap}</td>
                                        <td className="py-3">{item.email}</td>
                                        <td className="py-3">{item.tentang}</td>
                                        <td className="py-3">{item.pesan}</td>
                                        <td className="py-3 flex space-x-2">
                                            <button
                                                className="p-2 text-yellow-600 border border-yellow-600 rounded-md hover:bg-yellow-600 hover:text-white transition"
                                                title="Lihat Detail"
                                                onClick={() => navigate(`/riwayat-pusat-bantuan/${item.id}`)}
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                {displayedData.length > 0 && (
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default RiwayatPusatBantuan