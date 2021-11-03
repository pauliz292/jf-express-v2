import { makeAutoObservable } from "mobx";
import moment from "moment";

const dateToday = new Date();
const orderString =  Math.random().toString(36).substring(2, 10);

export default class CheckoutStore {
    transaction = {
        'products': [],
        'totalAmount': 0,
        'customer': "",
        'date': moment(dateToday).format("DD/MM/YYYY"),
        'orderNumber': orderString.toUpperCase(),
        'deliveryAddress': "",
        'contactInfo': "",
        'note': ""
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

    createTransaction = value => {
        let transaction = {
            'products': value.products,
            'totalAmount': value.totalAmount,
            'customerId': value.customerId,
            'orderNumber': value.orderNumber,
            'deliveryAddress': value.deliveryAddress,
            'contactInfo': value.contactInfo,
            'note': value.note
        }
        
        this.transaction = transaction;
    }
}
