import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Edit, ExternalLink, MapPinned, Trash2 } from "lucide-react";
import { Alert } from "../../components/Alert";
import { SuccessMessage } from "../../components/SuccessMessage";
import { Input } from "../../components/Input";
import { DEFAULT_PROPERTY_IMAGE } from "../../components/DefaultImage";
import MapComponent from "../../components/MapComponent";

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
                                <div className="flex justify-center mt-4">
                                    <a 
                                        href={`https://wa.me/${properties?.no_kontak?.replace(/^0/, '62')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-white text-blue-500 font-bold rounded-md 
                                            hover:bg-blue-50 hover:shadow-md hover:scale-105 
                                            transform transition-all duration-200 ease-in-out"
                                    >
                                        Hubungi
                                    </a>
                                </div>
                            </div>
                        </div>
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
                        <div className="flex gap-12">
                            {/* Kolom Kanan - Lokasi */}
                            <div className="flex-1 max-w-[400px]">
                                <h1 className="text-xl font-medium text-gray-800 mb-1">Lokasi {properties.property_type_name}</h1>
                                <div className="grid grid-cols-[100px_1fr] gap-1 text-sm">
                                    <p className="font-medium text-gray-700">Provinsi</p>
                                    <p className="text-gray-700">: {properties?.province || '-'}</p>
                                    
                                    <p className="font-medium text-gray-700">Kota</p>
                                    <p className="text-gray-700">: {properties?.city || '-'}</p>
                                    
                                    <p className="font-medium text-gray-700">Kecamatan</p>
                                    <p className="text-gray-700">: {properties?.subdistrict || '-'}</p>

                                    <p className="font-medium text-gray-700">Alamat</p>
                                    <p className="text-gray-700">: {properties?.address || '-'}</p>
                                </div>
                            </div>
                            {/* Kolom Kiri - Tipe */}
                            <div className="flex-1 max-w-[400px]">
                                <h1 className="text-xl font-medium text-gray-800 mb-1">Tipe {properties.property_type_name}</h1>
                                <div className="grid grid-cols-[100px_1fr] gap-1 text-sm">
                                    <p className="font-medium text-gray-700">Jenis</p>
                                    <p className="text-gray-700">: {properties?.jenis_properti || '-'}</p>
                                    
                                    <p className="font-medium text-gray-700">Umur</p>
                                    <p className="text-gray-700">: {properties?.umur_bangunan || '-'} tahun</p>
                                    
                                    <p className="font-medium text-gray-700">Jam Bertamu</p>
                                    <p className="text-gray-700">: {properties?.jam_bertamu || '-'}</p>

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
                    
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Data Properti</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4">                        
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
