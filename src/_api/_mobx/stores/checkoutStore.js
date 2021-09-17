import { makeAutoObservable } from "mobx";
import moment from "moment";

const dateToday = new Date();
const orderString =  Math.random().toString(36).substring(2, 10);

export default class CheckoutStore {
    transaction = {
        'products': [],
        'totalAmount': 900,
        'customer': "",
        'date': moment(dateToday).format("DD/MM/YYYY"),
        'orderNumber': orderString,
    }

    constructor() {
        makeAutoObservable(this);
    }

    mapProducts = items => {
        return this.transaction.products = items;
    }

    mapTotalAmount = amount => {
        return this.transaction.totalAmount = amount;
    }
}
