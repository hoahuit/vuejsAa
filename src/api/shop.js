import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/buyer/customer/",
    headers: { "Content-Type": "application/json" },
});

// CATEGORY
export const getCategory = () => api.get("getCategory");

// PRODUCT BY CATEGORY
export const getProductsByCategory = (categoryId) =>
    api.get("getProductsByCategory", {
        params: { categoryId },
    });

// PRODUCT DETAIL
export const getProductDetail = (productId) =>
    api.get("getProductDetail", {
        params: { productId },
    });

// SHOP INFO (listProduct)
export const getShopInfo = () => api.get("listProduct");

// Lấy danh sách đơn hàng theo customerId
export const getOrderHistory = () =>
    api.get(`contact/11875/order`);

// Lấy chi tiết đơn hàng theo customerId
export const getOrderDetail = () =>
    api.get(`order/417`);

export const getCustomerInfo = () =>
    api.get(`contact/11875`);