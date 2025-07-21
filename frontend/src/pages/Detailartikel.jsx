import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../constant/constant";
import { useSelector } from "react-redux";

const MAX_LENGTH = 500;

const DetailArtikel = () => {
  const { id } = useParams();
  const [artikel, setArtikel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFull, setShowFull] = useState(false);
  const [artikelTerbaru, setArtikelTerbaru] = useState([]);
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

    // Ambil 3 artikel terbaru
    const fetchArtikelTerbaru = async () => {
      try {
        const res = await axios.get(API.GET_ADMIN_ARTIKEL, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setArtikelTerbaru(res.data.data.slice(0, 3));
      } catch (err) {
        setArtikelTerbaru([]);
      }
    };

    fetchArtikel();
    fetchArtikelTerbaru();
  }, [id, auth, navigate]);

  if (loading) return <div>Memuat data...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
  if (!artikel) return <div>Loading...</div>;

  const tanggal = new Date(artikel.created_at).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getIsiPendek = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    if (text.length > MAX_LENGTH) {
      return text.substring(0, MAX_LENGTH) + "...";
    }
    return text;
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
        {/* KONTEN ARTIKEL */}
        <div className="flex-1 min-w-0">
          {/* Gambar Header */}
          <div
            className="w-full h-64 md:h-80 rounded-xl bg-gray-200 mb-4"
            style={{
              backgroundImage: `url(${artikel.gambar || "/wisata-madura-3.png"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          {/* Judul & Info */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{artikel.judul}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
              <span>Penulis: <span className="font-semibold text-gray-700">{artikel.penulis || "Admin"}</span></span>
              <span>Kategori: {artikel.kategori}</span>
              <span>Lokasi: {artikel.location}</span>
              <span>Tanggal: {tanggal}</span>
            </div>
            <hr className="mb-4" />
            {/* Isi Artikel */}
            <div className="prose max-w-full text-justify text-base md:text-lg break-words overflow-x-auto">
              {!showFull ? (
                <>
                  <div
                    dangerouslySetInnerHTML={{ __html: getIsiPendek(artikel.isi) }}
                  />
                  {artikel.isi && (artikel.isi.length > MAX_LENGTH) && (
                    <button
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      onClick={() => setShowFull(true)}
                    >
                      Lihat Selengkapnya
                    </button>
                  )}
                </>
              ) : (
                <>
                  <div
                    dangerouslySetInnerHTML={{ __html: artikel.isi }}
                  />
                  <button
                    className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                    onClick={() => setShowFull(false)}
                  >
                    Tampilkan Lebih Sedikit
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {/* SIDEBAR ARTIKEL TERBARU */}
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Artikel Terbaru</h2>
            <div className="flex flex-col gap-4">
              {artikelTerbaru.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 items-center p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition"
                  onClick={() => navigate(`/detail-artikel/${item.id}`)}
                >
                  <img
                    src={item.gambar || "/wisata-madura-3.png"}
                    alt={item.judul}
                    className="w-14 h-14 object-cover rounded-md border"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 text-sm line-clamp-2">{item.judul}</div>
                    <div className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString("id-ID")}</div>
                  </div>
                </div>
              ))}
              {artikelTerbaru.length === 0 && (
                <div className="text-gray-400 text-sm text-center">Tidak ada artikel terbaru.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailArtikel;
