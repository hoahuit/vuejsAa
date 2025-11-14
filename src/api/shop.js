import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/buyer/customer/",
    headers: { "Content-Type": "application/json" },
});

export const getCategory = () => api.get("getCategory");

export const getProductsByCategory = (categoryId) =>
    api.get(`getProductsByCategory`, {
        params: { categoryId },
    });

export const getProductDetail = (productId) =>
    api.get(`getProductDetail`, {
        params: { productId },
    });

export const getShopInfo = () => api.get("listProduct");