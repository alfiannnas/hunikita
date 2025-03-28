const BASE_URL = import.meta.env.VITE_BASE_URL

export const API = {
    LOGIN: BASE_URL + "/login",
    ADMIN_LOGIN: BASE_URL + "/admin-login",
    REGISTER: BASE_URL + "/register",
    GET_PROPERTIES_BY_USER: BASE_URL + "/properties/users",
    INSERT_PROPERTIES_IMAGE: BASE_URL + "/properties/images",
    INSERT_PROPERTIES: BASE_URL + "/properties",
    GET_USER_DATA: BASE_URL + "/get-user",

    // Admin
    GET_ADMIN_PROPERTIES: BASE_URL + "/admin-properties",
    GET_ADMIN_PROPERTY_BY_ID: BASE_URL + "/admin-properties",
    POST_ADMIN_PROPERTY: BASE_URL + "/admin-properties",
    UPDATE_ADMIN_PROPERTY: BASE_URL + "/admin-properties",
    DELETE_ADMIN_PROPERTY: BASE_URL + "/admin-properties"
}