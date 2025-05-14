import {saveSecureItem} from "./apiFunctions";
import {postMethod} from "../services";
import {REST_API_URLS, token} from "../context";

export async function loginUser(email, password) {

    try {
        const loginRequest = JSON.stringify({
            email: email,
            password: password
        });

        const loginResponse = await postMethod(REST_API_URLS.LOGIN_URL, loginRequest);

        await saveSecureItem(token, loginResponse.token);

        return loginResponse.token;
    } catch (error) {
        console.error('Login error: ' + error);
        return null
    }
}

export async function registerUser(firstName, lastName, email, password, phoneNumber) {
    try {
        const registerRequest = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
        });

        const registerResponse = await postMethod(REST_API_URLS.REGISTER_URL, registerRequest)

        if (registerResponse && registerResponse.id !== null && registerResponse.id !== undefined) {
            console.log("Registration successful!");
        } else {
            console.warn("Registration not successful. Status:", registerResponse.status);
        }

        return registerResponse.id;
    } catch
        (error) {
        console.error('Registration error:', error);
        return null;
    }
}