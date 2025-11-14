<script setup>
/* eslint-disable */

import { ref, computed, onMounted } from "vue";
import HeaderHome from "../components/HeaderHome.vue";
import CategoryList from "../components/CategoryList.vue";
import ProductCard from "../components/ProductCard.vue";
import BottomNav from "../components/BottomNav.vue";
import ProductDetailModal from "../components/ProductDetailModal.vue";
import { getShopInfo } from "../api/shop";
import { useRouter } from "vue-router";
const router = useRouter();

const categories = ref([]);
const products = ref([]); // sản phẩm đang hiển thị
const allProducts = ref([]); // tất cả sản phẩm từ API
const selectedCategory = ref(null); // category đang chọn

const showModal = ref(false);
const selectedProduct = ref(null);
const cart = ref([]);
const showCartModal = ref(false);

// ==============================
// LOAD API
// ==============================
onMounted(async () => {
  const res = await getShopInfo();

  // Load categories
  categories.value = res.data.categories.map((c) => ({
    id: c.id,
    name: c.name,
    image: c.image || "/cat.png",
  }));

  // Load products
  allProducts.value = res.data.products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    categoryId: p.categoryId,
    img: p.image || "/drink.png",
  }));

  // Mặc định hiển thị tất cả sản phẩm
  products.value = allProducts.value;
});

// ==============================
// LỌC THEO CATEGORY
// ==============================
function filterByCategory(catId) {
  selectedCategory.value = catId;

  products.value = allProducts.value.filter((p) => p.categoryId === catId);
}

// ==============================
// CART + PRODUCT DETAIL
// ==============================
function openProduct(item) {
  selectedProduct.value = item;
  showModal.value = true;
}

function addToCart(product) {
  cart.value.push(product);
  showModal.value = false;
}

const totalPrice = computed(() =>
  cart.value.reduce((s, i) => s + i.price, 0).toLocaleString("vi-VN")
);

function openCartModal() {
  showCartModal.value = true;
}

function closeCartModal() {
  showCartModal.value = false;
}
function goToOrder() {
  router.push({
    path: "/order",
    query: {
      cart: JSON.stringify(cart.value),
    },
  });
}
</script>

<template>
  <div class="container">
    <HeaderHome />

    <h3 class="section-title">Danh mục sản phẩm</h3>

    <!-- TRUYỀN CATEGORY + EVENT -->
    <CategoryList
      :categories="categories"
      :selectedCategory="selectedCategory"
      @select="filterByCategory"
    />

    <!-- PRODUCT LIST -->
    <div class="product-grid">
      <ProductCard
        v-for="item in products"
        :key="item.id"
        :item="item"
        :onClick="openProduct"
      />
    </div>

    <ProductDetailModal
      :visible="showModal"
      :item="selectedProduct"
      @close="showModal = false"
      @add="addToCart"
    />

    <!-- CART BAR -->
    <div v-if="cart.length > 0" class="cart-bar">
      <div class="left">
        <img src="/cart.png" class="cart-icon" />
        <span>{{ cart.length }} món – {{ totalPrice }} đ</span>
      </div>
      <button class="cart-btn" @click="openCartModal">Món đã chọn</button>
      <button class="cart-btn" @click="goToOrder">Thanh Toán</button>
    </div>

    <!-- CART MODAL -->
    <div
      v-if="showCartModal"
      class="modal-overlay"
      @click.self="closeCartModal"
    >
      <div class="modal-box">
        <h3>Sản phẩm đã chọn ({{ cart.length }})</h3>

        <div v-for="(item, idx) in cart" :key="idx" class="cart-item">
          <img :src="item.img" class="cart-item-img" />
          <div class="cart-item-info">
            <div class="cart-item-name">{{ item.name }}</div>
            <div class="cart-item-price">
              {{ item.price.toLocaleString("vi-VN") }} đ
            </div>
          </div>
        </div>

        <div style="margin-top: 16px; text-align: right; font-weight: bold">
          Tổng: {{ totalPrice }} đ
        </div>

        <button class="add-btn" style="width: 100%" @click="closeCartModal">
          Đóng
        </button>
      </div>
    </div>

    <BottomNav />
  </div>
</template>

<style>
.container {
  margin: auto;
  background: #f7f8fc;
  padding-bottom: 120px;
}
.banner-img {
  width: 100%;
  border-radius: 12px;
}
.section-title {
  font-size: 18px;
  font-weight: 600;
}
.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 100px;
}

/* GIỎ HÀNG */
.cart-bar {
  position: fixed;
  bottom: 62px;
  left: 0;
  width: 95%;
  background: #1e90ff;
  padding: 14px 18px;
  border-radius: 14px 14px 0 0;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-icon {
  width: 30px;
}

.cart-btn {
  background: white;
  color: #1e90ff;
  padding: 8px 14px;
  border-radius: 10px;
  font-weight: bold;
  border: none;
}
</style>

.modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.4);
display: flex; justify-content: center; align-items: flex-end; z-index: 999; }
.modal-box { width: 100%; background: white; border-radius: 20px 20px 0 0;
padding: 15px; max-height: 80vh; overflow-y: auto; } .cart-item { display: flex;
align-items: center; margin-bottom: 12px; } .cart-item-img { width: 50px;
height: 50px; object-fit: cover; border-radius: 8px; margin-right: 12px; }
.cart-item-info { flex: 1; } .cart-item-name { font-weight: 600; }
.cart-item-price { color: #ff7a00; }
