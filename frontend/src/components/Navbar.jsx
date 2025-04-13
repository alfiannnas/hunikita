import { useCallback, useState, useEffect, useRef } from "react";
import { doLogout } from "../store";
import {useSelector, useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import DropdownHover from "./Dropdownhover";
import { User } from "lucide-react";

const Navbar = () => {
  const auth = useSelector((state)=> state.auth)
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <div className="relative mr-5" ref={dropdownRef}>
          <button 
            className="text-white hover:text-gray-200 p-2 flex items-center gap-2"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="text-white">{auth.name}</span>
            <User size={28} />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 top-full">
              <Link 
                to="/pemilik-profile" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Akun Saya
              </Link>
              <button
                onClick={logoutHandler}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          className="cursor-pointer hover:underline mr-5 rounded-[50px] text-[#4E97D1] bg-white text-[20px] font-normal w-[100px]"
        >
          <Link to="/login">
            Login
          </Link>
        </button>
      )}
    </div>
  );
};

export default Navbar;
