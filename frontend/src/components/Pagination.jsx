import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Pastikan totalPages adalah angka positif
  const pages = Math.max(1, totalPages);

  return (
    <div className="flex gap-3 justify-center w-full">
      {/* Tombol Previous */}
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="w-[47px] h-[47px] flex justify-center items-center border-[#4E97D1] border-[2px] rounded-[4px] hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img src="/left-arrow.png" alt="Previous" />
      </button>
      
      {/* Nomor Halaman */}
      {[...Array(pages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`w-[47px] h-[47px] flex justify-center items-center border-[#4E97D1] border-[2px] rounded-[4px] text-[17px] hover:bg-gray-200 ${
            currentPage === index + 1 ? 'bg-[#4E97D1] text-white' : 'text-[#4E97D1]'
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Tombol Next */}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= pages}
        className="w-[47px] h-[47px] flex justify-center items-center border-[#4E97D1] border-[2px] rounded-[4px] hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img src="/right-arrow.png" alt="Next" />
      </button>
    </div>
  );
};

export default Pagination;
