import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { API } from '../constant';
import axios from 'axios';
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { Input } from '../components/Input';
import { Select } from "../components/Select";
import MapComponent from '../components/MapComponent';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const DetailPusatBantuan = () => {
    const [pusatBantuanData, setPusatBantuanData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const auth = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const params = useParams();
    const { id } = useParams();

    useEffect(() => {
        if (!auth || !auth.token) {
            navigate('/login');
            return;
        }
        fetchPusatBantuanById();
        // eslint-disable-next-line
    }, [auth, navigate, id]);

    const fetchPusatBantuanById = async () => {
        try {
            setLoading(true);
            setError(null);
            // Ganti endpoint sesuai backend kamu
            const response = await axios.get(
                `${API.GET_PUSAT_BANTUAN_BY_ID}/${id}`,
                {
                    params: { user_id: auth.id },
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                }
            );
            setPusatBantuanData(response.data.data);
        } catch (error) {
            setError("Gagal mengambil data pusat bantuan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="w-[1148px] mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Detail Pusat Bantuan</h3>
                    </div>
                    {loading ? (
                        <p className="text-center py-4">Memuat data...</p>
                    ) : error ? (
                        <p className="text-red-500 text-center py-4">{error}</p>
                    ) : (
                        <form className="grid grid-cols-1 gap-6 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    value={pusatBantuanData.nama_lengkap || ''}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={pusatBantuanData.email || ''}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tentang
                                </label>
                                <textarea
                                    value={pusatBantuanData.tentang || ''}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 min-h-[100px]"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Pesan
                                </label>
                                <textarea
                                    value={pusatBantuanData.pesan || ''}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 min-h-[100px]"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Jawaban
                                </label>
                                <textarea
                                    value={pusatBantuanData.jawaban && pusatBantuanData.jawaban.trim() !== ''
                                        ? pusatBantuanData.jawaban
                                        : 'Belum ada jawaban dari Admin'}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 min-h-[100px]"
                                    disabled
                                />
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <div className="mt-[50px]">
                <Footer />
            </div>
        </div>
    )
}

export default DetailPusatBantuan