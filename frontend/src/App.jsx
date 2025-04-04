import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserProtectedRoute from "./components/UserProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
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
import AdminPenyewa from "./pages/admin/AdminPenyewa";
import AdminArtikel from "./pages/admin/AdminArtikel";
import AdminProfil from "./pages/admin/AdminProfil";
import AdminProfilEdit from "./pages/admin/AdminProfilEdit";
import AdminArtikelCreate from "./pages/admin/AdminArtikelCreate";
import AdminLogout from "./pages/AdminLogout";
import AdminPusatBantuan from './pages/admin/AdminPusatBantuan';
import AdminPusatBantuanEdit from './pages/admin/AdminPusatBantuanEdit';
import AdminPenyewaEdit from './pages/admin/AdminPenyewaEdit';

function App() {
  return (
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Beranda />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/tentang-kami" element={<Tentangkami />} />
        <Route path="/pusat-bantuan" element={<Pusatbantuan />} />
        <Route path="/list-kosan" element={<Listkosan />} />
        <Route path="/list-kontrakan" element={<Listkontrakan />} />
        <Route path="/list-iklan" element={<Listiklan />} />
        <Route path="/list-artikel" element={<Listartikel />} />
        <Route path="/detail-kosan" element={<Detailkosan />} />
        <Route path="/detail-kontrakan" element={<Detailkontrakan />} />
        <Route path="/detail-artikel" element={<Detailartikel />} />
        <Route path="/form-tambah" element={<Formtambah />} />
        <Route path="/form-edit" element={<Formedit />} />

        {/* Protected Admin Routes */}
        <Route path="/admin-home" element={
          <AdminProtectedRoute>
            <AdminHome />
          </AdminProtectedRoute>
        } />
        <Route path="/admin-properti" element={
          <AdminProtectedRoute>
            <AdminProperti />
          </AdminProtectedRoute>
        } />
        <Route path="/admin-pemilik-properti" element={
          <AdminProtectedRoute>
            <AdminPemilikProperti />
          </AdminProtectedRoute>
        } />
        <Route path="/admin-penyewa" element={
          <AdminProtectedRoute>
            <AdminPenyewa />
          </AdminProtectedRoute>
        } />
        <Route path="/admin-penyewa/edit/:id" element={
          <AdminProtectedRoute>
            <AdminPenyewaEdit />
          </AdminProtectedRoute>
        } />
        <Route path="/admin-artikel" element={
          <AdminProtectedRoute>
            <AdminArtikel />
          </AdminProtectedRoute>
        } />
        <Route path="/admin-profil" element={
          <AdminProtectedRoute>
            <AdminProfil />
          </AdminProtectedRoute>
        } />
        <Route path="/admin-pusat-bantuan" element={
          <AdminProtectedRoute>
            <AdminPusatBantuan />
          </AdminProtectedRoute>
        } />
        <Route path="/admin-pusat-bantuan/edit/:id" element={
          <AdminProtectedRoute>
            <AdminPusatBantuanEdit />
          </AdminProtectedRoute>
        } />
        <Route path="/admin-profil/edit/:id" element={
          <AdminProtectedRoute>
            <AdminProfilEdit />
          </AdminProtectedRoute>
        } />
        <Route path="/admin-artikel/create" element={
          <AdminProtectedRoute>
            <AdminArtikelCreate />
          </AdminProtectedRoute>
        } />
        <Route path="/admin-logout" element={
          <AdminProtectedRoute>
            <AdminLogout />
          </AdminProtectedRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
}

export default App;
