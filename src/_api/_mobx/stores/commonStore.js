import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable, reaction, runInAction } from "mobx";


export default class CommonStore {
    isLoggedIn = false

    email = ""

    user = null

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
        runInAction(() => {
            this.token = null;
            this.setIsLoggedIn(false);
            this.user = null;
        })
    }

    setAppLoaded = () => {
        runInAction(() => {
            this.appLoaded = true
        });
    };

    setIsLoggedIn = value => {
        runInAction(() => {
            this.isLoggedIn = value
        });
    }

    setUser = user => {
        runInAction(() => {
            this.user = user
        });
    }
}
