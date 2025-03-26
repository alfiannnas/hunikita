import Navbar from '../components/Navbar'
import Search from '../components/beranda/Search'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'
import Cardkosan1 from '../components/kosan/Cardkosan1'
import Cardkosan2 from '../components/kosan/Cardkosan2'
import Cardkosan3 from '../components/kosan/Cardkosan3'
import Cardkosan4 from '../components/kosan/Cardkosan4'
import Cardkosan5 from '../components/kosan/Cardkosan5'
import Cardkosan6 from '../components/kosan/Cardkosan6'
import Cardkosan7 from '../components/kosan/Cardkosan7'
import Cardkosan8 from '../components/kosan/Cardkosan8'
import Cardkosan9 from '../components/kosan/Cardkosan9'
import { Link } from 'react-router-dom'

const Listkosan = () => {
  return (
    <div>
        <Navbar />
      <div className="mt-[25px] justify-center">
        <Search />
      </div>
      <div className="flex flex-col w-full mt-[30px]">
        <div className="flex flex-wrap gap-7 justify-center mt-[12px]">
          <Link to='/detail-kosan'><Cardkosan1 /></Link>
          <Cardkosan2 />
          <Cardkosan3 />
        </div>
      </div>
      <div className="flex flex-col w-full mt-[30px]">
        <div className="flex flex-wrap gap-7 justify-center mt-[12px]">
          <Cardkosan4 />
          <Cardkosan5 />
          <Cardkosan6 />
        </div>
      </div>
      <div className="flex flex-col w-full mt-[30px]">
        <div className="flex flex-wrap gap-7 justify-center mt-[12px]">
          <Cardkosan7 />
          <Cardkosan8 />
          <Cardkosan9 />
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

export default Listkosan