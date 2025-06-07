import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Input } from "../../components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { Alert } from "../../components/Alert";
import { SuccessMessage } from "../../components/SuccessMessage";
import { DEFAULT_PROFILE_IMAGE } from "../../components/DefaultImage";

const AdminPenyewaEdit = () => {
    const { id } = useParams();
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [penyewa, setPenyewa] = useState({});

    useEffect(() => {
        if (!auth || !auth.token) {
            navigate('/admin-login');
            return;
        }
        fetchPenyewa();
    }, [auth, navigate, id]);

    const fetchPenyewa = async () => {
        try {
            const response = await axios.get(`${API.GET_PENYEWA_BY_ID}/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setPenyewa(response.data.data);
        } catch (error) {
            console.error("Error fetching penyewa:", error);
            if (error.response?.status === 401) {
                navigate('/admin-login');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPenyewa(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        } catch (error) {
            console.error('Error formatting date:', error);
            return '';
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

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <Header />
                <main className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">Detail Penyewa</h2>

                    {/* Penyewa Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Detail Penyewa</h3>
                        </div>
                        <div className="flex justify-center items-center overflow-x-auto">
                            <img
                                src={penyewa.profil_img || DEFAULT_PROFILE_IMAGE}
                                alt="Profile"
                                className="w-72 h-72 rounded-full object-cover"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <Input
                                label="Nama Properti"
                                name="nama_properti"
                                value={penyewa.property_name}
                                onChange={handleChange}
                                disabled
                            />
                            <Input
                                label="Jenis Properti"
                                name="jenis_properti"
                                value={penyewa.property_type_name}
                                onChange={handleChange}
                                disabled
                            />
                            <Input
                                label="Harga"
                                name="harga"
                                type="text"
                                value={formatRupiah(penyewa.harga_property)}
                                onChange={handleChange}
                                className="text-left"
                                disabled
                            />
                            <Input
                                label="Nama Pemilik"
                                name="nama_pemilik"
                                value={penyewa.nama}
                                onChange={handleChange}
                                disabled
                            />
                            <Input
                                label="Nama Penyewa"
                                name="nama_penyewa"
                                value={penyewa.user_name}
                                onChange={handleChange}
                                disabled
                            />
                            <Input
                                label="Jenis Kelamin"
                                name="jenis_kelamin"
                                value={penyewa.gender}
                                onChange={handleChange}
                                disabled
                            />
                            <Input
                                label="Tanggal Lahir"
                                name="tanggal_lahir"
                                type="date"
                                value={formatDate(penyewa.born_date)}
                                onChange={handleChange}
                                disabled
                            />
                            <Input
                                label="Kota Asal"
                                name="kota_asal"
                                value={penyewa.city_from}
                                onChange={handleChange}
                                disabled
                            />
                            <Input
                                label="Pekerjaan"
                                name="pekerjaan"
                                value={penyewa.job_user}
                                onChange={handleChange}
                                disabled
                            />
                            <Input
                                label="Nama Instansi/Kampus"
                                name="nama_instansi"
                                value={penyewa.nama_instansi}
                                onChange={handleChange}
                                disabled
                            />
                            <Input
                                label="Status"
                                name="status"
                                value={penyewa.stats}
                                onChange={handleChange}
                                disabled
                            />
                            <Input
                                label="Pendidikan Terakhir"
                                name="pendidikan_terakhir"
                                value={penyewa.last_education}
                                onChange={handleChange}
                                disabled
                            />
                            <Input
                                label="Nomor Kontak Darurat"
                                name="nomor_darurat"
                                value={penyewa.emergency_number}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminPenyewaEdit;
