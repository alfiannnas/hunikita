import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { API } from "../constant";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "../components/Input";
import { Select } from "../components/Select";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
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

  const roleOptions = [
    { value: "Penyewa", label: "Penyewa" },
    { value: "Pemilik", label: "Pemilik" }
  ];

  const jenisKelaminOptions = [
    { value: "Laki-laki", label: "Laki-laki" },
    { value: "Perempuan", label: "Perempuan" }
  ];

  const statusOptions = [
    { value: "Belum Kawin", label: "Belum Kawin" },
    { value: "Sudah Kawin", label: "Sudah Kawin" }
  ];

  const pendidikanOptions = [
    { value: "SD", label: "SD" },
    { value: "SMP", label: "SMP" },
    { value: "SMA/SMK", label: "SMA/SMK" },
    { value: "D3", label: "D3" },
    { value: "S1", label: "S1" },
    { value: "S2", label: "S2" },
    { value: "S3", label: "S3" }
  ];

  return (
    <div className="w-full h-screen flex item-start">
      <div className="w-1/2 h-full bg-[#FFFFFF] flex flex-col p-5 justify-between font-Poppins">
        <div className="bg-white w-full px-6">
          <div className="w-full h-full">
            <h1 className="text-xl md:text-2xl text-blue-500 font-bold leading-tight mt-2">
              Daftar
            </h1>

            <form className="mt-9" onSubmit={handleSubmit}>
              <Input
                label="Nama"
                name="nama"
                placeholder="Masukkan nama"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                required
              />

              <div className="mt-2">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Masukkan email"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  required
                />
              </div>

              <div className="mt-2">
                <Input
                  label="Sandi"
                  type="password"
                  name="password"
                  placeholder="Masukkan sandi"
                  value={values.password}
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                  required
                />
              </div>

              <div className="mt-2">
                <Select
                  label="Peran"
                  name="role"
                  options={roleOptions}
                  value={values.role}
                  onChange={(e) => setValues({ ...values, role: e.target.value })}
                  placeholder="Pilih Peran"
                  required
                />
              </div>

              <div className="mt-2">
                <Select
                  label="Jenis Kelamin"
                  name="jenis_kelamin"
                  options={jenisKelaminOptions}
                  value={values.jenis_kelamin}
                  onChange={(e) => setValues({ ...values, jenis_kelamin: e.target.value })}
                  placeholder="Pilih Jenis Kelamin"
                  required
                />
              </div>

              <div className="mt-2">
                <Input
                  label="Kota Asal"
                  name="kota_asal"
                  placeholder="Masukkan kota asal"
                  value={values.kota_asal}
                  onChange={(e) => setValues({ ...values, kota_asal: e.target.value })}
                  required
                />
              </div>

              <div className="mt-2">
                <Input
                  label="Pekerjaan"
                  name="pekerjaan"
                  placeholder="Masukkan pekerjaan"
                  value={values.pekerjaan}
                  onChange={(e) => setValues({ ...values, pekerjaan: e.target.value })}
                  required
                />
              </div>

              <div className="mt-2">
                <Input
                  label="Nama Kampus"
                  name="nama_kampus"
                  placeholder="Masukkan nama kampus"
                  value={values.nama_kampus}
                  onChange={(e) => setValues({ ...values, nama_kampus: e.target.value })}
                  required
                />
              </div>

              <div className="mt-2">
                <Select
                  label="Status"
                  name="status"
                  options={statusOptions}
                  value={values.status}
                  onChange={(e) => setValues({ ...values, status: e.target.value })}
                  placeholder="Pilih Status"
                  required
                />
              </div>

              <div className="mt-2">
                <Select
                  label="Pendidikan Terakhir"
                  name="pendidikan_terakhir"
                  options={pendidikanOptions}
                  value={values.pendidikan_terakhir}
                  onChange={(e) => setValues({ ...values, pendidikan_terakhir: e.target.value })}
                  placeholder="Pilih Pendidikan Terakhir"
                  required
                />
              </div>

              <div className="mt-2">
                <Input
                  label="Nomor Kontak"
                  name="no_kontak"
                  placeholder="Masukkan nomor kontak"
                  value={values.no_kontak}
                  onChange={(e) => setValues({ ...values, no_kontak: e.target.value })}
                  required
                />
              </div>

              <div className="mt-2">
                <Input
                  label="Nomor Kontak Darurat"
                  name="no_kontak_darurat"
                  placeholder="Masukkan nomor kontak darurat"
                  value={values.no_kontak_darurat}
                  onChange={(e) => setValues({ ...values, no_kontak_darurat: e.target.value })}
                  required
                />
              </div>

              <button
                className="w-full block bg-blue-500 hover:bg-blue-400 px-1.5 py-1.5 mt-5 rounded-lg font-semibold text-white font-Poppins focus:bg-blue-400 focus:outline-none transition duration-200"
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
