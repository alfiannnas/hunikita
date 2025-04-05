import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { Alert } from "../../components/Alert";
import { SuccessMessage } from "../../components/SuccessMessage";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from "../../components/Input";

const AdminArtikelDetail = () => {
    const [artikel, setArtikel] = useState([]);

    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    // Tambahkan state untuk form
    const [formData, setFormData] = useState({
        judul: '',
        konten: '',
        gambar: null,
        preview: '',
        penulis: '',
        location: '',
        created_at: '',
        kategori: '',
        isi: '',
    });

    // Tambahkan state untuk menyimpan ID dari URL
    const [artikelId, setArtikelId] = useState(null);

    // Konfigurasi modules untuk Quill
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'list', 'bullet',
        'align',
        'link'
    ];

    useEffect(() => {
        if (!auth || !auth.token) {
            navigate('/admin/login');
            return;
        }

        // Ambil ID dari URL (misalnya: /admin-artikel-edit/123)
        const id = window.location.pathname.split('/').pop();
        if (id) {
            setArtikelId(id);
            fetchArtikelById(id);
        }
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

    // Fungsi untuk mengambil artikel berdasarkan ID
    const fetchArtikelById = async (id) => {
        try {
            const response = await axios.get(`${API.GET_ADMIN_ARTIKEL_BY_ID}/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            const artikelData = response.data.data;
            console.log(artikelData);
            
            // Update form data dengan data artikel yang diterima
            setFormData({
                judul: artikelData.judul || '',
                konten: artikelData.isi || '',
                gambar: artikelData.gambar || null,
                preview: artikelData.gambar || '',
                penulis: artikelData.penulis || '',
                location: artikelData.location || '',
                created_at: artikelData.created_at || '',
                kategori: artikelData.kategori || '',
                isi: artikelData.isi || '',
                status: artikelData.status || ''
            });

        } catch (error) {
            console.error("Error fetching artikel by ID:", error);
            if (error.response?.status === 401) {
                navigate('/admin/login');
            }
            alert('Gagal mengambil data artikel');
        }
    };

    const handleUpdateStatus = async (newStatus) => {
        try {
            const response = await axios.put(`${API.UPDATE_ADMIN_ARTIKEL_STATUS}/${artikelId}`, 
                { 
                    status: newStatus
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.token}`
                    }
                }
            );

            if (response.data.status === "success") {
                // Refresh data artikel setelah update
                fetchArtikelById(artikelId);
                alert("Status artikel berhasil diperbarui");
            } else {
                alert("Gagal memperbarui status artikel");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            if (error.response?.status === 401) {
                navigate('/admin-login');
            }
            alert("Terjadi kesalahan saat memperbarui status artikel");
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
                            <h3 className="text-lg font-semibold text-gray-800">Detail Artikel</h3>
                            <h3
                                className={`text-sm font-semibold px-3 py-1 rounded-full inline-block
                                    ${
                                    formData.status === "Draft"
                                        ? "bg-gray-100 text-gray-700"
                                        : formData.status === "Published"
                                        ? "bg-green-100 text-green-700"
                                        : formData.status === "Rejected"
                                        ? "bg-red-100 text-red-700"
                                        : ""
                                    }`}
                                >
                                {formData.status}
                            </h3>
                        </div>

                        <div className="overflow-x-auto p-4 space-y-6">
                            {/* Gambar Utama */}
                            <img
                                src={formData.gambar}
                                alt="Cover Artikel"
                                className="w-full h-96 object-cover rounded-xl shadow-md"
                            />

                            {/* Judul Artikel */}
                            <h1 className="text-2xl font-bold text-gray-900">
                                {formData.judul}
                            </h1>

                            {/* Info Penulis & Tanggal */}
                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                                <span>Ditulis oleh <strong className="text-gray-700">{formData.penulis}</strong></span>
                                <span>•</span>
                                <span className="flex items-center space-x-2">
                                    <strong className="text-gray-700">{formData.location}</strong>
                                    <span>{new Date(formData.created_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}</span>
                                </span>
                            </div>

                            {/* Kategori/Tag */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">{formData.kategori}</span>
                            </div>
                            <hr className="my-4 border-gray-300" />


                            {/* Konten Artikel */}
                            <div className="w-full flex justify-center">
                                <div
                                    className="w-[1250px] text-gray-800 
                                            [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 
                                            [&>p]:mb-4 [&>p]:leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: formData.isi }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Status Artikel</h3>
                        </div>
                        <div className="block text-sm font-medium text-gray-700 mb-1 mt-4">
                            {formData?.status === 'Draft' ? (
                                <div className="flex gap-2 mt-4">
                                    <button 
                                        onClick={() => handleUpdateStatus('Published')}
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                    >
                                        Publish
                                    </button>
                                    <button 
                                        onClick={() => handleUpdateStatus('Rejected')}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                    >
                                        Reject
                                    </button>
                                </div>
                            ) : (
                                <div className="mt-4">
                                    <span className={`px-4 py-2 rounded-md ${
                                        formData?.status === 'Published' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        Status: {formData?.status}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminArtikelDetail;
