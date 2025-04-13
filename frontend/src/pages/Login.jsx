import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import axios from "axios";
import { API } from "../constant";
import { doLogin } from "../store";
import { Input } from "../components/Input";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    role: "Pemilik"
  });

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth )

  const availableRoles = [
    { value: "Pemilik", label: "Pemilik" },
    { value: "Penyewa", label: "Penyewa" },
  ];

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(API.LOGIN, values)
      .then((res) => {
        if (res.status === 200) {
          dispatch(doLogin(res.data.data))
          navigate("/");
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
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 h-full bg-[#FFFFFF] flex flex-col p-5 justify-center font-Poppins">
        <div className="bg-white w-[550px] mx-auto px-6">
          <div className="w-full">
            <h1 className="text-xl md:text-2xl text-blue-500 font-bold leading-tight">
              Login
            </h1>
            <p>Masukkan email dan sandi</p>

            <form className="mt-9" onSubmit={handleSubmit}>
              <div>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  placeholder="Masukkan email"
                />
              </div>

              <div className="mt-2">
                <Input
                  label="Sandi"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                  placeholder="Masukkan sandi"
                />
              </div>

              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Masuk Sebagai</label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={values.role}
                  onChange={(e) => setValues({ ...values, role: e.target.value })}
                >
                  {availableRoles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="w-full block bg-blue-500 hover:bg-blue-400 px-1.5 py-1.5 rounded-lg font-semibold text-white font-Poppins focus:bg-blue-400 focus:outline-none transition duration-200 mt-3"
                type="submit"
              >
                Masuk
              </button>
            </form>

            <div className="flex gap-2 justify-center mt-[10px]">
              <p>Belum punya akun?</p>
              <Link to="/register">
                <p className="text-blue-500 underline">Buat akun</p>
              </Link>
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

export default Login;
