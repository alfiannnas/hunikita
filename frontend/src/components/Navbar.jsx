import { useCallback } from "react";
import { doLogout } from "../store";
import {useSelector, useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import DropdownHover from "./Dropdownhover";

const Navbar = () => {
  const auth = useSelector((state)=> state.auth)
  const dispatch = useDispatch();
  const logoutHandler = useCallback(() => {
    dispatch(doLogout())
  }, [dispatch])

  return (
    <div className="w-full flex justify-between bg-[#4E97D1] items-center relative">
      <img
        src="/logo-hunikita.png"
        alt="logo-hunikita"
        className="cursor-pointer"
      />
      <div className="relative">
        <ul className="flex text-white font-normal text-[20px] gap-7">
          <Link to="/">
            <li className="hover:text-gray-200 hover:cursor-pointer hover:underline">
              Beranda
            </li>
          </Link>
          <Link to="/tentang-kami">
            <li className="hover:text-gray-200 hover:cursor-pointer hover:underline">
              Tentang Kami
            </li>
          </Link>
          <Link to="/pusat-bantuan">
            <li className="hover:text-gray-200 hover:cursor-pointer hover:underline">
              Pusat Bantuan
            </li>
          </Link>
          <li>
            <DropdownHover />
          </li>
          <Link to="/list-iklan">
            <li className="hover:text-gray-200 hover:cursor-pointer hover:underline">
              Iklan
            </li>
          </Link>
          <Link to="/list-artikel">
            <li className="hover:text-gray-200 hover:cursor-pointer hover:underline">
              Artikel
            </li>
          </Link>
        </ul>
      </div>

      {auth ? (          
        <button onClick={logoutHandler}
        className="cursor-pointer hover:underline mr-5 rounded-[50px] text-[#4E97D1] bg-white text-[20px] font-normal w-[100px]">
          Logout
      </button> ) : (
        <button
        className="cursor-pointer hover:underline mr-5 rounded-[50px] text-[#4E97D1] bg-white text-[20px] font-normal w-[100px]">
          <Link to="/login">
            Login
          </Link>
      </button>
      )}


    </div>
  );
};

export default Navbar;
