import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Edit, Trash2, Plus } from "lucide-react";
import { Alert } from "../../components/Alert";
import { SuccessMessage } from "../../components/SuccessMessage";
import { Input } from "../../components/Input";

const AdminPusatBantuanEdit = () => {
    const [pusatBantuanData, setPusatBantuanData] = useState({
        judul: '',
        deskripsi: '',
        kategori: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { id } = useParams(); // Ambil ID dari URL

    useEffect(() => {
        if (!auth || !auth.token) {
            navigate('/admin/login');
            return;
        }
        fetchPusatBantuanById();
    }, [auth, navigate, id]);

    const fetchPusatBantuanById = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API.GET_ADMIN_PUSAT_BANTUAN_BY_ID}/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setPusatBantuanData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching pusat bantuan:", error);
            setError("Gagal mengambil data pusat bantuan");
            setLoading(false);
            if (error.response?.status === 401) {
                navigate('/admin/login');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPusatBantuanData({
            ...pusatBantuanData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${API.UPDATE_ADMIN_PUSAT_BANTUAN}/${id}`, pusatBantuanData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            if (response.status === 200) {
                setIsSuccess(true);
                // Setelah 3 detik, redirect ke halaman daftar pusat bantuan
                setTimeout(() => {
                    navigate('/admin-pusat-bantuan');
                }, 3000);
            }
        } catch (error) {
            console.error("Error updating pusat bantuan:", error);
            setError("Gagal memperbarui data pusat bantuan");
        }
    };

    const handleUpdatePosting = async () => {
        try {
            const response = await axios.put(`${API.UPDATE_ADMIN_PUSAT_BANTUAN_POSTING}/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            console.log(response);
            
            if (response.status === 200) {
                setPusatBantuanData({
                    ...pusatBantuanData,
                    is_posting: 1
                });
                setIsSuccess(true);
            }
        } catch (error) {
            console.error("Error updating posting status:", error);
            setError("Gagal mengupdate status posting");
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <Header />
                <main className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">Edit Pusat Bantuan</h2>

                    {/* Pusat Bantuan Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Detail Pusat Bantuan</h3>
                            <div className="flex gap-2">
                                {pusatBantuanData.is_posting === 1 ? (
                                    <span className="text-white bg-green-500 p-2 rounded-md">Status: Posted</span>
                                ) : (
                                    <button 
                                        onClick={() => {
                                            if (!pusatBantuanData.jawaban || pusatBantuanData.jawaban.trim() === '') {
                                                alert("Silakan isi jawaban terlebih dahulu sebelum posting");
                                                return;
                                            }
                                            handleUpdatePosting();
                                        }}
                                        className="text-white bg-blue-500 p-2 rounded-md hover:bg-blue-600 transition"
                                    >
                                        Posting
                                    </button>
                                )}
                            </div>
                        </div>

                        {loading ? (
                            <p className="text-center py-4">Memuat data...</p>
                        ) : error ? (
                            <p className="text-red-500 text-center py-4">{error}</p>
                        ) : (
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 mt-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Lengkap
                                    </label>
                                    <input 
                                        type="text"
                                        name="nama_lengkap"
                                        value={pusatBantuanData.nama_lengkap || ''}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input 
                                        type="email"
                                        name="email"
                                        value={pusatBantuanData.email || ''}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tentang
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <textarea 
                                        name="tentang"
                                        value={pusatBantuanData.tentang}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan tentang"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px] bg-gray-100"
                                        required
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Pesan
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <textarea 
                                        name="pesan"
                                        value={pusatBantuanData.pesan}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan pesan"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px] bg-gray-100"
                                        required
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Jawaban
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <textarea 
                                        name="jawaban"
                                        value={pusatBantuanData.jawaban || ''}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan Jawaban!"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end mt-4">
                                    {pusatBantuanData.is_posting === 1 ? (
                                        <button 
                                            type="button"
                                            onClick={() => navigate('/admin-pusat-bantuan')}
                                            className="p-2 px-5 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                                        >
                                            Kembali
                                        </button>
                                    ) : (
                                        <>
                                            <button 
                                                type="button"
                                                onClick={() => navigate('/admin-pusat-bantuan')}
                                                className="p-2 px-5 mr-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                type="submit"
                                                className="p-2 px-5 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                                            >
                                                Simpan
                                            </button>
                                        </>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>

                    <SuccessMessage 
                        isOpen={isSuccess} 
                        onClose={() => setIsSuccess(false)}
                        title="Perubahan Berhasil"
                        message="Data pusat bantuan telah berhasil diperbarui!"
                        type="success"
                    />
                </main>
            </div>
        </div>
    );
};

export default AdminPusatBantuanEdit;
