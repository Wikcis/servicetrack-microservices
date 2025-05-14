import {bearer} from "../context";
import {getToken} from "../api/apiFunctions";

export const getMethod = async (url) => {
    try {
        const savedToken = await getToken();

        if (savedToken !== null) {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `${bearer} ${savedToken}`,
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch object");
            }
            return await response.json();
        } else return null;
    } catch (error) {
        console.error('Error in getting:'+ error);
        throw error;
    }
}

export const deleteMethod = async (url) => {
    try {
        const savedToken = await getToken();

        if (savedToken !== null) {
            const response = await fetch(url, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    Authorization: `${bearer} ${savedToken}`,
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch object");
            }
            return await response;
        } else return null;

    } catch (error) {
        console.error('Error in deleting:'+ error);
        throw error;
    }
}

export const postMethod = async (url, requestBody) => {
    try {

        if (url.includes("login") || url.includes("registration") || url.includes("technicians")) {
            const response = await fetch(url, {
                method: "POST",
                body: requestBody,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) {
                throw new Error("Failed to post object");
            }

            return await response.json();
        }

        const savedToken = await getToken();

        if (savedToken !== null) {
            const response = await fetch(url, {
                method: "POST",
                body: requestBody,
                credentials: "include",
                headers: {
                    Authorization: `${bearer} ${savedToken}`,
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) {
                throw new Error("Failed to post object with token");
            }
            return await response.json();
        } else return null;
    } catch (error) {
        console.error('Error in posting: '+ error);
        throw error;
    }
}

export const updateMethod = async (url, requestBody) => {
    try {
        const savedToken = await getToken();

        if (savedToken !== null) {
            const response = await fetch(url, {
                method: "PUT",
                body: requestBody,
                credentials: "include",
                headers: {
                    Authorization: `${bearer} ${savedToken}`,
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error("Failed to put object with token");
            }
            return await response;
        } else return null;
    } catch (error) {
        console.error('Error in posting: '+ error);
        throw error;
    }
}


