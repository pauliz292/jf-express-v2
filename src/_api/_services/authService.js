import AsyncStorage from '@react-native-async-storage/async-storage';
import http from "./httpService";
import jwt_decode from "jwt-decode";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/account";
const tokenKey = "ACS-6867282b-b5a0-49ae-b8b3-68bc66e1a362";

http.setJwt(getJwt());

export async function login(username, password) {
    const { data: jwt } = await http.post(apiEndpoint + "/login", {
        username,
        password
    });
    
    return jwt;
}

export async function signUp(values) {
    const { data: jwt } = await http.post(apiEndpoint + "/register", {
        username: values.username,
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName
    });

    return jwt;
}

export function loginWithJwt(jwt) {
    AsyncStorage.setItem(tokenKey, jwt);
}

export function logout() {
    AsyncStorage.removeItem(tokenKey);
}

export function getCurrentUser(jwt) {
    try {
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