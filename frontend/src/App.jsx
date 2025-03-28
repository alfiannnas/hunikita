import { Navigate, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import Beranda from "./pages/Beranda";
import Tentangkami from "./pages/Tentangkami";
import Pusatbantuan from "./pages/Pusatbantuan";
import Listkosan from "./pages/Listkosan";
import Listkontrakan from "./pages/Listkontrakan";
import Listiklan from "./pages/Listiklan";
import Listartikel from "./pages/Listartikel";
import Detailkosan from "./pages/Detailkosan";
import Detailkontrakan from "./pages/Detailkontrakan";
import Detailartikel from "./pages/Detailartikel";
import Formtambah from "./pages/Formtambah";
import Formedit from "./pages/Formedit";
import AdminHome from "./pages/admin/Home";
import AdminProperti from "./pages/admin/AdminProperti";
import AdminPemilikProperti from "./pages/admin/AdminPemilikProperti";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Beranda />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/tentang-kami" element={<Tentangkami />}></Route>
      <Route path="/pusat-bantuan" element={<Pusatbantuan />}></Route>
      <Route path="/list-kosan" element={<Listkosan />}></Route>
      <Route path="/list-kontrakan" element={<Listkontrakan />}></Route>
      <Route path="/list-iklan" element={<Listiklan />}></Route>
      <Route path="/list-artikel" element={<Listartikel />}></Route>
      <Route path="/detail-kosan" element={<Detailkosan />}></Route>
      <Route path="/detail-kontrakan" element={<Detailkontrakan />}></Route>
      <Route path="/detail-artikel" element={<Detailartikel />}></Route>
      <Route path="/form-tambah" element={<Formtambah />}></Route>
      <Route path="/form-edit" element={<Formedit />}></Route>

      {/* Admin */}
      <Route path="/admin-login" element={<AdminLogin />}></Route>
      <Route path="/admin-home" element={<AdminHome />}></Route>
      <Route path="/admin-properti" element={<AdminProperti />}></Route>
      <Route path="/admin-pemilik-properti" element={<AdminPemilikProperti />}></Route>


      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
