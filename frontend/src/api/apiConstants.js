const BASE_URL = "http://localhost:8080";

export const REST_API_URLS = {
    BASE_URL,
    ONLY_LOGIN_URL: "/login",
    ONLY_REGISTRATION_URL: "/registration",
    ONLY_TECHNICIANS_URL: "/technicians",
    ONLY_CLIENTS_URL: "/clients",
    ONLY_SERVICEORDERS_URL: "/serviceorders",
    ONLY_USER_SERVICEORDERS_URL: "/yourServiceorders",
    ONLY_PROFILE_URL: "/profile",
    TECHNICIANS_URL: `${BASE_URL}/technicians`,
    CLIENTS_URL: `${BASE_URL}/clients`,
    SERVICEORDERS_URL: `${BASE_URL}/serviceorders`,
    LOGIN_URL: `${BASE_URL}/login`,
    REGISTER_URL: `${BASE_URL}/registration`,
    USERS_ME_URL: `${BASE_URL}/users/me`
};

export const token = "token";
export const bearer = "Bearer ";