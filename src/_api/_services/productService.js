import http from "./httpService";
import { apiUrl } from "../config.json";
import FormData from 'form-data';
import { reactNativeBlobConverter } from "../_converter/imageConverterService";

const apiEndpoint = apiUrl + "/product";

export async function getAll() {
    const { data } = await http.get(apiEndpoint)
    
    return data;
}

export async function addProduct(values, image) {
    let formData = new FormData();
    const img = reactNativeBlobConverter(image.base64, image.uri);

    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('qty', values.qty);
    formData.append('price', values.price);
    formData.append('image', img);

    const { status } = await http.post(apiEndpoint, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    return status;
}

export async function updateProduct(product) {
    const { data } = await http.put(apiEndpoint, {
        "id": product.id,
        "description": product.description,
        "qty": product.qty,
        "price": product.price
    })
    
    return data;
}

export async function archiveProduct(product) {
    const { data } = await http.delete(apiEndpoint, {
        "id": product.id,
        "isDeleted": product.isDeleted,
    })
    
    return data;
}

export default {
    getAll,
    addProduct,
    updateProduct,
    archiveProduct,
};