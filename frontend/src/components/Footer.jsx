import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-[#4E97D1] flex flex-col justify-between relative">
      <div className="flex justify-between relative mt-[33px] px-8">
        <div className="flex items-start gap-8">
          <img src="/logo-hunikita.png" alt="" className="cursor-pointer w-[150px]" />
          <p className="w-[294px] text-white cursor-default">
            huniKita merupakan sebuah situs yang dibuat untuk menyediakan
            kebutuhan akomodasi anda, berupa kos-kosan dan kontrakan.
          </p>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col">
            <h1 className="text-[21px] text-white cursor-default font-bold">
              Navigasi
            </h1>
            <ul>
              <li className="text-[16px] text-white hover:text-gray-200 hover:underline hover:cursor-pointer ">
                Beranda
              </li>
              <li className="text-[16px] text-white hover:text-gray-200 hover:underline hover:cursor-pointer">
                Tentang Kami
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[21px] text-white cursor-default font-bold">
              Bantuan & Dukungan
            </h1>
            <ul>
              <li className="text-[16px] text-white hover:text-gray-200 hover:underline hover:cursor-pointer">
                Pusat Bantuan
              </li>
              <li className="text-[16px] text-white hover:text-gray-200 hover:underline hover:cursor-pointer">
                FAQ
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[21px] text-white cursor-default font-bold">
              Hubungi Kami
            </h1>
            <ul className="mt-2 space-y-2">
              <li className="text-[16px] text-white hover:text-gray-200 hover:underline hover:cursor-pointer">
                Jalan Singosari Timur , Semarang, Jawa Tengah, 50252, Indonesia
              </li>
              <li className="text-[16px] text-white hover:text-gray-200 hover:underline hover:cursor-pointer">
                0895634900601 (Quick Response)
              </li>
              <li className="text-[16px] text-white hover:text-gray-200 hover:underline hover:cursor-pointer">
                hunikita@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-0 border-solid border-[2px] bg-white my-5"></div>
      <div className="flex justify-between relative px-5 mb-5">
        <p className="text-white text-[16px]">
          Copyright 2025 all rights reserved | Ruth Fiona Ayu S | Universitas AKI Semarang | Sistem Informasi
        </p>
      </div>
    </div>
  );
};

export default Footer;
