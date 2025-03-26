const BASE_URL = import.meta.env.VITE_BASE_URL
export const API = {
    LOGIN: BASE_URL + "/login",
    REGISTER: BASE_URL + "/register",
    GET_PROPERTIES_BY_USER: BASE_URL + "/properties/users",
    INSERT_PROPERTIES_IMAGE: BASE_URL + "/properties/images",
    INSERT_PROPERTIES: BASE_URL + "/properties"
}