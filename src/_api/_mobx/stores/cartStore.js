import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable } from "mobx";


export default class CartStore {
    cartItems = []
    cartItem = {
        'id': 0,
        'name': "",
        'description': "",
        'price': 0,
        'totalPrice': 0,
        'qty': 0,
    }

    constructor() {
        makeAutoObservable(this);
    }

    addCartItem = (item) => {
        let items = [...this.cartItems];

        this.cartItem = {
            'id': item.id,
            'name': item.name,
            'description': item.description,
            'price': item.price,
            'totalPrice': 0,
            'qty': 1
        };

        let tempItem = items.find(i => i.id === this.cartItem.id)
        if (!tempItem) {
            items.push(this.cartItem);
        } else {
            ++tempItem.qty
            tempItem.totalPrice = tempItem.price * tempItem.qty
        }

        this.cartItems = items;
    }
}
