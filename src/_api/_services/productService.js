import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/product";

export async function getAll() {
    await http.get(apiEndpoint)
    .then(res => {
        const { data } = res;
        
        return data;
    })
    .catch(err => console.log(err))
}

export default {
    getAll,
    // addProduct,
    // updateProduct,
};