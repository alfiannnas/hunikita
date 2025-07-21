import { useEffect, useState } from "react";
import Search from "../components/beranda/Search";
import Footer from "../components/Footer";
import Selengkapnya from "../components/beranda/Selengkapnya";
import Navbar from "../components/Navbar";
import Carousel from "../components/beranda/Carousel";
import { API } from "../constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Beranda = () => {
  const [kos, setKos] = useState([]);
  const [kontrakan, setKontrakan] = useState([]);
  const [artikel, setArtikel] = useState([]);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch 3 kos terbaru
    const fetchKos = async () => {
      try {
        const res = await axios.get(`${API.GET_PROPERTIES}?property_type_id=1`);
        setKos(res.data.data.slice(0, 3));
      } catch (err) {
        setKos([]);
      }
    };
    // Fetch 3 kontrakan terbaru
    const fetchKontrakan = async () => {
      try {
        const res = await axios.get(`${API.GET_PROPERTIES}?property_type_id=2`);
        setKontrakan(res.data.data.slice(0, 3));
      } catch (err) {
        setKontrakan([]);
      }
    };
    // Fetch 3 artikel terbaru
    const fetchArtikel = async () => {
      try {
        const res = await axios.get(API.GET_ADMIN_ARTIKEL);
        setArtikel(res.data.data.slice(0, 3));
      } catch (err) {
        setArtikel([]);
      }
    };

    fetchKos();
    fetchKontrakan();
    fetchArtikel();
  }, []);

  // Helper format harga
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div>
      <Navbar />
      <Carousel />
      {/* KOS */}
      <div className="flex flex-col mt-[50px]">
        <h1 className="ml-[80px] font-bold text-[32px]">REKOMENDASI KOS</h1>
        <div className="flex flex-wrap gap-7 justify-center mt-5">
          {kos.map((item) => (
            <div
              key={item.id}
              className="relative w-[376px] h-[313px] hover:shadow-2xl rounded-[20px] cursor-pointer"
              onClick={() => {
                if (!auth || !auth.token) {
                  navigate('/login');
                } else {
                  navigate(`/detail-properti/${item.id}`);
                }
              }}
            >
              <div className="relative w-[376px] h-[188px] rounded-[20px]">
                <img
                  className="absolute w-[376px] h-[188px] top-0 left-0 object-cover rounded-[20px]"
                  alt={item.name}
                  src={item.foto_properti}
                />
                <div className="flex w-[108px] h-[28px] absolute top-[155px] left-[6px] bg-[#d40707] flex-col items-center justify-center gap-[10px] p-[10px] rounded-[5px]">
                  <p className="relative w-fit mt-[-10.50px] mb-[-8.50px] ml-[-5.50px] mr-[-5.50px] font-semibold text-white text-[7px] text-justify tracking-[0] leading-[normal]">
                    <span className="font-semibold text-white text-[7px] tracking-[0]">
                      Mulai
                      <br />
                    </span>
                    <span className="text-[10px]">{formatPrice(item.harga)} / Bulan</span>
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-[10px] p-[10px] absolute top-[162px] left-[120px] bg-[#108006] rounded-[4px]">
                  <div className="relative w-fit mt-[-8.00px] mb-[-6.00px] ml-[-1.00px] mr-[-1.00px] font-semibold text-white text-[10px] text-justify tracking-[0] leading-[normal]">
                    {item.status_sewa}
                  </div>
                </div>
              </div>
              <div className="absolute w-[370px] h-[113px] top-[200px] left-px">
                <div className="absolute w-[370px] h-[113px] top-0 left-0">
                  <div className="absolute w-[372px] h-[65px] top-0 left-0">
                    <div className="relative h-[65px]">
                      <div className="absolute top-0 left-0 font-semibold text-black text-[24px] text-justify tracking-[0] leading-[normal]">
                        {item.name}
                      </div>
                      <img
                        className="w-[27px] h-[29px] top-[34px] left-[2px] absolute object-cover"
                        alt="Location"
                        src="/logo-map.png"
                      />
                      <div className="absolute w-[339px] h-[30px] top-[35px] left-[33px]">
                        <p className="absolute w-[337px] top-0 left-0 font-normal text-[#000000cc] text-[10px] text-justify tracking-[0] leading-[normal]">
                          {item.address}, {item.subdistrict}, {item.village}, {item.city}, {item.province}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex flex-col h-[27px] items-center justify-center gap-[10px] p-[10px] absolute top-[86px] left-0 bg-[#4e97d1] rounded-[5px] hover:bg-[#4e86d1] hover:cursor-pointer">
                    <div
                      className="relative w-fit mt-[-5.00px] mb-[-3.00px] font-semibold text-white text-[10px] text-justify tracking-[0] leading-[normal] hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!auth || !auth.token) {
                          navigate('/login');
                        } else {
                          navigate(`/detail-properti/${item.id}`);
                        }
                      }}
                    >
                      Baca selengkapnya
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Selengkapnya to="/list-kosan" />
        </div>
        <hr className="w-[1274px] h-[2px] bg-gray-300 mt-[50px] mx-auto" />
      </div>
      {/* KONTRAKAN */}
      <div className="flex flex-col mt-[50px]">
        <h1 className="ml-[80px] font-bold text-[32px]">REKOMENDASI KONTRAKAN</h1>
        <div className="flex flex-wrap gap-7 justify-center mt-5">
          {kontrakan.map((item) => (
            <div
              key={item.id}
              className="relative w-[376px] h-[313px] hover:shadow-2xl rounded-[20px] cursor-pointer"
              onClick={() => {
                if (!auth || !auth.token) {
                  navigate('/login');
                } else {
                  navigate(`/detail-properti/${item.id}`);
                }
              }}
            >
              <div className="relative w-[376px] h-[188px] rounded-[20px]">
                <img
                  className="absolute w-[376px] h-[188px] top-0 left-0 object-cover rounded-[20px]"
                  alt={item.name}
                  src={item.foto_properti}
                />
                <div className="flex w-[108px] h-[28px] absolute top-[155px] left-[6px] bg-[#d40707] flex-col items-center justify-center gap-[10px] p-[10px] rounded-[5px]">
                  <p className="relative w-fit mt-[-10.50px] mb-[-8.50px] ml-[-5.50px] mr-[-5.50px] font-semibold text-white text-[7px] text-justify tracking-[0] leading-[normal]">
                    <span className="font-semibold text-white text-[7px] tracking-[0]">
                      Mulai
                      <br />
                    </span>
                    <span className="text-[10px]">{formatPrice(item.harga)} / Bulan</span>
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-[10px] p-[10px] absolute top-[162px] left-[120px] bg-[#108006] rounded-[4px]">
                  <div className="relative w-fit mt-[-8.00px] mb-[-6.00px] ml-[-1.00px] mr-[-1.00px] font-semibold text-white text-[10px] text-justify tracking-[0] leading-[normal]">
                    {item.status_sewa}
                  </div>
                </div>
              </div>
              <div className="absolute w-[370px] h-[113px] top-[200px] left-px">
                <div className="absolute w-[370px] h-[113px] top-0 left-0">
                  <div className="absolute w-[372px] h-[65px] top-0 left-0">
                    <div className="relative h-[65px]">
                      <div className="absolute top-0 left-0 font-semibold text-black text-[24px] text-justify tracking-[0] leading-[normal]">
                        {item.name}
                      </div>
                      <img
                        className="w-[27px] h-[29px] top-[34px] left-[2px] absolute object-cover"
                        alt="Location"
                        src="/logo-map.png"
                      />
                      <div className="absolute w-[339px] h-[30px] top-[35px] left-[33px]">
                        <p className="absolute w-[337px] top-0 left-0 font-normal text-[#000000cc] text-[10px] text-justify tracking-[0] leading-[normal]">
                          {item.address}, {item.subdistrict}, {item.village}, {item.city}, {item.province}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex flex-col h-[27px] items-center justify-center gap-[10px] p-[10px] absolute top-[86px] left-0 bg-[#4e97d1] rounded-[5px] hover:bg-[#4e86d1] hover:cursor-pointer">
                    <div
                      className="relative w-fit mt-[-5.00px] mb-[-3.00px] font-semibold text-white text-[10px] text-justify tracking-[0] leading-[normal] hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!auth || !auth.token) {
                          navigate('/login');
                        } else {
                          navigate(`/detail-properti/${item.id}`);
                        }
                      }}
                    >
                      Baca selengkapnya
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Selengkapnya to="/list-kontrakan" />
        </div>
        <hr className="w-[1274px] h-[2px] bg-gray-300 mt-[50px] mx-auto" />
      </div>
      {/* ARTIKEL */}
      <div className="flex flex-col mt-[50px]">
        <h1 className="ml-[80px] font-bold text-[32px]">REKOMENDASI ARTIKEL</h1>
        <div className="flex flex-wrap gap-7 justify-center mt-5">
          {artikel.map((item) => (
            <div
              key={item.id}
              className="w-[350px] h-[370px] bg-white rounded-2xl shadow-md hover:shadow-xl cursor-pointer flex flex-col transition-all duration-200 border border-transparent hover:border-blue-400"
              onClick={() => {
                if (!auth || !auth.token) {
                  navigate('/login');
                } else {
                  navigate(`/detail-artikel/${item.id}`);
                }
              }}
            >
              <div className="relative">
                <img
                  className="w-full h-[170px] object-cover rounded-t-2xl"
                  alt={item.judul}
                  src={item.gambar || "/wisata-madura-3.png"}
                />
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
                  {item.kategori}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="font-bold text-lg mb-1 line-clamp-2">{item.judul}</div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span className="font-semibold text-blue-700">{item.penulis}</span>
                  <span>•</span>
                  <span>{new Date(item.created_at).toLocaleDateString("id-ID")}</span>
                </div>
                <div className="text-sm text-gray-700 line-clamp-2 flex-1 mb-2">
                  {/* Cuplikan isi artikel, jika ada */}
                  {item.isi && (() => {
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = item.isi;
                    return tempDiv.textContent?.slice(0, 100) + (tempDiv.textContent?.length > 100 ? "..." : "");
                  })()}
                </div>
                <div className="mt-auto">
                  <span
                    className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-100 transition"
                    onClick={(e) => {
                      e.stopPropagation(); // Supaya tidak double trigger
                      if (!auth || !auth.token) {
                        navigate('/login');
                      } else {
                        navigate(`/detail-artikel/${item.id}`);
                      }
                    }}
                  >
                    Baca selengkapnya →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Selengkapnya to="/list-artikel" />
        </div>
      </div>
      <div className="mt-[50px]">
        <Footer />
      </div>
    </div>
  );
};

export default Beranda;
