export const ERROR = {
    PERMISSION_DENIED: new Error("Maaf, Akses tidak diizinkan!. Periksa Role kamu!"),
    EMAIL_REGISTERED: new Error("email registered"),
    NOT_FOUND: new Error("not found"),
    USER_NOT_FOUND: new Error("user not found"),
    WRONG_PASSWORD: new Error("wrong password"),
    ACCESS_NOT_GRANTED: new Error("You dont have access!"),
    INTERNAL_SERVER_ERROR: new Error("Internal Server Error!")
}