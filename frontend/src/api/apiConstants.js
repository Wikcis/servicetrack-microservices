const BASE_URL = "http://localhost:";
const CLIENT_API_PORT = "8081"
const TECHNICIAN_API_PORT = "8082"
const SERVICEORDER_API_PORT = "8083"
const USER_API_PORT = "8084"

const CLIENT_URL = "https://client-service-tyoz.onrender.com"
const TECHNICIAN_URL = "https://technician-service-j9nt.onrender.com"
const SERVICEORDER_URL = "https://serviceorder-service.onrender.com"
const USER_URL = "https://user-service-aiz3.onrender.com"

export const REST_API_URLS = {
    BASE_URL,
    ONLY_LOGIN_URL: `/login`,
    ONLY_REGISTRATION_URL: `/registration`,
    ONLY_TECHNICIANS_URL: `/technicians`,
    ONLY_CLIENTS_URL: `/clients`,
    ONLY_SERVICEORDERS_URL: `/serviceorders`,
    ONLY_USER_SERVICEORDERS_URL: `/yourServiceorders`,
    ONLY_PROFILE_URL: `/profile`,
    TECHNICIANS_URL: `${TECHNICIAN_URL}/technicians`,
    CLIENTS_URL: `${CLIENT_URL}/clients`,
    SERVICEORDERS_URL: `${SERVICEORDER_URL}/serviceorders`,
    LOGIN_URL: `${USER_URL}/login`,
    REGISTER_URL: `${USER_URL}/registration`,
    USERS_ME_URL: `${USER_URL}/users/me`
};

export const token = "token";
export const bearer = "Bearer ";