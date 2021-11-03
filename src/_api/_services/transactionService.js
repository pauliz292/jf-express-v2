import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/transaction";

export async function getAll() {
    const { data } = await http.get(apiEndpoint);
    
    return data;
}

export async function addTransaction(transaction) {
    const { status } = await http.get(apiEndpoint, {
        transaction
    })

    return status;
}

export default {
    getAll,
    addTransaction,
};

