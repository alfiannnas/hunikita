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
import { Select } from "../../components/Select";

const AdminArtikelEdit = () => {
    const [artikel, setArtikel] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Tampilkan 8 artikel per halaman

    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [idArtikel, setIdArtikel] = useState(null); // State untuk menyimpan ID artikel yang akan dihapus
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol tampilan SuccessMessage

    // Tambahkan state untuk form
    const [formData, setFormData] = useState({
        judul: '',
        konten: '',
        gambar: null,
        preview: '',
        penulis: '',
        location: '',
        kategori: ''
    });

    // Tambahkan state untuk menyimpan ID dari URL
    const [artikelId, setArtikelId] = useState(null);

    // Opsi kategori untuk dropdown
    const kategoriOptions = [
        { value: 'Berita', label: 'Berita' },
        { value: 'Tips & Trik', label: 'Tips & Trik' },
        { value: 'Lifestyle', label: 'Lifestyle' },
        { value: 'Properti', label: 'Properti' },
        { value: 'Travel', label: 'Travel' },
        { value: 'Lainnya', label: 'Lainnya' }
    ];

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
            
            // Update form data dengan data artikel yang diterima
            setFormData({
                judul: artikelData.judul || '',
                konten: artikelData.isi || '',
                gambar: artikelData.gambar || null,
                preview: artikelData.gambar || '',
                penulis: artikelData.penulis || '',
                location: artikelData.location || '',
                kategori: artikelData.kategori || ''
            });

        } catch (error) {
            console.error("Error fetching artikel by ID:", error);
            if (error.response?.status === 401) {
                navigate('/admin/login');
            }
            alert('Gagal mengambil data artikel');
        }
    };

    // Hitung total halaman
    const totalPages = Math.ceil(artikel.length / itemsPerPage);

    // Data yang ditampilkan berdasarkan halaman
    const displayedArtikel = artikel.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle perubahan konten editor
    const handleEditorChange = (content) => {
        setFormData(prev => ({
            ...prev,
            konten: content
        }));
    };

    // Tambahkan fungsi untuk mengkonversi gambar ke base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    // Modifikasi handle input gambar untuk mengkonversi ke base64
    const handleImageChange = async (e) => {
        try {
            const file = e.target.files[0];
            if (file) {
                const base64 = await convertToBase64(file);
                setFormData(prev => ({
                    ...prev,
                    gambar: base64,
                    preview: base64
                }));
            }
        } catch (error) {
            console.error("Error converting image to base64:", error);
        }
    };

    // Modifikasi handleSubmit untuk mengirim gambar sebagai base64
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const slug = formData.judul.trim().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            
            const dataToSend = {
                judul: formData.judul.trim(),
                isi: formData.konten.trim(),
                slug: slug,
                gambar: formData.gambar,
                penulis: formData.penulis.trim(),
                location: formData.location.trim(),
                kategori: formData.kategori
            };
            
            const response = await axios.put(`${API.UPDATE_ADMIN_ARTIKEL}/${artikelId}`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data.status === 'success') {
                setIsOpen(true);
                setFormData({
                    judul: '',
                    konten: '',
                    gambar: null,
                    preview: '',
                    penulis: '',
                    location: '',
                    kategori: ''
                });
                
                setTimeout(() => {
                    navigate('/admin-artikel');
                }, 1500);
            } else {
                alert(response.data.message || 'Terjadi kesalahan saat menyimpan artikel');
            }
        } catch (error) {
            console.error('Error detail:', error);
            console.error('Response data:', error.response?.data);
            console.error('Status code:', error.response?.status);
            alert(error.response?.data?.message || 'Terjadi kesalahan saat menyimpan artikel');
        }
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
                            <h3 className="text-lg font-semibold">Edit Artikel</h3>
                        </div>
                        <div className="overflow-x-auto p-4">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Judul Input */}
                                <Input
                                    label="Judul Artikel"
                                    value={formData.judul}
                                    onChange={(e) => setFormData(prev => ({...prev, judul: e.target.value}))}
                                    required
                                />

                                {/* Kategori Input */}
                                <Select
                                    label="Kategori Artikel"
                                    options={kategoriOptions}
                                    value={formData.kategori}
                                    onChange={(e) => setFormData(prev => ({...prev, kategori: e.target.value}))}
                                    required
                                    placeholder="Pilih kategori artikel"
                                />

                                {/* Penulis Input */}
                                <Input
                                    label="Nama Penulis"
                                    value={formData.penulis}
                                    onChange={(e) => setFormData(prev => ({...prev, penulis: e.target.value}))}
                                    required
                                    placeholder="Masukkan nama penulis"
                                />

                                {/* Location Input */}
                                <Input
                                    label="Lokasi Penerbitan"
                                    value={formData.location}
                                    onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                                    required
                                    placeholder="Masukkan lokasi penerbitan"
                                />

                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gambar Artikel
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full"
                                    />
                                    {formData.preview && (
                                        <img
                                            src={formData.preview}
                                            alt="Preview"
                                            className="mt-2 h-40 object-cover rounded-md"
                                        />
                                    )}
                                </div>

                                {/* Rich Text Editor */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Konten Artikel
                                    </label>
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.konten}
                                        onChange={handleEditorChange}
                                        modules={modules}
                                        formats={formats}
                                        className="h-64 mb-12"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Update Artikel
                                </button>
                            </form>
                        </div>
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
                        title="Berhasil"
                        message="Artikel berhasil diperbarui!"
                        type="success"
                    />
                </main>
            </div>
        </div>
    );
};

export default AdminArtikelEdit;
