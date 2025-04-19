import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { SuccessMessage } from "../../components/SuccessMessage";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { DEFAULT_PROFILE_IMAGE } from "../../components/DefaultImage";

const AdminProfilEdit = () => {
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        no_kontak: "",
        password: "",
        profile_image: null
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(API.GET_PEMILIK_PROFILE, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            const user = response.data.data;
            setUserData({
                name: user.name ?? "",
                email: user.email ?? "",
                no_kontak: user.no_kontak ?? "",
                password: "",
                profile_image: null
            });
            
            // Jika user memiliki foto profil, tampilkan
            if (user.profile_image) {
                setPreviewImage(user.profile_image);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Gagal mengambil data user");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserData(prev => ({
                ...prev,
                profile_image: file
            }));
            
            // Membuat preview gambar
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Buat objek data untuk dikirim sebagai JSON
            const jsonData = {
                name: userData.name,
                email: userData.email,
                no_kontak: userData.no_kontak
            };
            
            if (userData.password && userData.password.trim() !== '') {
                jsonData.password = userData.password;
            }
            
            // Jika ada file gambar, konversi ke base64 dan tambahkan ke jsonData
            if (userData.profile_image) {
                const base64Image = await convertToBase64(userData.profile_image);
                jsonData.profile_image = base64Image;
                console.log('Gambar telah dikonversi ke base64');
            }
            
            console.log('Mengirim data sebagai JSON:', jsonData);
            
            // Kirim data sebagai JSON menggunakan endpoint baru
            const response = await axios.put(
                API.UPDATE_PEMILIK_PROFILE,
                jsonData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Hapus localStorage lama dan perbarui dengan data baru
            localStorage.removeItem('userData');
            localStorage.setItem('userData', JSON.stringify(response.data.data));

            setMessage("Data berhasil diperbarui");
            setError("");
            setIsOpen(true);
            
            setTimeout(() => {
                navigate('/admin-profil');
            }, 2000);

        } catch (error) {
            console.error("Error updating user data:", error);
            setError("Gagal memperbarui data");
            setMessage("");
        }
    };

    // Fungsi untuk mengkonversi file ke base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    useEffect(() => {
        if (!auth || !auth.token) {
            navigate('/admin/login');
            return;
        }
        fetchUserData();
    }, [auth, navigate]);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <Header />
                <main className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">Profil Admin</h2>

                    {message && <SuccessMessage message={message} />}
                    {error && <Alert message={error} />}

                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <p className="text-sm mb-2">Foto Profil</p>

                        <div className="flex flex-col items-center mb-4">
                            <img
                                src={previewImage || DEFAULT_PROFILE_IMAGE}
                                alt="Profile"
                                className="w-72 h-72 rounded-full object-cover mb-3"
                            />
                            <div className="mt-2">
                                <label htmlFor="profile_image" className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md transition">
                                    Pilih Foto
                                </label>
                                <input 
                                    type="file" 
                                    id="profile_image" 
                                    name="profile_image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-4">
                            <div>
                                <Label>Nama</Label>
                                <Input 
                                    name="name"
                                    value={userData.name}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan nama Anda!"
                                />
                            </div>
                            <div>
                                <Label>Kontak</Label>
                                <Input 
                                    name="no_kontak"
                                    value={userData.no_kontak}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan nomor kontak Anda!"
                                />
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input 
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan email Anda!"
                                />
                            </div>
                            <div>
                                <Label>Password</Label>
                                <Input 
                                    name="password"
                                    type="password"
                                    value={userData.password}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan password baru (opsional)"
                                />
                            </div>
                            <div className="col-span-2 flex justify-end mt-4">
                                <button 
                                    type="submit"
                                    className="p-1 px-5 text-white bg-blue-500 rounded-md hover:bg-blue-600 hover:text-white transition"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>

                    <SuccessMessage 
                    isOpen={isOpen} 
                    onClose={() => setIsOpen(false)}
                    title="Perubahan Berhasil"
                    message="Data telah berhasil diperbarui."
                    type="success"
                    />

                </main>
            </div>
        </div>
    );
};

export default AdminProfilEdit;
