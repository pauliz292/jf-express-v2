import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/driver";

export async function getAll() {
    await http.get(apiEndpoint)
    .then(res => {
        const { data } = res;
        
        return data;
    })
    .catch(err => console.log(err))
}

export async function apply(values, userId) {
    await http.post(apiEndpoint, {
        "licenseNumber": values.licenseNumber,
        "plateNumber": values.plateNumber,
        "userId": userId
    })
    .then(res => {
        const { data } = res;
        
        return data;
    })
    .catch(err => console.log(err))
}

export default {
    getAll,

};

