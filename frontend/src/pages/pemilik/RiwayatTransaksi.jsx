import Navbar from '../../components/Navbar'
import { useSelector } from 'react-redux'
import Footer from '../../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import axios from "axios";
import { API } from '../../constant'
import { Edit, Trash2 } from "lucide-react";
import { Alert } from "../../components/Alert";
import { SuccessMessage } from "../../components/SuccessMessage";

const RiwayatTransaksi = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [idProperty, setIdProperty] = useState(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const itemsPerPage = 8;
    const auth = useSelector((state) => state.auth)
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    console.log(API.GET_PROPERTIES_BY_USER)
    const fetchData = useCallback(() => {
        const userId = auth?.id;
        const propertyIds = properties.map(p => p.id);

        if (!userId) {
            console.error("User ID tidak tersedia");
            return;
        }

        axios
            .get(API.GET_PENGAJUAN, {
                params: {
                    userId: userId,
                    propertyId: propertyIds.join(','),
                    transaction: 'Y'
                },
                headers: {
                    Authorization: 'Bearer ' + auth.token
                }
            })
            .then((res) => {
                if (res.status === 200 && res.data.data) {
                    setData(res.data.data);
                } else {
                    setData([]);
                }
            })
            .catch((err) => {
                console.error("Error fetching pengajuan:", err);
                setData([]);
                if (err.response?.status === 400) {
                    alert(err.response.data.detail)
                } else {
                    alert("Server Error! Coba lagi beberapa saat")
                }
            });
    }, [auth.token, auth?.id, properties]);

    useEffect(() => {
        if (!auth) {
            navigate('/login');
        }
    }, [auth, navigate]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await axios.get(API.GET_PROPERTIES_BY_USER, {
                    params: { userId: auth?.id },
                    headers: { Authorization: 'Bearer ' + auth.token }
                });
                setProperties(res.data.data || []);
            } catch (err) {
                setProperties([]);
            }
        };
        if (auth?.id) fetchProperties();
    }, [auth]);

    // Tambahkan useEffect baru untuk fetch pengajuan setelah properties didapat
    useEffect(() => {
        if (properties.length > 0) {
            fetchData();
        }
        // eslint-disable-next-line
    }, [properties]);

    // Hitung total halaman
    const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

    // Data yang ditampilkan berdasarkan halaman
    const displayedProperties = data?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) || [];

    // Fungsi untuk navigasi halaman
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleDelete = async () => {
        if (idProperty === null) return;

        try {
            const response = await axios.delete(`${API.DELETE_PROPERTIES_BY_USER}/${idProperty}`, {
                headers: {
                    Authorization: 'Bearer ' + auth.token
                }
            });

            if (response.status === 200) {
                setIsAlertOpen(false);
                setIsOpen(true);
                // Refresh data setelah menghapus
                setData(data.filter(item => item.id !== idProperty));
            }
        } catch (err) {
            console.error("Error deleting property:", err);
            if (err.response?.status === 400) {
                alert(err.response.data.detail)
            } else {
                alert("Server Error! Coba lagi beberapa saat")
            }
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <div className="gap-4 ml-[36px] mt-[44px]">
                <h1 className="text-[36px] font-bold">Riwayat Transaksi</h1>
            </div>

            {/* Tabel Properti */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 mx-[36px] flex-grow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Daftar Pengajuan</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-gray-500 border-b">
                                <th className="pb-3">Invoice No.</th>
                                <th className="pb-3">Nama Penyewa</th>
                                <th className="pb-3">Nama Properti</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedProperties.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-6 text-gray-500">
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                displayedProperties.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-3">{item.invoice_number}</td>
                                        <td className="py-3">{item.user_name}</td>
                                        <td className="py-3">{item.property_name}</td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded-full text-sm ${item.status === 'Lunas' || item.status === 'Pembayaran Disetujui'
                                                ? 'bg-green-500 text-white'
                                                : item.status === 'Disetujui'
                                                    ? 'bg-blue-500 text-white'
                                                    : item.status === 'Menunggu Persetujuan' || item.status === 'Lunas (Menunggu Persetujuan)'
                                                        ? 'bg-yellow-500 text-white'
                                                        : item.status === 'Ditolak'
                                                            ? 'bg-red-500 text-white'
                                                            : 'bg-gray-500 text-white'
                                                }`}>
                                                {item.status || 'Diproses'}
                                            </span>
                                        </td>
                                        <td className="py-3 flex space-x-2">
                                            <Link
                                                to={`/pemilik-detail-sewa/${item.uuid}`}
                                                className="p-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {displayedProperties.length > 0 && (
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            <Footer />

            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                style={{ display: isAlertOpen || isOpen ? 'flex' : 'none' }}>
                <Alert
                    isOpen={isAlertOpen}
                    title="Hapus"
                    message="Apakah anda yakin ingin menghapus pengajuan ini?"
                    onCancel={() => setIsAlertOpen(false)}
                    onConfirm={handleDelete}
                />

                <SuccessMessage
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Hapus Sukses"
                    message="Data pengajuan telah berhasil dihapus!"
                    type="delete"
                />
            </div>
        </div>
    )
}

export default RiwayatTransaksi