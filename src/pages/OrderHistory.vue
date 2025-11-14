<script setup>
/* eslint-disable */
import { ref, onMounted } from "vue";
import BottomNav from "../components/BottomNav.vue";
import HeaderBar from "../components/HeaderBar.vue";
import { getOrderHistory } from "../api/shop";
import { getUser } from "../utils/user";

const user = getUser();
const customerId = user.id;

const orders = ref([]);

onMounted(async () => {
  const res = await getOrderHistory(customerId);
  orders.value = res.data.data || [];
});
</script>

<template>
  <div class="page">
    <HeaderBar />

    <!-- TAB NAV -->
    <div class="tabs">
      <div class="tab active">Chờ xác nhận</div>
      <div class="tab">Chờ lấy hàng</div>
      <div class="tab">Chờ giao hàng</div>
      <div class="tab">Đã giao</div>
    </div>

    <div
      v-for="item in orders"
      :key="item.id"
      class="order-card"
      @click="$router.push('/order-detail?orderId=' + item.id)"
    >
      <!-- MÃ ĐƠN + TIME -->
      <div class="order-row">
        <div class="order-code">{{ item.code }}</div>
        <div class="order-time">{{ item.transactionDate }}</div>
      </div>

      <!-- PRODUCT -->
      <div class="product-block">
        <div class="product-title">Sản phẩm</div>

        <div class="product-item">
          <img src="/drink.png" class="product-img" />
          <div class="product-info">
            <div class="product-name">Khoai tây chiên</div>
            <div class="product-qty">x1</div>
          </div>
          <div class="product-price">100.000 đ</div>
        </div>

        <div class="note-title">Ghi chú</div>
      </div>

      <!-- FOOTER -->
      <div class="footer-row">
        <div class="tag cod">COD</div>

        <div
          class="tag status"
          :class="item.paymentStatus === '1' ? 'paid' : ''"
        >
          {{ item.paymentStatus === "1" ? "Đã thanh toán" : "Chưa thanh toán" }}
        </div>

        <div class="total-box">
          <span>Thành tiền</span>
          <b>{{ item.total.toLocaleString("vi-VN") }}</b>
        </div>
      </div>
    </div>

    <BottomNav active="orders" />
  </div>
</template>

<style scoped>
/* =============== PAGE =============== */
.page {
  background: #f2f4f7;
  min-height: 100vh;
  padding-bottom: 90px;
  padding-top: 5px;
}

/* =============== TABS =============== */
.tabs {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px 0;
  gap: 12px;
  padding-left: 14px;
}

.tab {
  padding: 7px 16px;
  background: #e9edf5;
  border-radius: 20px;
  font-size: 14px;
  color: #6a6a6a;
}

.tab.active {
  background: #2b9bfd;
  color: white;
  font-weight: 600;
}

/* =============== ORDER CARD =============== */
.order-card {
  background: white;
  padding: 14px;
  border-radius: 12px;
  margin: 12px 14px;
  box-shadow: 0 3px 15px rgba(0,0,0,0.06);
}

/* TOP ROW */
.order-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.order-code {
  font-weight: 700;
  font-size: 16px;
}

.order-time {
  font-size: 13px;
  color: #7f7f7f;
}

/* =============== PRODUCT BLOCK =============== */
.product-block {
  background: white;
}

.product-title {
  font-size: 14px;
  color: #444;
  margin-bottom: 4px;
}

.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.product-img {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 12px;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 14px;
  font-weight: 600;
}

.product-qty {
  font-size: 13px;
  color: #777;
}

.product-price {
  font-weight: bold;
  font-size: 14px;
}

/* NOTE */
.note-title {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}

/* =============== FOOTER =============== */
.footer-row {
  display: flex;
  align-items: center;
  margin-top: 16px;
  gap: 10px;
}

.tag {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
}

.cod {
  background: #d8f0ff;
  color: #007bff;
}

.status {
  background: #e7ecf7;
  color: #2b57e7;
}

.status.paid {
  background: #d4ffdf;
  color: #0a9b2d;
}

/* TOTAL PRICE */
.total-box {
  margin-left: auto;
  text-align: right;
}

.total-box span {
  font-size: 13px;
  color: #666;
}

.total-box b {
  display: block;
  font-size: 17px;
  margin-top: 2px;
}
</style>
