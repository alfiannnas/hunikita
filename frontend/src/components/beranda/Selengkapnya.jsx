import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Selengkapnya = ({ to }) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const handleClick = () => {
    if (!auth || !auth.token) {
      navigate('/login');
    } else {
      navigate(to);
    }
  };

  return (
    <div className="w-full">
      <button
        className="w-[200px] mx-auto h-[30px] rounded-[10px] justify-center items-center p-0 flex bg-[#4E97D1] text-white underline text-[16px]"
        onClick={handleClick}
      >
        Selengkapnya
      </button>
    </div>
  );
};

export default Selengkapnya;
