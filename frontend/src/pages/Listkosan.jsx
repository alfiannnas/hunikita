import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Search from '../components/beranda/Search'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'
import Cardkosan1 from '../components/kosan/Cardkosan1'
import Cardkosan2 from '../components/kosan/Cardkosan2'
import Cardkosan3 from '../components/kosan/Cardkosan3'
import Cardkosan4 from '../components/kosan/Cardkosan4'
import Cardkosan5 from '../components/kosan/Cardkosan5'
import Cardkosan6 from '../components/kosan/Cardkosan6'
import Cardkosan7 from '../components/kosan/Cardkosan7'
import Cardkosan8 from '../components/kosan/Cardkosan8'
import Cardkosan9 from '../components/kosan/Cardkosan9'
import { API } from '../../src/constant'
import { Link } from 'react-router-dom'

const Listkosan = () => {
  const [properties, setProperties] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 8 // Jumlah item per halaman
  const navigate = useNavigate()

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${API.GET_PROPERTIES}?property_type_id=1`)
      const data = response.data.data
      setProperties(data)
      // Hitung total halaman
      const total = Math.ceil(data.length / itemsPerPage)
      setTotalPages(total)
      console.log('Total pages:', total) // Debugging
    } catch (error) {
      console.error("Error fetching properties:", error)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  // Fungsi untuk mendapatkan data yang akan ditampilkan pada halaman saat ini
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return properties.slice(startIndex, endIndex)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="mt-[25px] justify-center">
        <Search />
      </div>
      <div className="flex flex-col w-full flex-grow">
        <div className="flex flex-wrap gap-7 justify-center items-center min-h-[60vh] mt-[50px]">
          {properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full">
              <p className="text-xl font-semibold text-gray-600 text-center">
                Maaf, Saat ini tidak ada Kos/Kontrakan yang tersedia
              </p>
            </div>
          ) : (
            getCurrentPageData().map((property) => (
              <div key={property.id} className="relative w-[376px] h-[313px] hover:shadow-2xl rounded-[20px]">
                <div className="relative w-[376px] h-[188px] top-0 left-0 rounded-[20px]">
                  <div className="relative w-[90px] h-[14px] top-[170px] left-[6px] bg-[#d9d9d9] rounded-[20px]" />
                  <img
                    className="absolute w-[376px] h-[188px] top-0 left-0 object-cover rounded-[20px]"
                    alt={property.name}
                    src={property.foto_properti}
                  />
                  <div className="flex w-[108px] h-[28px] absolute top-[155px] left-[6px] bg-[#d40707] flex-col items-center justify-center gap-[10px] p-[10px] rounded-[5px]">
                    <p className="relative w-fit mt-[-10.50px] mb-[-8.50px] ml-[-5.50px] mr-[-5.50px] [font-family:'Poppins',Helvetica] font-semibold text-white text-[7px] text-justify tracking-[0] leading-[normal]">
                      <span className="[font-family:'Poppins',Helvetica] font-semibold text-white text-[7px] tracking-[0]">
                        Mulai
                        <br />
                      </span>
                      <span className="text-[10px]">{formatPrice(property.harga)} / Bulan</span>
                    </p>
                  </div>
                  <div className="flex flex-col w-[62px] h-[21px] items-center justify-center gap-[10px] p-[10px] absolute top-[162px] left-[120px] bg-[#108006] rounded-[4px]">
                    <div className="relative w-fit mt-[-8.00px] mb-[-6.00px] ml-[-1.00px] mr-[-1.00px] [font-family:'Poppins',Helvetica] font-semibold text-white text-[10px] text-justify tracking-[0] leading-[normal]">
                      {property.status_sewa}
                    </div>
                  </div>
                </div>
                <div className="absolute w-[370px] h-[113px] top-[200px] left-px">
                  <div className="absolute w-[370px] h-[113px] top-0 left-0">
                    <div className="absolute w-[372px] h-[65px] top-0 left-0">
                      <div className="relative h-[65px]">
                        <div className="absolute top-0 left-0 [font-family:'Poppins',Helvetica] font-semibold text-black text-[24px] text-justify tracking-[0] leading-[normal]">
                          {property.name}
                        </div>
                        <img
                          className="w-[27px] h-[29px] top-[34px] left-[2px] absolute object-cover"
                          alt="Location"
                          src="/logo-map.png"
                        />
                        <div className="absolute w-[339px] h-[30px] top-[35px] left-[33px]">
                          <p className="absolute w-[337px] top-0 left-0 [font-family:'Poppins',Helvetica] font-normal text-[#000000cc] text-[10px] text-justify tracking-[0] leading-[normal]">
                            {property.address}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link to={`/detail-kosan/${property.id}`} className="inline-flex flex-col h-[27px] items-center justify-center gap-[10px] p-[10px] absolute top-[86px] left-0 bg-[#4e97d1] rounded-[5px] hover:bg-[#4e86d1] hover:cursor-pointer">
                      <div className="relative w-fit mt-[-5.00px] mb-[-3.00px] [font-family:'Poppins',Helvetica] font-semibold text-white text-[10px] text-justify tracking-[0] leading-[normal] hover:underline">
                        Baca selengkapnya
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Pagination - pastikan props dikirim dengan benar */}
        {properties.length > 0 && totalPages > 0 && (
          <div className="mt-[50px]">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
      <div className="mt-[50px]">
        <Footer />
      </div>
    </div>
  )
}

export default Listkosan