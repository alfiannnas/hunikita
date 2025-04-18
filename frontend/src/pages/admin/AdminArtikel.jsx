import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Alert } from "../../components/Alert";
import { SuccessMessage } from "../../components/SuccessMessage";

const AdminArtikel = () => {
    const [artikel, setArtikel] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Tampilkan 8 artikel per halaman

    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [idArtikel, setIdArtikel] = useState(null); // State untuk menyimpan ID artikel yang akan dihapus
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol tampilan SuccessMessage

    useEffect(() => {
        if (!auth || !auth.token) {
            navigate('/admin/login');
            return;
        }
        fetchArtikel();
    }, [auth, navigate]);

    const fetchArtikel = async () => {
        try {
            const response = await axios.get(API.GET_ADMIN_ARTIKEL, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setArtikel(response.data.data);
        } catch (error) {
            console.error("Error fetching artikel:", error);
            if (error.response?.status === 401) {
                navigate('/admin/login');
            }
        }
    };

    // Hitung total halaman
    const totalPages = Math.ceil(artikel.length / itemsPerPage);

    // Data yang ditampilkan berdasarkan halaman
    const displayedArtikel = artikel.slice(
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
        if (idArtikel === null) return;

        try {
            const response = await fetch(`${API.DELETE_ADMIN_ARTIKEL}/${idArtikel}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Gagal menghapus artikel');
            }

            setIsAlertOpen(false);
            setIsOpen(true);
            fetchArtikel(); // Refresh data setelah menghapus
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
                    <h2 className="text-2xl font-semibold mb-6">Artikel</h2>

                    {/* Artikel Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Daftar Artikel</h3>
                        </div>
                        <div className="flex justify-end">
                            <Link 
                                to={`/admin-artikel/create`} 
                                className="p-1 px-5 text-white bg-blue-500 rounded-md hover:bg-blue-600 hover:text-white transition"
                            >
                                Create
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-gray-500 border-b">
                                        <th className="pb-3">Judul</th>
                                        <th className="pb-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedArtikel.length === 0 ? (
                                        <tr>
                                            <td colSpan="2" className="text-center py-6 text-gray-500">
                                                No data found
                                            </td>
                                        </tr>
                                    ) : (
                                        displayedArtikel.map((artikel) => (
                                            <tr key={artikel.id} className="border-b">
                                                <td className="py-3">
                                                    <div className="flex items-center space-x-3">
                                                        {artikel.gambar ? (
                                                            <img 
                                                                src={artikel.gambar} 
                                                                alt={artikel.judul}
                                                                className="w-12 h-12 object-cover rounded-md"
                                                            />
                                                        ) : (
                                                            <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                                                                <span className="text-gray-500 text-xs text-center">No Image</span>
                                                            </div>
                                                        )}
                                                        <span>{artikel.judul}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 flex space-x-2">
                                                    <button className="p-2 text-yellow-600 border border-yellow-600 rounded-md hover:bg-yellow-600 hover:text-white transition"
                                                        onClick={() => navigate(`/admin-artikel/detail/${artikel.id}`)}>
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                    <button className="p-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
                                                    onClick={() => navigate(`/admin-artikel/edit/${artikel.id}`)}>
                                                        <Edit className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setIdArtikel(artikel.id);
                                                            setIsAlertOpen(true);
                                                        }}
                                                        className="p-2 text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls - hanya tampil jika ada data */}
                        {displayedArtikel.length > 0 && (
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

                    <Alert
                        isOpen={isAlertOpen}
                        title="Hapus"
                        message="Apakah anda yakin ingin menghapus artikel ini?"
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

export default AdminArtikel;
