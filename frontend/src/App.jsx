import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//Middleware
import AdminProtectedRoute from './middleware/AdminProtectedRoute';
import PemilikProtectedRoute from './middleware/PemilikProtectedRoute';
import PenyewaProtectedRoute from './middleware/PenyewaProtectedRoute';

import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import Beranda from "./pages/Beranda";
import Tentangkami from "./pages/Tentangkami";
import Pusatbantuan from "./pages/Pusatbantuan";
import Listkosan from "./pages/Listkosan";
import Listkontrakan from "./pages/Listkontrakan";
import Listartikel from "./pages/Listartikel";
import Detailkosan from "./pages/Detailkosan";
import Detailkontrakan from "./pages/Detailkontrakan";
import DetailArtikel from "./pages/DetailArtikel";

// Pemilik Properti
import PemilikProperti from "./pages/pemilik/PemilikProperti";
import PemilikPropertiCreate from "./pages/pemilik/PemilikPropertiCreate";
import PemilikPropertiEdit from "./pages/pemilik/PemilikPropertiEdit";
import PemilikProfil from './pages/pemilik/PemilikProfil';

// Penyewa Properti
import PenyewaProperti from './pages/penyewa/PenyewaProperti';

// Admin
import AdminHome from "./pages/admin/AdminHome";
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
import AdminPemilikPropertiEdit from './pages/admin/AdminPemilikPropertiEdit';
import AdminPropertiEdit from './pages/admin/AdminPropertiEdit';
import AdminArtikelEdit from './pages/admin/AdminArtikelEdit';
import AdminArtikelDetail from './pages/admin/AdminArtikelDetail';
import PengajuanSewa from './pages/penyewa/PengajuanSewa';
import PersetujuanSewa from './pages/penyewa/PersetujuanSewa';


import RiwayatPengajuan from './pages/pemilik/RiwayatPengajuan';
import RiwayatTransaksi from './pages/pemilik/RiwayatTransaksi';
import RiwayatPengajuanSewa from './pages/penyewa/RiwayatPengajuanSewa';
import RiwayatTransaksiSewa from './pages/penyewa/RiwayatTransaksiSewa';
import DetailSewa from './pages/penyewa/DetailSewa';
import PemilikDetailSewa from './pages/pemilik/PemilikDetailSewa';
import Invoice from './pages/penyewa/invoice/Invoice';
import RiwayatPusatBantuan from './pages/RiwayatPusatBantuan';
import DetailPusatBantuan from './pages/DetailPusatBantuan';

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
      <Route path="/profile" element={<PemilikProfil />} />
      <Route path="/list-artikel" element={<Listartikel />} />
      <Route path="/detail-kontrakan" element={<Detailkontrakan />} />
      <Route path="/detail-artikel/:id" element={<DetailArtikel />} />
      <Route path="/detail-properti/:id" element={<Detailkosan />} />
      <Route path="/riwayat-pusat-bantuan" element={<RiwayatPusatBantuan />} />
      <Route path="/riwayat-pusat-bantuan/:id" element={<DetailPusatBantuan />} />


      {/* Pemilik Properti Route */}
      <Route path="/list-iklan" element={
        <PemilikProtectedRoute>
          <PemilikProperti />
        </PemilikProtectedRoute>
      } />
      <Route path="/properties/create" element={
        <PemilikProtectedRoute>
          <PemilikPropertiCreate />
        </PemilikProtectedRoute>
      } />
      <Route path="/properties/edit/:id" element={
        <PemilikProtectedRoute>
          <PemilikPropertiEdit />
        </PemilikProtectedRoute>
      } />
      <Route path="/riwayat-pengajuan" element={
        <PemilikProtectedRoute>
          <RiwayatPengajuan />
        </PemilikProtectedRoute>
      } />
      <Route path="/riwayat-transaksi" element={
        <PemilikProtectedRoute>
          <RiwayatTransaksi />
        </PemilikProtectedRoute>
      } />

      <Route path="/pemilik-detail-sewa/:uuid" element={
        <PemilikProtectedRoute>
          <PemilikDetailSewa />
        </PemilikProtectedRoute>
      } />

      {/* Penyewa Properti */}
      <Route path="/penyewa-properti" element={<PenyewaProperti />} />

      <Route path="/riwayat-pengajuan-sewa" element={
        <PenyewaProtectedRoute>
          <RiwayatPengajuanSewa />
        </PenyewaProtectedRoute>
      } />
      <Route path="/riwayat-transaksi-sewa" element={
        <PenyewaProtectedRoute>
          <RiwayatTransaksiSewa />
        </PenyewaProtectedRoute>
      } />
      <Route path="/pengajuan-sewa/:id" element={
        <PenyewaProtectedRoute>
          <PengajuanSewa />
        </PenyewaProtectedRoute>
      } />
      <Route path="/persetujuan-sewa/:id" element={
        <PenyewaProtectedRoute>
          <PengajuanSewa />
        </PenyewaProtectedRoute>
      } />

      <Route path="/detail-sewa/:uuid" element={
        <PenyewaProtectedRoute>
          <DetailSewa />
        </PenyewaProtectedRoute>
      } />

      <Route path="/invoice" element={
        <PenyewaProtectedRoute>
          <Invoice />
        </PenyewaProtectedRoute>
      } />

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
      <Route path="/admin-properti/edit/:id" element={
        <AdminProtectedRoute>
          <AdminPropertiEdit />
        </AdminProtectedRoute>
      } />
      <Route path="/admin-pemilik-properti" element={
        <AdminProtectedRoute>
          <AdminPemilikProperti />
        </AdminProtectedRoute>
      } />
      <Route path="/admin-pemilik-properti/edit/:id" element={
        <AdminProtectedRoute>
          <AdminPemilikPropertiEdit />
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
      <Route path="/admin-profil/edit" element={
        <AdminProtectedRoute>
          <AdminProfilEdit />
        </AdminProtectedRoute>
      } />
      <Route path="/admin-artikel/create" element={
        <AdminProtectedRoute>
          <AdminArtikelCreate />
        </AdminProtectedRoute>
      } />
      <Route path="/admin-artikel/edit/:id" element={
        <AdminProtectedRoute>
          <AdminArtikelEdit />
        </AdminProtectedRoute>
      } />
      <Route path="/admin-artikel/detail/:id" element={
        <AdminProtectedRoute>
          <AdminArtikelDetail />
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
