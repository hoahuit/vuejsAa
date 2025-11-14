import { createRouter, createWebHistory } from "vue-router";
import ListProduct from "../pages/HomePage.vue";
import OrderPage from "../pages/OrderPage.vue";

const routes = [
  { path: "/", component: ListProduct },
  { path: "/order", component: OrderPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
