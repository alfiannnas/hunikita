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
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { DEFAULT_PROFILE_IMAGE } from "../../components/DefaultImage";

const AdminProfil = () => {

    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        no_kontak: '',
        email: '',
        password: '',
        profil_image: ''
    });
    
    useEffect(() => {
        if (!auth || !auth.token) {
            navigate('/admin/login');
            return;
        }

        // Ambil data dari localStorage
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, [auth, navigate]);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <Header />
                <main className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">Profil Admin</h2>

                    {/* Artikel Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <p className="text-sm">Foto Profil</p>

                        <div className="flex justify-center items-center overflow-x-auto">
                            <img
                                src={userData.profile_image || DEFAULT_PROFILE_IMAGE}
                                alt="Profile"
                                className="w-72 h-72 rounded-full object-cover"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-4">
                            <div>
                                <label className="block font-medium text-gray-700">Nama</label>
                                <input 
                                type="text" 
                                className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed" 
                                placeholder="Masukkan nama Anda!" 
                                value={userData.name} 
                                disabled 
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Kontak</label>
                                <input 
                                type="text" 
                                className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed" 
                                placeholder="Masukkan nomor kontak Anda!" 
                                value={userData.no_kontak} 
                                disabled 
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Email</label>
                                <input 
                                type="email" 
                                className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed" 
                                placeholder="Masukkan email Anda!" 
                                value={userData.email} 
                                disabled 
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Password</label>
                                <input 
                                type="password" 
                                className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed" 
                                placeholder="Masukkan password Anda!" 
                                value="••••••••••••••"
                                disabled 
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <Link 
                                to={`/admin-profil/edit/${userData.id}`} 
                                className="p-1 px-5 text-white bg-blue-500 rounded-md hover:bg-blue-600 hover:text-white transition"
                            >
                                Edit
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminProfil;
