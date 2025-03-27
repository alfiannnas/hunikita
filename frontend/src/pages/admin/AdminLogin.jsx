import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API } from "../../constant";
import { doLogin } from "../../store";

const AdminLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null); // State untuk alert

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth) {
      navigate("/admin-home");
    }
  }, [auth, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setAlertMessage(null); // Reset alert sebelum mengirim permintaan

    axios
      .post(API.ADMIN_LOGIN, values)
      .then((res) => {
        if (res.status === 200) {
          dispatch(doLogin(res.data.data));
          setAlertMessage({ type: "success", message: res.data.alert?.message || "Login berhasil!" });
          setTimeout(() => navigate("/admin-home"), 1500);
        }
      })
      .catch((err) => {
        if (err.response?.data?.alert) {
          setAlertMessage({ type: "error", message: err.response.data.alert.message });
        } else {
          setAlertMessage({ type: "error", message: "Server Error! Coba lagi beberapa saat." });
        }
      });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left side - Image Grid */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 overflow-hidden">
        <div className="grid grid-cols-2 gap-1">
          <img src="/home1.png" alt="Modern apartment exterior" className="w-full h-[50vh] object-cover" />
          <img src="/home2.png" alt="Contemporary building" className="w-full h-[50vh] object-cover" />
          <img src="/home3.png" alt="Residential complex" className="w-full h-[50vh] object-cover" />
          <img src="/home4.png" alt="Modern architecture" className="w-full h-[50vh] object-cover" />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#3182CE] p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-8">Login Admin</h1>

          {/* ALERT MESSAGE */}
          {alertMessage && (
            <div className={`mb-4 p-3 rounded-lg text-white ${alertMessage.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
              {alertMessage.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={values.password}
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3182CE] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
