import React from 'react'
import { Link } from 'react-router-dom'

const List3 = () => {
  return (
    <div className="w-[954px] h-[219px] flex shadow-xl relative rounded-[20px] mx-auto hover:shadow-2xl">
      <div className="mt-[19px] ml-[26px] mb-[19px]">
        <img src="/kuliner.png" alt="" />
      </div>
      <div className="mt-[19px] ml-[13px] mb-[19px]">
        <p className='text-black text-[22px] text-["Poppins"] font-bold'>
          5 Kuliner Madura buat anak kost!
        </p>
        <p className='text-[14px] text-["Poppins"]'>Admin: Hendra</p>
        <p className='text-[9px] text-["Poppins"]'>11/11/2023</p>
        <p className='text-[13px] text-["Montserrat"] leading-[18px] w-[473px] text-justify mt-[10px]'>
          Sebuah pelarian sederhana di tepi pantai yang memikat, cocok untuk
          mahasiswa kos-kosan yang ingin bersantai dan menyegarkan diri dari
          rutinitas kuliah dan kerja.
        </p>
        <Link to='/detail-artikel'><button className="bg-[#4E97D1] text-white text-[10px] flex justify-center items-center w-[153px] h-[27px] rounded-[5px] underline mt-[15px] ml-[315px]">
          Selengkapnya
        </button></Link>
      </div>
    </div>
  )
}

export default List3