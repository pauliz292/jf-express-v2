import { makeAutoObservable } from "mobx"

export default class ProfileStore {
    profile = {
        'id': 1, 
        'firstName': "Paulo",
        'lastName': "Rodriguez", 
        'email' : "test@test.com", 
        'contact': "555-6156" 
    }

    constructor() {
        makeAutoObservable(this);
    }
}