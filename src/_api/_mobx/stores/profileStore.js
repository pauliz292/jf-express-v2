import { makeAutoObservable } from "mobx"

const profile = [
    {'id': 1, 'firstName': "Paulo",'lastName': "Rodriguez", 'email' : "test@test.com", 'contact': "555-6156" },
]

export default class ProfileStore {
    profile = profile;
    profile = {};

    constructor() {
        makeAutoObservable(this);
    }

}