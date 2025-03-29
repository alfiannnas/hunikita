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
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";

const AdminProfilEdit = () => {

    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [idArtikel, setIdArtikel] = useState(null); // State untuk menyimpan ID artikel yang akan dihapus

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
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=50"
                                alt="Profile"
                                className="w-72 h-72 rounded-full"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-4">
                            <div>
                                <Label>Nama</Label>
                                <Input placeholder="Masukkan nama Anda!"></Input>
                            </div>
                            <div>
                                <Label>Kontak</Label>
                                <Input placeholder="Masukkan nomor kontak Anda!"></Input>
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input placeholder="Masukkan email Anda!"></Input>
                            </div>
                            <div>
                                <Label>Password</Label>
                                <Input placeholder="Masukkan password Anda!"></Input>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button className="p-1 px-5 text-white bg-blue-500 rounded-md hover:bg-blue-600 hover:text-white transition">
                                Save
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminProfilEdit;
