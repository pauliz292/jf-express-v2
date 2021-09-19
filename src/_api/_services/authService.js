import AsyncStorage from '@react-native-async-storage/async-storage';
import http from "./httpService";
import jwt_decode from "jwt-decode";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "ACS-6867282b-b5a0-49ae-b8b3-68bc66e1a362";

http.setJwt(getJwt());

export async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint + "/login", {
        email,
        password
    });

    AsyncStorage.setItem(tokenKey, jwt.token);
}

export async function signUp(values) {
    const { data: jwt } = await http.post(apiEndpoint + "/register", {
        username: values.username,
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName
    });

    AsyncStorage.setItem(tokenKey, jwt.token);
}

export function loginWithJwt(jwt) {
    AsyncStorage.setItem(tokenKey, jwt);
}

export function logout() {
    AsyncStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = AsyncStorage.getItem(tokenKey);
        const user = jwt_decode(jwt);

        return user;
    } catch (ex) {
        return null;
    }
}

export function getJwt() {
    return AsyncStorage.getItem(tokenKey);
}

export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt
};