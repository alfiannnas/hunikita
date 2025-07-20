import React from 'react'
import { Input } from './Input'

const Artikel = ({ search, setSearch }) => {
  return (
    <div className="flex items-center">
      <Input
        type="text"
        name="search"
        placeholder="Ketik sesuatu..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="h-[40px] bg-gray-200"
      />
      <img
        src="/search-artikel.png"
        alt=""
        className="h-[25px] w-[25px] ml-2"
      />
    </div>
  )
}

export default Artikel