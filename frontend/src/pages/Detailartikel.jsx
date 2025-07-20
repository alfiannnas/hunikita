import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Populer from "../components/Populer";
import Populer2 from "../components/Populercopy";
import Populer3 from "../components/Populercopy2";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../constant/constant";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DetailArtikel = () => {
  const { id } = useParams();
  const [artikel, setArtikel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || !auth.token) {
      navigate('/login');
      return;
    }
    const fetchArtikel = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `${API.GET_ADMIN_ARTIKEL_BY_ID}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setArtikel(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Token tidak valid, silakan login ulang.");
          setTimeout(() => navigate('/login'), 1500);
        } else {
          setError("Gagal fetch artikel.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchArtikel();
  }, [id, auth, navigate]);

  if (loading) {
    return <div>Memuat data...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (!artikel) {
    return <div>Loading...</div>;
  }

  const backgroundImageUrl = "/wisata-madura-3.png";
  const style = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div>
      <Navbar />
      <div className="relative">
        <div className="w-full h-[483px]" style={{
          backgroundImage: `url(${artikel.gambar || "/wisata-madura-3.png"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}></div>
        <div className="w-[1022px] h-[2000px] bg-[#EEEADF] flex flex-col absolute -mt-[150px]">
          <h1 className='text-[50px] text-["Poppins"] font-bold ml-[81px] mt-[61px]'>
            {artikel.judul}
          </h1>
          <p className='text-[20px] text-["Poppins"] font-bold mt-[10px] ml-[81px]'>
            Admin: {artikel.penulis || "Admin"}
          </p>
          <p className="text-[12px] ml-[81px]">{artikel.lokasi}, {artikel.tanggal}</p>
          <div className="flex">
            <div className="flex flex-col mt-[50px] ml-[81px]">
              <p className='text-[18px] text-["Poppins"] font-bold w-[90px]'>
                Ikuti kami
              </p>
              <div className="flex gap-1">
                <img src="/instagram.png" alt="" />
                <img src="/facebook.png" alt="" />
                <img src="/pinterest.png" alt="" />
              </div>
            </div>
            <div className="absolute">
              <div className="h-[1px] w-[938.002px] bg-[#7E6D6D4D] mt-[26px] ml-[84px]"></div>
              <p className='w-[690px] text-[18px] text-["Montserrat"] text-justify leading-[28px] ml-[253px] mt-[24px]'>
                Sebagai seorang anak kos, liburan dan rekreasi mungkin terasa
                sulit dilakukan karena keterbatasan anggaran dan waktu. Namun,
                jangan khawatir! Ada banyak cara untuk mengeksplorasi kota
                tempat Anda tinggal tanpa harus merogoh kocek terlalu dalam.
                Dalam artikel ini, kami akan memberikan beberapa ide wisata yang
                ramah anggaran dan cocok untuk anak kos.
              </p>
              <div className="h-[1px] w-[769px] bg-[#7E6D6D4D] ml-[253px] mt-[24px]"></div>
              <p className='text-["Poppins"] text-[18px] font-semibold ml-[253px] mt-[24px]'>
                1. Taman Kota
              </p>
              <img
                src="/image-artikel-1.png"
                alt=""
                className="ml-[253px] mt-[15px]"
              />
              <p className='w-[690px] text-[18px] text-["Montserrat"] text-justify leading-[28px] ml-[253px] mt-[15px]'>
                Taman kota seringkali merupakan tempat yang tepat untuk
                bersantai tanpa harus mengeluarkan banyak uang. Anda dapat
                membawa bekal makan siang, membawa buku favorit, atau hanya
                duduk di bawah pohon sambil menikmati cuaca yang baik. Beberapa
                taman juga sering mengadakan acara-acara seru, seperti konser
                gratis atau pameran seni.
              </p>
              <p className='text-["Poppins"] text-[18px] font-semibold ml-[253px] mt-[15px]'>
                2. Museum
              </p>
              <img
                src="/image-artikel-2.png"
                alt=""
                className="ml-[253px] mt-[15px]"
              />
              <p className='w-[690px] text-[18px] text-["Montserrat"] text-justify leading-[28px] ml-[253px] mt-[15px]'>
                Banyak museum dan galeri seni menawarkan harga tiket khusus
                untuk pelajar, termasuk anak kos. Ini adalah cara yang bagus
                untuk memperluas pengetahuan Anda dan menghargai seni dan budaya
                lokal. Jika Anda tinggal di kota besar, pastikan untuk mencari
                museum yang menawarkan hari tertentu dengan harga tiket murah
                atau bahkan gratis.
              </p>
              <p className='text-["Poppins"] text-[18px] font-semibold ml-[253px] mt-[15px]'>
                3. Wisata Sejarah
              </p>
              <img
                src="/image-artikel-3.png"
                alt=""
                className="ml-[253px] mt-[15px]"
              />
              <p className='w-[690px] text-[18px] text-["Montserrat"] text-justify leading-[28px] ml-[253px] mt-[15px]'>
                Banyak museum dan galeri seni menawarkan harga tiket khusus
                untuk pelajar, termasuk anak kos. Ini adalah cara yang bagus
                untuk memperluas pengetahuan Anda dan menghargai seni dan budaya
                lokal. Jika Anda tinggal di kota besar, pastikan untuk mencari
                museum yang menawarkan hari tertentu dengan harga tiket murah
                atau bahkan gratis.
              </p>
              <div className="h-[1px] w-[769px] bg-[#7E6D6D4D] ml-[253px] mt-[24px]"></div>
              <p className='w-[690px] text-[18px] text-["Montserrat"] text-justify leading-[28px] ml-[253px] mt-[24px]'>
                Ingatlah bahwa rekreasi tidak selalu harus mahal. Dengan sedikit
                kreativitas dan eksplorasi, Anda dapat menemukan banyak kegiatan
                seru di kota Anda tanpa perlu merogoh kocek dalam-dalam. Jadi,
                manfaatkan waktu luang Anda untuk menjelajahi dan menikmati
                segala hal yang kota Anda tawarkan.
              </p>
            </div>
          </div>
        </div>
        <div className="w-[300px] ml-[1032px]">
          <h1 className='text-[30px] text-["Poppins"] font-semibold'>
            Artikel Populer
          </h1>
          <div className="flex flex-col gap-8 mt-[20px]">
            <Populer />
            <Populer2 />
            <Populer3 />
          </div>
        </div>
      </div>
      <div className="mt-[900px]">
        <Footer />
      </div>
    </div>
  );
};

export default DetailArtikel;
