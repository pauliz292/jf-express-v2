import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/transaction";

export async function getAll() {
    const { data } = await http.get(apiEndpoint);
    
    return data;
}

export async function addTransaction(transaction) {
    const { status } = await http.post(apiEndpoint, {
        products: transaction.products,
        totalAmount: transaction.totalAmount,
        customerId: transaction.customerId,
        orderNumber: transaction.orderNumber,
        deliveryAddress: transaction.deliveryAddress,
        contactInfo: transaction.contactInfo,
        note: transaction.note
    })

    return status;
}

export async function updateTransaction(transaction) {
    const { data } = await http.put(`${apiUrl}/approve-transaction?transactionId=${transaction.id}`,{
    })
    
    return data;
}

export default {
    getAll,
    addTransaction,
    updateTransaction,
};

