import Navbar from '../../components/Navbar'
import { useSelector } from 'react-redux'
import Footer from '../../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import axios from "axios";
import { API } from '../../constant'
import { Edit, Eye, Trash2 } from "lucide-react";
import { Alert } from "../../components/Alert";
import { SuccessMessage } from "../../components/SuccessMessage";
import { ModalDropdown } from '../../components/ModalDropdown'

const RiwayatPengajuan = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPengajuanUUID, setSelectedPengajuanUUID] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const itemsPerPage = 8;
  const auth = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [isUpdateStatusOpen, setUpdateStatusOpen] = useState(false);
  const [isOpenUpdateStatusSuccess, setIsOpenUpdateStatusSuccess] = useState(false);
  const [selectedPengajuanStatus, setSelectedPengajuanStatus] = useState('');
  const [statusOptions, setStatusOptions] = useState([]);

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
          propertyId: propertyIds.join(',')
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
  }, [auth.token, auth?.id, properties])

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
    if (selectedPengajuanUUID === null) return;

    try {
      const response = await axios.delete(`${API.DELETE_PROPERTIES_BY_USER}/${selectedPengajuanUUID}`, {
        headers: {
          Authorization: 'Bearer ' + auth.token
        }
      });

      if (response.status === 200) {
        setIsAlertOpen(false);
        setIsOpen(true);
        // Refresh data setelah menghapus
        setData(data.filter(item => item.uuid !== selectedPengajuanUUID));
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

  // Handler update status
  const handleUpdateStatus = async (selectedStatus) => {
    if (!selectedPengajuanUUID) return;
    try {
      const response = await axios.put(
        `${API.UPDATE_STATUS_PENGAJUAN}/${selectedPengajuanUUID}`,
        { status: selectedStatus.value || selectedStatus },
        {
          headers: { Authorization: 'Bearer ' + auth.token }
        }
      );
      if (response.status === 200) {
        setIsOpenUpdateStatusSuccess(true);
        fetchData();
        setUpdateStatusOpen(false);
      }
    } catch (err) {
      console.error("Error updating status:", err);
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
        <h1 className="text-[36px] font-bold">Riwayat Pengajuan</h1>
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
                      <button
                        className="p-2 text-yellow-600 border border-yellow-600 rounded-md hover:bg-yellow-600 hover:text-white transition"
                        onClick={() => {
                          if (
                            item.status === 'Menunggu Persetujuan' ||
                            item.status === 'Lunas (Menunggu Persetujuan)'
                          ) {
                            setSelectedPengajuanUUID(item.uuid);
                            setSelectedPengajuanStatus(item.status);

                            if (item.status === 'Menunggu Persetujuan') {
                              setStatusOptions([{ label: "Disetujui", value: "Disetujui" }]);
                            } else if (item.status === 'Lunas (Menunggu Persetujuan)') {
                              setStatusOptions([{ label: "Pembayaran Disetujui", value: "Pembayaran Disetujui" }]);
                            }

                            setUpdateStatusOpen(true);
                          } else {
                            alert('Status hanya bisa diubah pada tahap Menunggu Persetujuan atau Lunas (Menunggu Persetujuan).');
                          }
                        }}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
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
      <ModalDropdown
        isOpen={isUpdateStatusOpen}
        title="Update Status Persetujuan Penyewa"
        message="Pilih status persetujuan untuk penyewa ini:"
        options={statusOptions}
        onCancel={() => setUpdateStatusOpen(false)}
        onConfirm={handleUpdateStatus}
      />
      <SuccessMessage
        isOpen={isOpenUpdateStatusSuccess}
        onClose={() => setIsOpenUpdateStatusSuccess(false)}
        title="Update Status Sukses"
        message="Status penyewa telah berhasil diupdate!"
        type="success"
      />
    </div>
  )
}

export default RiwayatPengajuan