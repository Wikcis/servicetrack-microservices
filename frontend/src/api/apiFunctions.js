import {token} from "../context";

export async function saveSecureItem(key, value) {
    document.cookie = `${key}=${encodeURIComponent(value)}; path=/; secure;`;
}

export const  getSecureItem = async (key) => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((c) => c.startsWith(`${key}=`));
    if (!cookie) return null;
    return decodeURIComponent(cookie.split('=')[1]);
}

export async function deleteSecureItem(key) {
    document.cookie = `${key}=; path=/; max-age=0;`;
}


export const getToken = async () => {
    if (!token) throw new Error("No token provided");
    const savedToken = await getSecureItem(token);
    console.log("Retrieved Token:", savedToken);
    if (!savedToken || savedToken === "") {
        console.log("Invalid token");
        return null;
    }
    return savedToken;
}


