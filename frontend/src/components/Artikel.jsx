import React from 'react'

const Artikel = () => {
  return (
    <div className="flex">
      <label className="flex justify-between items-center gap-1">
        <input
          type="text"
          name='search'
          className="w-full bg-gray-200  h-[40px] border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
          placeholder="  Ketik sesuatu..."
        />
        <img src="/search-artikel.png" alt="" className="h-[25px] w-[25px]" />
      </label>
    </div>
  )
}

export default Artikel