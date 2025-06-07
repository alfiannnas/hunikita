import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { Input } from "../../components/Input";
import { DEFAULT_PROPERTY_IMAGE } from "../../components/DefaultImage";

const AdminPemilikPropertiEdit = () => {

    const { id } = useParams();
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [properties, setProperties] = useState({});

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperties(prev => ({
            ...prev,
            [name]: value
        }));
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

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <Header />
                <main className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">Pemilik Properti</h2>

                    {/* Properties Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Detail Pemilik Properti</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Input
                                label="Nama Pemilik"
                                name="nama"
                                value={properties.nama || ''}
                                onChange={handleChange}
                            />
                            <Input
                                label="Nama Email"
                                name="email"
                                value={properties.email || ''}
                                onChange={handleChange}
                            />
                            <Input
                                label="Nomor Handphone"
                                name="no_kontak"
                                value={properties.no_kontak || ''}
                                onChange={handleChange}
                            />
                            <Input
                                label="Nama Properti"
                                name="name"
                                value={properties.name || ''}
                                onChange={handleChange}
                            />
                            <Input
                                label="Tipe Properti"
                                name="property_type_name"
                                value={properties.property_type_name || ''}
                                onChange={handleChange}
                            />
                            <Input
                                label="Harga"
                                name="harga"
                                type="text"
                                value={formatRupiah(properties.harga)}
                                onChange={handleChange}
                                className="text-left"
                                disabled
                            />
                            <Input
                                label="Alamat"
                                name="alamat"
                                value={properties.address || ''}
                                onChange={handleChange}
                            />
                            <Input
                                label="Jumlah Kamar"
                                name="room_count"
                                value={properties.room_count || ''}
                                onChange={handleChange}
                            />
                            <p className="block text-sm font-medium text-gray-700 mb-1">Foto Properti</p>
                            <img
                                src={properties.profil_img || DEFAULT_PROPERTY_IMAGE}
                                alt="Profile"
                                className="w-72 h-52 rounded-md object-cover"
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminPemilikPropertiEdit;
