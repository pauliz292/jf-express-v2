// import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable } from "mobx"

const products = [
    {'id': 1, 'name': "Meat", 'description': "Frozen Meat", 'Qty': 0, 'price': 100},
    {'id': 2, 'name': "Fish", 'description': "Frozen Fish", 'Qty': 0, 'price': 150},
    {'id': 3, 'name': "Chicken", 'description': "Frozen Chicken", 'Qty': 0, 'price': 180},
    {'id': 4, 'name': "Beef", 'description': "Frozen Beef", 'Qty': 0, 'price': 200},
]

export default class ProductStore {
    products = products;
    product = {};

    constructor() {
        makeAutoObservable(this);
    }

}
