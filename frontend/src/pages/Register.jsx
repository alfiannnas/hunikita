import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { API } from "../constant";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth )

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(API.REGISTER, values)
      .then((res) => {
        if (res.status === 201) {
          navigate("/login");
        } 
      })
      .catch((err) => {
        if (err.response.status == 400) {
          alert(err.response.data.detail)
        } else {
          alert("Server Error! Coba lagi beberapa saat")
        }
    });
  };

  return (
    <div className="w-full h-screen flex item-start">
      <div className="w-1/2 h-full bg-[#FFFFFF] flex flex-col p-5 justify-between font-Poppins">
        <div className="bg-white w-full px-6">
          <div className="w-full h-full">
            <h1 className="text-xl md:text-2xl text-blue-500 font-bold leading-tight mt-2">
              Daftar
            </h1>

            <form className="mt-9" onSubmit={handleSubmit}>
              <div>
                <label className="font-semibold block text-gray-700">
                  Nama
                </label>
                <input
                  type="text"
                  name="nama"
                  placeholder="Masukkan nama"
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  className="w-full px-1.5 py-1.5 bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
                />
              </div>

              <div className="mt-2">
                <label className="font-semibold block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Masukkan email"
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  className="w-full px-1.5 py-1.5 bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
                />
              </div>

              <div className="mt-2">
                <label className="font-semibold block text-gray-700">
                  Sandi
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Masukkan sandi"
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  className="w-full px-1.5 py-1.5 bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
                />
              </div>

              <button
                className="w-full block bg-blue-500 hover:bg-blue-400 px-1.5 py-1.5 mt-5 rounded-lg font-semibold text-white font-Poppins focus:bg-blue-400 focus:outline-none"
                type="submit"
              >
                Daftar
              </button>
            </form>

            <div className="flex gap-2 justify-center mt-[10px]">
              <p>Sudah punya akun?</p>
              <Link to="/login">
                <p className="text-blue-500">Login</p>
              </Link>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-center gap-1">
                Dengan login kamu menyetujui
                <Link to="/syaratketentuan">
                  <p className="text-blue-500 hover:text-blue-700">
                    {" "}
                    Syarat & Ketentuan{" "}
                  </p>
                </Link>
                <p> dan</p>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Link to="/kebijakanprivasi">
                  <p className="text-blue-500 hover:text-blue-700">
                    {" "}
                    Kebijakan Privasi
                  </p>
                </Link>
                <p> huniKita</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-1/2 h-full flex flex-col bg-white">
        <img src="/Login.png" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Register;
