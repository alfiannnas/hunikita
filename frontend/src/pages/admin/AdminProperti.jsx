import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

const AdminProperti = () => {
    const [properties, setProperties] = useState([]);
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth || !auth.token) {
            navigate('/admin/login');
            return;
        }
        fetchProperties();
    }, [auth, navigate]);

    const fetchProperties = async () => {
        try {
            const response = await axios.get(API.GET_ADMIN_PROPERTIES, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setProperties(response.data.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
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
                    <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

                    {/* Properties Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Properti</h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-gray-500 border-b">
                                        <th className="pb-3">Nama Properti</th>
                                        <th className="pb-3">Jenis Properti</th>
                                        <th className="pb-3">Nama Pemilik Properti</th>
                                        <th className="pb-3">Status</th>
                                        <th className="pb-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties?.map((property) => (
                                        <tr key={property.id} className="border-b">
                                            <td className="py-3">{property.name}</td>
                                            <td className="py-3">{property.type}</td>
                                            <td className="py-3">{property.owner_name}</td>
                                            <td className="py-3">
                                                <span className={`px-2 py-1 rounded-full text-sm ${
                                                    property.status === 'Disetujui' ? 'bg-green-500 text-white' : 
                                                    property.status === 'Diproses' ? 'bg-yellow-500 text-white' :
                                                    property.status === 'Ditolak' ? 'bg-red-500 text-white' : 
                                                    'bg-red-800 text-red-800'
                                                }`}>
                                                    {property.status}
                                                </span>
                                            </td>
                                            <td className="py-3 flex space-x-2">
                                                <td className="py-3 flex space-x-2">
                                                    <button className="p-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition">
                                                        <Edit className="w-5 h-5" />
                                                    </button>
                                                    <button className="p-2 text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition">
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminProperti;