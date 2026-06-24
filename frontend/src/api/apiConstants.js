// --- LOKALNE ADRESY (ZAKOMENTOWANE) ---
// const CLIENT_URL = "http://localhost:8081";
// const TECHNICIAN_URL = "http://localhost:8082";
// const SERVICEORDER_URL = "http://localhost:8083";
// const USER_URL = "http://localhost:8084";
// const INVOICE_URL = "http://localhost:8085";

// --- CHMUROWE ADRESY RENDER (AKTYWNE) ---
const CLIENT_URL = "https://client-service-tyoz.onrender.com";
const TECHNICIAN_URL = "https://technician-service-j9nt.onrender.com";
const SERVICEORDER_URL = "https://serviceorder-service.onrender.com";
const USER_URL = "https://user-service-aiz3.onrender.com";
const INVOICE_URL = "https://invoice-service-n9jv.onrender.com";

export const REST_API_URLS = {
    ONLY_LOGIN_URL: `/login`,
    ONLY_REGISTRATION_URL: `/registration`,
    ONLY_TECHNICIANS_URL: `/technicians`,
    ONLY_CLIENTS_URL: `/clients`,
    ONLY_SERVICEORDERS_URL: `/serviceorders`,
    ONLY_USER_SERVICEORDERS_URL: `/yourServiceorders`,
    ONLY_PROFILE_URL: `/profile`,
    ONLY_INVOICES_URL: `/invoices`,
    
    TECHNICIANS_URL: `${TECHNICIAN_URL}/technicians`,
    CLIENTS_URL: `${CLIENT_URL}/clients`,
    SERVICEORDERS_URL: `${SERVICEORDER_URL}/serviceorders`,
    INVOICES_URL: `${INVOICE_URL}/invoices`,
    LOGIN_URL: `${USER_URL}/login`,
    REGISTER_URL: `${USER_URL}/registration`,
    USERS_ME_URL: `${USER_URL}/users/me`
};

export const token = "token";
export const bearer = "Bearer ";