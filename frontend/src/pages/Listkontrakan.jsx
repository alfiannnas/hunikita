import React from 'react'
import Navbar from '../components/Navbar'
import Search from '../components/beranda/Search'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'
import CardListKontrakan1 from '../components/kontrakan/CardListKontrakan1'
import CardListKontrakan2 from '../components/kontrakan/CardListKontrakan2'
import CardListKontrakan3 from '../components/kontrakan/CardListKontrakan3'
import CardListKontrakan4 from '../components/kontrakan/CardListKontrakan4'
import CardListKontrakan5 from '../components/kontrakan/CardListKontrakan5'
import CardListKontrakan6 from '../components/kontrakan/CardListKontrakan6'
import CardListKontrakan7 from '../components/kontrakan/CardListKontrakan7'
import CardListKontrakan8 from '../components/kontrakan/CardListKontrakan8'
import CardListKontrakan9 from '../components/kontrakan/CardListKontrakan9'
import { Link } from 'react-router-dom'

const Listkontrakan = () => {
  return (
    <div>
        <Navbar />
      <div className="mt-[25px] justify-center">
        <Search />
      </div>
      <div className="flex flex-col w-full mt-[30px]">
        <div className="flex flex-wrap gap-7 justify-center mt-[12px]">
          <Link to='/detail-kontrakan'><CardListKontrakan1 /></Link>
          <CardListKontrakan2 />
          <CardListKontrakan3 />
        </div>
      </div>
      <div className="flex flex-col w-full mt-[30px]">
        <div className="flex flex-wrap gap-7 justify-center mt-[12px]">
          <CardListKontrakan4 />
          <CardListKontrakan5 />
          <CardListKontrakan6 />
        </div>
      </div>
      <div className="flex flex-col w-full mt-[30px]">
        <div className="flex flex-wrap gap-7 justify-center mt-[12px]">
          <CardListKontrakan7 />
          <CardListKontrakan8 />
          <CardListKontrakan9 />
        </div>
      </div>
      <div className="mt-[90px]">
        <Pagination />
      </div>
      <div className="mt-[98px]">
        <Footer />
      </div>
    </div>
  )
}

export default Listkontrakan