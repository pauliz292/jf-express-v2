import AsyncStorage from '@react-native-async-storage/async-storage';
import http from "./httpService";
// import jwtDecode from "jwt-decode";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "ACS-6867282b-b5a0-49ae-b8b3-68bc66e1a362";

// http.setJwt(getJwt());

export async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint + "/login", {
        email,
        password
    });

    AsyncStorage.setItem(tokenKey, jwt.token);
}

export function loginWithJwt(jwt) {
    AsyncStorage.setItem(tokenKey, jwt);
}

export function logout() {
    AsyncStorage.removeItem(tokenKey);
}

// export function getCurrentUser() {
//     try {
//         const jwt = localStorage.getItem(tokenKey);
//         const user = jwtDecode(jwt);

//         return user;
//     } catch (ex) {
//         return null;
//     }
// }

// export function getJwt() {
//     return localStorage.getItem(tokenKey);
// }

export default {
    login,
    loginWithJwt,
    logout,
    // getCurrentUser,
    // getJwt
};