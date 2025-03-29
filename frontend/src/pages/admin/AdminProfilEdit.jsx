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
import { Label } from "../../components/Label";

const AdminProfilEdit = () => {
    const { id } = useParams();
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        no_kontak: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(API.GET_USER_DATA, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            const user = response.data.data;
            setUserData({
                name: user.name ?? "",
                email: user.email ?? "",
                no_kontak: user.no_kontak ?? "",
                password: ""
            });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToUpdate = { ...userData };
            if (!dataToUpdate.password) {
                delete dataToUpdate.password;
            }
            
            const response = await axios.put(
                API.UPDATE_USER_DATA.replace(':id', id),
                dataToUpdate,
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                }
            );

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
                        <p className="text-sm">Foto Profil</p>

                        <div className="flex justify-center items-center overflow-x-auto">
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=50"
                                alt="Profile"
                                className="w-72 h-72 rounded-full"
                            />
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
