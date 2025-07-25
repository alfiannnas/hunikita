const BASE_URL = import.meta.env.VITE_BASE_URL

export const API = {
    // Login, Admin Login, and Register
    LOGIN: BASE_URL + "/login",
    ADMIN_LOGIN: BASE_URL + "/admin-login",
    REGISTER: BASE_URL + "/register",

    // Get User Data
    GET_USER_DATA: BASE_URL + "/get-user",

    // Pemilik Properties
    GET_PROPERTIES_BY_USER: BASE_URL + "/pemilik-properties",
    GET_PROPERTY_BY_ID: BASE_URL + "/pemilik-properties",
    POST_PROPERTIES_BY_PEMILIK: BASE_URL + "/pemilik-properties",
    UPDATE_PROPERTIES_BY_PEMILIK: BASE_URL + "/pemilik-properties",
    DELETE_PROPERTIES_BY_USER: BASE_URL + "/pemilik-properties",
    GET_PEMILIK_PROFILE: BASE_URL + "/profil/me",
    UPDATE_PEMILIK_PROFILE: BASE_URL + "/profil/me",

    // Admin Properties
    GET_ADMIN_PROPERTIES: BASE_URL + "/admin-properties",
    GET_ADMIN_PROPERTY_BY_ID: BASE_URL + "/admin-properties",
    POST_ADMIN_PROPERTY: BASE_URL + "/admin-properties",
    UPDATE_ADMIN_PROPERTY: BASE_URL + "/admin-properties",
    DELETE_ADMIN_PROPERTY: BASE_URL + "/admin-properties",
    UPDATE_ADMIN_PROPERTY_STATUS: BASE_URL + "/update-status",
    UPDATE_STATUS_SEWA: BASE_URL + "/update-status-sewa",

    // Admin Penyewa
    GET_PENYEWA: BASE_URL + "/admin-penyewa",
    GET_PENYEWA_BY_ID: BASE_URL + "/admin-penyewa",
    POST_PENYEWA: BASE_URL + "/admin-penyewa",
    UPDATE_PENYEWA: BASE_URL + "/admin-penyewa",
    DELETE_PENYEWA: BASE_URL + "/admin-penyewa",

    // Admin Artikel
    GET_ADMIN_ARTIKEL: BASE_URL + "/admin-artikel",
    GET_ADMIN_ARTIKEL_BY_ID: BASE_URL + "/admin-artikel",
    POST_ADMIN_ARTIKEL: BASE_URL + "/admin-artikel",
    UPDATE_ADMIN_ARTIKEL: BASE_URL + "/admin-artikel",
    DELETE_ADMIN_ARTIKEL: BASE_URL + "/admin-artikel",
    UPDATE_ADMIN_ARTIKEL_STATUS: BASE_URL + "/artikel-update-status",

    // Admin Pusat Bantuan
    GET_ADMIN_PUSAT_BANTUAN: BASE_URL + "/admin-pusat-bantuan",
    GET_ADMIN_PUSAT_BANTUAN_BY_ID: BASE_URL + "/admin-pusat-bantuan",
    POST_ADMIN_PUSAT_BANTUAN: BASE_URL + "/admin-pusat-bantuan",
    UPDATE_ADMIN_PUSAT_BANTUAN: BASE_URL + "/admin-pusat-bantuan",
    DELETE_ADMIN_PUSAT_BANTUAN: BASE_URL + "/admin-pusat-bantuan",
    UPDATE_ADMIN_PUSAT_BANTUAN_POSTING: BASE_URL + "/post-bantuan",

    GET_PUSAT_BANTUAN_BY_ID: BASE_URL + "/pusat-bantuan",

    // Penyewa
    GET_PENGAJUAN: BASE_URL + "/pengajuan",
    POST_PENGAJUAN: BASE_URL + "/pengajuan",
    GET_PENGAJUAN_BY_UUID: BASE_URL + "/pengajuan",
    POST_BUKTI_PEMBAYARAN: BASE_URL + "/pengajuan",
    UPDATE_STATUS_PENGAJUAN: BASE_URL + "/pengajuan",
    DELETE_PENGAJUAN: BASE_URL + "/pengajuan",


    GET_PROPERTIES: BASE_URL + "/properties",
    GET_PROPERTIES_BY_ID: BASE_URL + "/properties",
}