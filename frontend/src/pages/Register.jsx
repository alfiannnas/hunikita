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
    role: "Penyewa",
    jenis_kelamin: "",
    kota_asal: "",
    pekerjaan: "",
    nama_kampus: "",
    status: "",
    pendidikan_terakhir: "",
    no_kontak: "",
    no_kontak_darurat: "",
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

              <div className="mt-2">
                <label className="font-semibold block text-gray-700">
                  Peran
                </label>
                <select
                  name="role"
                  onChange={(e) =>
                    setValues({ ...values, role: e.target.value })
                  }
                  className="w-full px-1.5 py-1.5 bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
                  value={values.role}
                >
                  <option value="Penyewa">Penyewa</option>
                  <option value="Pemilik">Pemilik</option>
                </select>
              </div>

              <div className="mt-2">
                <label className="font-semibold block text-gray-700">
                  Jenis Kelamin
                </label>
                <select
                  name="jenis_kelamin"
                  onChange={(e) =>
                    setValues({ ...values, jenis_kelamin: e.target.value })
                  }
                  className="w-full px-1.5 py-1.5 bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
                  value={values.jenis_kelamin}
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div className="mt-2">
                <label className="font-semibold block text-gray-700">
                  Kota Asal
                </label>
                <input
                  type="text"
                  name="kota_asal"
                  placeholder="Masukkan kota asal"
                  onChange={(e) =>
                    setValues({ ...values, kota_asal: e.target.value })
                  }
                  className="w-full px-1.5 py-1.5 bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
                />
              </div>

              <div className="mt-2">
                <label className="font-semibold block text-gray-700">
                  Pekerjaan
                </label>
                <input
                  type="text"
                  name="pekerjaan"
                  placeholder="Masukkan pekerjaan"
                  onChange={(e) =>
                    setValues({ ...values, pekerjaan: e.target.value })
                  }
                  className="w-full px-1.5 py-1.5 bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
                />
              </div>

              <div className="mt-2">
                <label className="font-semibold block text-gray-700">
                  Nama Kampus
                </label>
                <input
                  type="text"
                  name="nama_kampus"
                  placeholder="Masukkan nama kampus"
                  onChange={(e) =>
                    setValues({ ...values, nama_kampus: e.target.value })
                  }
                  className="w-full px-1.5 py-1.5 bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
                />
              </div>

              <div className="mt-2">
                <label className="font-semibold block text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  onChange={(e) =>
                    setValues({ ...values, status: e.target.value })
                  }
                  className="w-full px-1.5 py-1.5 bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
                  value={values.status}
                >
                  <option value="">Pilih Status</option>
                  <option value="Belum Kawin">Belum Kawin</option>
                  <option value="Sudah Kawin">Sudah Kawin</option>
                </select>
              </div>

              <div className="mt-2">
                <label className="font-semibold block text-gray-700">
                  Pendidikan Terakhir
                </label>
                <select
                  name="pendidikan_terakhir"
                  onChange={(e) =>
                    setValues({ ...values, pendidikan_terakhir: e.target.value })
                  }
                  className="w-full px-1.5 py-1.5 bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
                  value={values.pendidikan_terakhir}
                >
                  <option value="">Pilih Pendidikan Terakhir</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA/SMK">SMA/SMK</option>
                  <option value="D3">D3</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                </select>
              </div>

              <div className="mt-2">
                <label className="font-semibold block text-gray-700">
                  Nomor Kontak
                </label>
                <input
                  type="text"
                  name="no_kontak"
                  placeholder="Masukkan nomor kontak"
                  onChange={(e) =>
                    setValues({ ...values, no_kontak: e.target.value })
                  }
                  className="w-full px-1.5 py-1.5 bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
                />
              </div>

              <div className="mt-2">
                <label className="font-semibold block text-gray-700">
                  Nomor Kontak Darurat
                </label>
                <input
                  type="text"
                  name="no_kontak_darurat"
                  placeholder="Masukkan nomor kontak darurat"
                  onChange={(e) =>
                    setValues({ ...values, no_kontak_darurat: e.target.value })
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
