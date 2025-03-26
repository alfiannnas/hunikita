import React from "react";

const Search = () => {
  return (
    <div className="w-[686px] h-[51px] flex items-center relative rounded-[10px] shadow-xl mx-auto bg-white">
      <img src="/logo-map.png" alt="" className="ml-[9px]" />
      <form action="">
        <input
          type="text"
          placeholder="   Ketik nama kontrakan atau lokasi"
          className="w-[480px] bg-white  h-[40px] border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
        />
      </form>
      <button className="w-[93px] h-[31px] bg-[#4E97D1] flex justify-center absolute right-[70px] items-center text-white text-[18px] rounded-[8px]">
        Cari Kos
      </button>
      <div className="absolute w-[22px] h-[24px] left-[634px] hover:cursor-pointer">
        <img
          className="object-cover"
          alt="Download removebg"
          src="https://c.animaapp.com/U4UCsOMi/img/download-removebg-preview-1@2x.png"
        />
      </div>
    </div>
  );
};

export default Search;
