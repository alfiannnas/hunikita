import React from "react";

const CardListKontrakan12 = () => {
  return (
    <>
      <div className="relative w-[376px] h-[313px] hover:shadow-2xl rounded-[20px]">
        <div className="relative w-[376px] h-[188px] top-0 left-0 rounded-[20px]">
          <div className="relative w-[90px] h-[14px] top-[170px] left-[6px] bg-[#d9d9d9] rounded-[20px]" />
          <img
            className="absolute w-[376px] h-[188px] top-0 left-0 object-cover rounded-[20px]"
            alt="Image"
            src="/diet.png"
          />
        </div>
        <div className="absolute w-[370px] h-[113px] top-[200px] left-px">
          <div className="absolute w-[370px] h-[113px] top-0 left-0">
            <div className="absolute w-[372px] h-[65px] top-0 left-0">
              <div className="relative h-[65px]">
                <div className="absolute top-0 left-0 [font-family:'Poppins',Helvetica] font-semibold text-black text-[24px] text-justify tracking-[0] leading-[normal]">
                  5 Tips diet
                </div>
                <div className="absolute w-[339px] h-[30px] top-[35px]">
                  <p className="absolute w-[337px] top-0 left-0 [font-family:'Poppins',Helvetica] font-normal text-[#000000cc] text-[10px] text-justify tracking-[0] leading-[normal]">
                    Berbicara tentang kesehatan dan gizi saat menjadi seorang
                    mahasiswa kos-kosan, kita seringkali dihadapkan pada
                    tantangan untuk mempertahankan pola makan seimbang tanpa
                    menguras dompet. Tapi jangan khawatir!
                  </p>
                </div>
              </div>
            </div>
            <div className="inline-flex flex-col h-[27px] items-center justify-center gap-[10px] p-[10px] absolute top-[86px] left-0 bg-[#4e97d1] rounded-[5px] hover:bg-[#4e86d1] hover:cursor-pointer">
              <button className="relative w-fit mt-[-5.00px] mb-[-3.00px] [font-family:'Poppins',Helvetica] font-semibold text-white text-[10px] text-justify tracking-[0] leading-[normal] hover:underline">
                Baca selengkapnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardListKontrakan12;
