const BASE_URL = "http://localhost:";
const CLIENT_API_PORT = "8081"
const TECHNICIAN_API_PORT = "8082"
const SERVICEORDER_API_PORT = "8083"
const USER_API_PORT = "8084"

console.log("🔥 USEEEEEEEErL:", USER_API_PORT);

export const REST_API_URLS = {
    BASE_URL,
    ONLY_LOGIN_URL: `/login`,
    ONLY_REGISTRATION_URL: `/registration`,
    ONLY_TECHNICIANS_URL: `/technicians`,
    ONLY_CLIENTS_URL: `/clients`,
    ONLY_SERVICEORDERS_URL: `/serviceorders`,
    ONLY_USER_SERVICEORDERS_URL: `/yourServiceorders`,
    ONLY_PROFILE_URL: `/profile`,
    TECHNICIANS_URL: `${BASE_URL}${TECHNICIAN_API_PORT}/technicians`,
    CLIENTS_URL: `${BASE_URL}${CLIENT_API_PORT}/clients`,
    SERVICEORDERS_URL: `${BASE_URL}${SERVICEORDER_API_PORT}/serviceorders`,
    LOGIN_URL: `${BASE_URL}${USER_API_PORT}/login`,
    REGISTER_URL: `${BASE_URL}${USER_API_PORT}/registration`,
    USERS_ME_URL: `${BASE_URL}${USER_API_PORT}/users/me`
};

export const token = "token";
export const bearer = "Bearer ";