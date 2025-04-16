export const ERROR = {
    PERMISSION_DENIED: new Error("Maaf, Akses tidak diizinkan!. Periksa Role kamu!"),
    EMAIL_REGISTERED: new Error("Email tersebut sudah terdaftar!. Silakan gunakan email lainnya!"),
    NOT_FOUND: new Error("Not Found"),
    USER_NOT_FOUND: new Error("Pengguna tidak ditemukan!"),
    WRONG_PASSWORD: new Error("Password Anda salah!"),
    ACCESS_NOT_GRANTED: new Error("Anda tidak memiliki akses!"),
    INTERNAL_SERVER_ERROR: new Error("Internal Server Error!")
}