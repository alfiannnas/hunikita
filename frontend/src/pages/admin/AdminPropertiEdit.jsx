import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { Alert } from "../../components/Alert";
import { SuccessMessage } from "../../components/SuccessMessage";
import { Input } from "../../components/Input";
import { DEFAULT_PROPERTY_IMAGE } from "../../components/DefaultImage";

const AdminPropertiEdit = () => {
    const { id } = useParams();
    const [idProperty, setIdProperty] = useState(null); // State untuk menyimpan ID properti yang akan dihapus
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol tampilan SuccessMessage
    const [properties, setProperties] = useState({});
    const [successMessage, setSuccessMessage] = useState({
        title: "",
        message: "",
        isOpen: false
    });

    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth || !auth.token) {
            navigate('/admin-login');
            return;
        }
        fetchProperties();
    }, [auth, navigate, id]);

    const fetchProperties = async () => {
        try {
            const response = await axios.get(`${API.GET_ADMIN_PROPERTY_BY_ID}/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setProperties(response.data.data);
            console.log("Data properties:", response.data.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
            if (error.response?.status === 401) {
                navigate('/admin-login');
            }
        }
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

    const formatRupiah = (angka) => {
        if (!angka) return "Rp 0";
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(angka);
    };

    const handleUpdateStatus = async (newStatus) => {
        try {
            const response = await axios.put(`${API.UPDATE_ADMIN_PROPERTY_STATUS}/${id}`, 
                { 
                    status: newStatus  // Pastikan nama field sesuai dengan yang diharapkan backend
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.token}`
                    }
                }
            );
            console.log(response);

            if (response.data.status === "success") {
                // Tambahkan success message jika perlu
                setIsOpen(true);
                // Refresh data
                fetchProperties();
            } else {
                console.error("Failed to update status:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating status:", error);
            if (error.response?.status === 401) {
                navigate('/admin-login');
            }
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <Header />
                <main className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">Detail Properti</h2>
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Data Properti</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Input
                                label="Pemilik Properti"
                                name="owner_name"
                                value={properties?.owner_name || ''}
                                onChange={() => {}}
                                disabled
                            />                            
                            <Input
                                label="Jenis Properti"
                                name="property_type_name"
                                value={properties?.property_type_name || ''}
                                onChange={() => {}}
                                disabled
                            />
                            <Input
                                label="Komentar"
                                name="komentar"
                                value={properties?.komentar || ''}
                                onChange={() => {}}
                                disabled
                            />
                            <div className="flex items-center gap-2">
                                <p>Status: </p>
                                <span className={`px-2 py-1 rounded-full text-sm font-medium
                                    ${properties?.status === 'Diproses' ? 'bg-yellow-100 text-yellow-800' : ''}
                                    ${properties?.status === 'Disetujui' ? 'bg-green-100 text-green-800' : ''}
                                    ${properties?.status === 'Ditolak' ? 'bg-red-100 text-red-800' : ''}
                                    ${!properties?.status ? 'bg-gray-100 text-gray-800' : ''}
                                `}>
                                    {properties?.status || '-'}
                                </span>
                            </div>
                        </div>
                        <div className="block text-sm font-medium text-gray-700 mb-1 mt-4">
                            {properties?.status === 'Diproses' && (
                                <div className="flex gap-2 mt-4">
                                    <button 
                                        onClick={() => handleUpdateStatus('Disetujui')}
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                    >
                                        Setuju
                                    </button>
                                    <button 
                                        onClick={() => handleUpdateStatus('Ditolak')}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                    >
                                        Tolak
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <Alert
                        isOpen={isAlertOpen}
                        title="Hapus"
                        message="Apakah anda yakin ingin menghapus properti ini?"
                        onCancel={() => setIsAlertOpen(false)}
                        onConfirm={handleDelete}
                    />
                    
                    <SuccessMessage 
                        isOpen={successMessage.isOpen} 
                        onClose={() => setSuccessMessage(prev => ({...prev, isOpen: false}))}
                        title={successMessage.title}
                        message={successMessage.message}
                        type="success"
                    />
                </main>
            </div>
        </div>
    );
};

export default AdminPropertiEdit;
