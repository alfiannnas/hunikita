import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const List = ({ artikel }) => {
  console.log("DATA ARTIKEL:", artikel);

  if (!artikel || artikel.length === 0) {
    return <div className="text-center text-gray-500">Tidak ada artikel.</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Tambahkan fungsi untuk menghilangkan tag HTML dan membatasi karakter
  const getPreviewText = (htmlString, maxLength = 100) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    if (text.length > maxLength) {
      let trimmed = text.substring(0, maxLength);
      // Cari spasi terakhir, jika tidak ada, pakai substring biasa
      const lastSpace = trimmed.lastIndexOf(" ");
      if (lastSpace > 0) {
        trimmed = trimmed.substring(0, lastSpace);
      }
      return trimmed + "...";
    }
    return text;
  };

  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Hitung index data yang akan ditampilkan
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = artikel.slice(indexOfFirstItem, indexOfLastItem);

  // Hitung jumlah halaman
  const totalPages = Math.ceil(artikel.length / itemsPerPage);

  // Fungsi untuk ganti halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col gap-6">
      {currentItems.map((item) => (
        <div
          key={item.id}
          className="max-w-3xl w-full flex shadow-xl relative rounded-2xl mx-auto hover:shadow-2xl bg-white"
        >
          <div className="w-1/3 flex items-center justify-center p-4">
            <img
              src={item.gambar}
              alt={item.judul}
              className="object-cover w-full h-44 rounded-xl"
            />
          </div>
          <div className="w-2/3 flex flex-col justify-between p-4">
            <div>
              <p className="text-black text-xl font-bold font-poppins">
                {item.judul}
              </p>
              <p className="text-sm text-gray-600 font-poppins">
                Penulis: {item.penulis}
              </p>
              <p className="text-xs text-gray-400 font-poppins">
                {formatDate(item.created_at)}
              </p>
              <p className="text-sm font-montserrat leading-5 text-justify mt-2 w-full max-w-full break-words">
                {getPreviewText(item.isi, 190)}
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <Link to={`/detail-artikel/${item.id}`}>
                <button className="bg-[#4E97D1] text-white text-xs px-4 py-1.5 rounded hover:bg-blue-700 transition">
                  Selengkapnya
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => paginate(idx + 1)}
            className={`px-3 py-1 rounded ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default List