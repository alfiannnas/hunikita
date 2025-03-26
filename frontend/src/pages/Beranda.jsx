import Search from "../components/beranda/Search";
import Footer from "../components/Footer";
import Selengkapnya from "../components/beranda/Selengkapnya";
import Navbar from "../components/Navbar";
import Carousel from "../components/beranda/Carousel";
import Cardkosan1 from "../components/kosan/Cardkosan1";
import Cardkosan2 from "../components/kosan/Cardkosan2";
import Cardkosan3 from "../components/kosan/Cardkosan3";
import CardListKontrakan1 from "../components/kontrakan/CardListKontrakan1";
import CardListKontrakan2 from "../components/kontrakan/CardListKontrakan2";
import CardListKontrakan3 from "../components/kontrakan/CardListKontrakan3";
import CardListKontrakan11 from "../components/beranda/CardListKontrakan11";
import CardListKontrakan12 from "../components/beranda/CardListKontrakan12";
import CardListKontrakan13 from "../components/beranda/CardListKontrakan13";

const Beranda = () => {
  return (
    <div>
        <div>
          <Navbar />
          <Carousel />
          <div className="mt-[-25px]">
            <Search />
          </div>
          <div className="flex flex-col mt-[50px]">
            <h1 className="ml-[80px] font-bold text-[32px]">REKOMENDASI KOS</h1>
            <div className="flex flex-wrap gap-7 justify-center mt-5">
              <Cardkosan1 />
              <Cardkosan2 />
              <Cardkosan3 />
            </div>
            <div className="mt-10">
              <Selengkapnya />
            </div>
            <hr className="w-[1274px] h-[2px] bg-gray-300 mt-[50px] mx-auto" />
          </div>
          <div className="flex flex-col mt-[50px]">
            <h1 className="ml-[80px] font-bold text-[32px]">REKOMENDASI KONTRAKAN</h1>
            <div className="flex flex-wrap gap-7 justify-center mt-5">
              <CardListKontrakan1 />
              <CardListKontrakan2 />
              <CardListKontrakan3 />
            </div>
            <div className="mt-10">
              <Selengkapnya />
            </div>
            <hr className="w-[1274px] h-[2px] bg-gray-300 mt-[50px] mx-auto" />
          </div>
          <div className="flex flex-col mt-[50px]">
            <h1 className="ml-[80px] font-bold text-[32px]">REKOMENDASI ARTIKEL</h1>
            <div className="flex flex-wrap gap-7 justify-center mt-5">
              <CardListKontrakan11 />
              <CardListKontrakan12 />
              <CardListKontrakan13 />
            </div>
            <div className="mt-10">
              <Selengkapnya />
            </div>
          </div>
          <div className="mt-[50px]">
            <Footer />
          </div>
        </div>
    </div>
  );
};

export default Beranda;
