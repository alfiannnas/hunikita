import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Plus } from "lucide-react";
import { Alert } from "../../components/Alert";
import { SuccessMessage } from "../../components/SuccessMessage";

const AdminPusatBantuan = () => {
    const [pusatBantuan, setPusatBantuan] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Tampilkan 8 item per halaman

    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [idPusatBantuan, setIdPusatBantuan] = useState(null); // State untuk menyimpan ID yang akan dihapus
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol tampilan SuccessMessage

    useEffect(() => {
        if (!auth || !auth.token) {
            navigate('/admin/login');
            return;
        }
        fetchPusatBantuan();
    }, [auth, navigate]);

    const fetchPusatBantuan = async () => {
        try {
            const response = await axios.get(API.GET_ADMIN_PUSAT_BANTUAN, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setPusatBantuan(response.data.data);
        } catch (error) {
            console.error("Error fetching pusat bantuan:", error);
            if (error.response?.status === 401) {
                navigate('/admin/login');
            }
        }
    };

    // Hitung total halaman
    const totalPages = Math.ceil(pusatBantuan.length / itemsPerPage);

    // Data yang ditampilkan berdasarkan halaman
    const displayedPusatBantuan = pusatBantuan.slice(
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
        if (idPusatBantuan === null) return; // Pastikan ID tidak null

        try {
            const response = await fetch(`${API.DELETE_PUSAT_BANTUAN}/${idPusatBantuan}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Gagal menghapus data');
            }

            setIsAlertOpen(false);
            setIsOpen(true);
            fetchPusatBantuan(); // Panggil fungsi untuk mengambil data terbaru
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <Header />
                <main className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">Pusat Bantuan</h2>

                    {/* Pusat Bantuan Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Daftar Pusat Bantuan</h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-gray-500 border-b">
                                        <th className="pb-3">Nama Lengkap</th>
                                        <th className="pb-3">Email</th>
                                        <th className="pb-3">Tentang</th>
                                        <th className="pb-3">Pesan</th>
                                        <th className="pb-3">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedPusatBantuan.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-3">{item.nama_lengkap}</td>
                                            <td className="py-3">{item.email}</td>
                                            <td className="py-3">{item.tentang}</td>
                                            <td className="py-3">{item.pesan}</td>


                                            <td className="py-3 flex space-x-2">
                                                <button 
                                                    onClick={() => navigate(`/admin/pusat-bantuan/edit/${item.id}`)}
                                                    className="p-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setIdPusatBantuan(item.id);
                                                        setIsAlertOpen(true);
                                                    }}
                                                    className="p-2 text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
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
                    </div>

                    <Alert
                        isOpen={isAlertOpen}
                        title="Hapus"
                        message="Apakah anda yakin ingin menghapus data ini?"
                        onCancel={() => setIsAlertOpen(false)}
                        onConfirm={handleDelete}
                    />
                    <SuccessMessage 
                        isOpen={isOpen} 
                        onClose={() => setIsOpen(false)}
                        title="Hapus Sukses"
                        message="Data telah berhasil dihapus!"
                        type="delete"
                    />
                </main>
            </div>
        </div>
    );
};

export default AdminPusatBantuan;
