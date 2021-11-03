import { makeAutoObservable, runInAction } from "mobx";


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
    cartTotalPrice = 0;

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
            this.cartTotalPrice = this.cartItem.price;
        } else {
            ++tempItem.qty;
            tempItem.totalPrice = tempItem.price * tempItem.qty;
        }

        runInAction(() => {
            this.cartItems = items
        });
    }

    addItemQty = id => {
        let item = this.cartItems.find(i => i.id === id);
        if (item) {
            ++item.qty;
            item.totalPrice = item.price * item.qty;
        }
    }

    subtractItemQty = id => {
        let item = this.cartItems.find(i => i.id === id);
        if (item) {
            --item.qty;
            item.totalPrice = item.price * item.qty;
        }
    }

    getTotalAmount = () => {
        let total = this.cartItems.reduce(function(prev, cur) {
            return prev + cur.totalPrice;
        }, 0);
        return this.cartTotalPrice = total;
    }
}
