import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { Alert } from "../../components/Alert";
import { SuccessMessage } from "../../components/SuccessMessage";

const AdminProperti = () => {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Tampilkan 5 properti per halaman
    
    const [idProperty, setIdProperty] = useState(null); // State untuk menyimpan ID properti yang akan dihapus
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol tampilan SuccessMessage

    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth || !auth.token) {
            navigate('/admin/login');
            return;
        }
        fetchProperties();
    }, [auth, navigate]);

    const fetchProperties = async () => {
        try {
            const response = await axios.get(API.GET_ADMIN_PROPERTIES, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setProperties(response.data.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
            // Cek apakah response mengindikasikan redirect
            if (error.response?.data?.isRedirect) {
                navigate('/admin-login');
            }
        }
    };

    // Hitung total halaman
    const totalPages = Math.ceil(properties.length / itemsPerPage);

    // Data yang ditampilkan berdasarkan halaman
    const displayedProperties = properties.slice(
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
        if (idProperty === null) return;

        try {
            const response = await fetch(`${API.DELETE_ADMIN_PROPERTY}/${idProperty}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Gagal menghapus properti');
            }

            setIsAlertOpen(false);
            setIsOpen(true);
            fetchProperties(); // Refresh data setelah menghapus
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
                    <h2 className="text-2xl font-semibold mb-6">Properti</h2>

                    {/* Properties Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Properti</h3>
                        </div>
                        
                        {/* <div className="flex justify-end mb-4">
                            <Link 
                                to={`/admin-properti/create`} 
                                className="p-1 px-5 text-white bg-blue-500 rounded-md hover:bg-blue-600 hover:text-white transition"
                            >
                                Create
                            </Link>
                        </div> */}

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-gray-500 border-b">
                                        <th className="pb-3">Nama Properti</th>
                                        <th className="pb-3">Jenis Properti</th>
                                        <th className="pb-3">Nama Pemilik Properti</th>
                                        <th className="pb-3">Status</th>
                                        <th className="pb-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedProperties.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-6 text-gray-500">
                                                No data found
                                            </td>
                                        </tr>
                                    ) : (
                                        displayedProperties.map((property) => (
                                            <tr key={property.id} className="border-b">
                                                <td className="py-3">
                                                    <div className="flex items-center space-x-3">
                                                        {property.foto_properti ? (
                                                            <img 
                                                                src={property.foto_properti} 
                                                                alt={property.name}
                                                                className="w-12 h-12 object-cover rounded-md"
                                                            />
                                                        ) : (
                                                            <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                                                                <span className="text-center text-gray-500 text-xs">No Image</span>
                                                            </div>
                                                        )}
                                                        <span>{property.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3">{property.property_type_name}</td>
                                                <td className="py-3">{property.nama}</td>
                                                <td className="py-3">
                                                    <span className={`px-2 py-1 rounded-full text-sm ${
                                                        property.status === 'Disetujui' ? 'bg-green-500 text-white' : 
                                                        property.status === 'Diproses' ? 'bg-yellow-500 text-white' :
                                                        property.status === 'Ditolak' ? 'bg-red-500 text-white' : 
                                                        'bg-red-800 text-red-800'
                                                    }`}>
                                                        {property.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 flex space-x-2">
                                                    <button 
                                                        onClick={() => navigate(`/admin-properti/edit/${property.id}`)}
                                                        className="p-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setIdProperty(property.id);
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
                        {displayedProperties.length > 0 && (
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
                        message="Apakah anda yakin ingin menghapus properti ini?"
                        onCancel={() => setIsAlertOpen(false)}
                        onConfirm={handleDelete}
                    />
                    
                    <SuccessMessage 
                        isOpen={isOpen} 
                        onClose={() => setIsOpen(false)}
                        title="Hapus Sukses"
                        message="Data properti telah berhasil dihapus!"
                        type="delete"
                    />
                </main>
            </div>
        </div>
    );
};

export default AdminProperti;
