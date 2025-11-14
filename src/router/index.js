import { createRouter, createWebHistory } from "vue-router";
import ListProduct from "../pages/HomePage.vue";
import OrderPage from "../pages/OrderPage.vue";
import OrderHistory from "../pages/OrderHistory.vue";
import OrderDetail from "../pages/OrderDetail.vue";
import AccountPage from "../pages/AccountPage.vue";
import UserProfileDetail from "../pages/UserProfileDetail.vue";
import PointPage from "../pages/PointPage.vue";
import SavedAddressPage from "../pages/SavedAddressPage.vue";
import PromotionPage from "../pages/PromotionPage.vue";



const routes = [
  { path: "/", component: ListProduct },
  { path: "/order", component: OrderPage },
  { path: "/orders", component: OrderHistory },
  { path: "/order-detail", component: OrderDetail },
  { path: "/account-info", component: AccountPage },
  { path: "/account-info-detail", component: UserProfileDetail },
  { path: "/point-page", component: PointPage },
  { path: "/address-save", component: SavedAddressPage },
  { path: "/promotion-page", component: PromotionPage },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
