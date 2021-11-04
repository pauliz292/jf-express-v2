import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/product";

export async function getAll() {
    const { data } = await http.get(apiEndpoint)
    
    return data;
}

export async function addProduct(values) {
    const { status } = await http.post(apiEndpoint, {
        name: values.name,
        description: values.description,
        qty: values.qty,
        price: values.price
    })
    
    return status;
}

export default {
    getAll,
    addProduct,
    // updateProduct,
};