import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable, reaction } from "mobx";


export default class CommonStore {
    isLoggedIn = false

    email = null

    user = "user@jfexpress.com"

    profileData = null

    constructor() {
        makeAutoObservable(this);
        reaction(
            () => this.token,
            (token) => {
                if (token) {
                    AsyncStorage.setItem("jwt", token);
                } else {
                    AsyncStorage.removeItem("jwt");
                }
            }
        );
    }

    token = AsyncStorage.getItem("jwt");
    appLoaded = false;

    setToken = (token) => {
        this.token = token;
    };

    signOut = () => {
        AsyncStorage.removeItem("jwt");
        this.token = null;
        this.setIsLoggedIn(false);
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    };

    setIsLoggedIn(value) {
        this.isLoggedIn = value
    }

    setUser(user) {
        this.user = user
    }
}
