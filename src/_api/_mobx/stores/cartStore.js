import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable } from "mobx";

export default class CartStore {
    cartItems = []
    cartItem = {}

    constructor() {
        makeAutoObservable(this);
    }

    addCartItem = (item) => {
        this.cartItems.push(item);
    }
}
