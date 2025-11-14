<script setup>
/* eslint-disable */
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import HeaderBar from "../components/HeaderBar.vue";
import { getOrderDetail } from "../api/shop";

const route = useRoute();
const orderId = route.query.orderId;

const loading = ref(true);
const order = ref({});
const items = ref([]);
const histories = ref([]);

onMounted(async () => {
  const res = await getOrderDetail(orderId);
  debugger
    const raw = res.data;

    // xoá ký tự rác "{}" ở đầu
    const cleanJson = raw.replace(/^{}\s*/, "");

    // parse JSON thành object
    const data = JSON.parse(cleanJson);

    order.value = data.order || {};
    items.value = data.details || [];
    histories.value = data.histories || [];

    loading.value = false;
    });

function money(n) {
  return (n || 0).toLocaleString("vi-VN");
}
</script>
<template>
  <div class="page" v-if="!loading">
    <HeaderBar title="Chi tiết đơn" />
    <div class="card">

<!-- TRẠNG THÁI -->
<div class="status-container">
  <div class="status-label">Trạng thái</div>

  <div class="status-tabs">
    <div
      class="tab"
      :class="{ activeBlue: order.paymentStatus !== '1' }"
    >
      Chưa thanh toán
    </div>

    <div
      class="tab"
      :class="{ activeOrange: order.status === 'complete' }"
    >
      Đang giao hàng
    </div>
  </div>
</div>

    </div>

    <!-- THÔNG TIN ĐƠN HÀNG -->
    <div class="card">
      <div class="card-title">Thông tin đơn hàng</div>

      <div class="row">
        <span class="label">Mã đơn hàng</span>
        <span class="value">{{ order.code }}</span>
      </div>

      <div class="row">
        <span class="label">Ngày đặt hàng</span>
        <span class="value">{{ order.transactionDate }}</span>
      </div>

      <div class="row">
        <span class="label">Phương thức thanh toán</span>
        <span class="value">{{ order.paymentMethod?.toUpperCase() }}</span>
      </div>

      <div class="row">
        <span class="label">Phương thức vận chuyển</span>
        <span class="value">Giao hàng tận nơi</span>
      </div>
    </div>

    <!-- THÔNG TIN VẬN CHUYỂN -->
    <div class="card">
      <div class="card-title">Thông tin vận chuyển</div>

      <div class="ship-type">Giao hàng tiết kiệm</div>

      <div class="ship-status-row">
        <span class="truck">🚚</span>
        <span class="ship-status"
          >{{ order.status === "complete" ? "Đang giao hàng" : "Chờ xử lý" }}</span
        >
        <span class="ship-time">{{ order.transactionDate }}</span>
      </div>
    </div>

    <!-- ĐỊA CHỈ NHẬN HÀNG -->
    <div class="card">
      <div class="card-title">Địa chỉ nhận hàng</div>

      <div class="address-row">
        <span class="icon">📍</span>
        <div>
          <div class="address-name">
            {{ order.customerName }} ({{ order.customerPhone }})
          </div>
          <div class="address-text">
            {{ order.customerAddress || "Không có địa chỉ" }}
          </div>
        </div>
      </div>
    </div>

    <!-- SẢN PHẨM -->
    <div class="card">
      <div class="card-title">Sản phẩm</div>

      <div v-for="p in items" :key="p.id" class="product-row">
        <img :src="p.productImage || '/drink.png'" class="p-img" />

        <div class="p-info">
          <div class="p-name">{{ p.productName }}</div>
          <div class="p-sub">{{ p.productUnit }}</div>
        </div>

        <div class="p-qty">x{{ p.qty }}</div>
        <div class="p-price">{{ money(p.total) }}</div>
      </div>
    </div>

    <!-- TỔNG CỘNG -->
    <div class="card">
      <div class="card-title">Tổng cộng</div>

      <div class="row">
        <span>Tổng tiền hàng</span>
        <span>{{ money(order.total) }}</span>
      </div>

      <div class="row">
        <span>Phí vận chuyển</span>
        <span>20,000</span>
      </div>

      <div class="row">
        <span>Khuyến mãi</span>
        <span>0</span>
      </div>

      <div class="total-final">
        <span>Thành tiền:</span>
        <b>{{ money(order.total) }}</b>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* TITLE */
.status-container {
  padding: 10px 16px 0 16px;
}

.status-label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

/* TABS WRAPPER */
.status-tabs {
  display: flex;
  gap: 8px;
}

/* TAB BASE */
.tab {
  padding: 6px 14px;
  background: #e9f0fb; /* xanh nhạt */
  border-radius: 20px;
  font-size: 13px;
  color: #5d7ca3;
  font-weight: 500;
}

/* ACTIVE BLUE */
.activeBlue {
  background: #cfe3ff !important;
  color: #2e77ff !important;
  font-weight: 600;
}

/* ACTIVE ORANGE */
.activeOrange {
  background: #ffe1cc !important;
  color: #ff8a3d !important;
  font-weight: 600;
}

.page {
  background: #f4f6f9;
  min-height: 100vh;
  padding-bottom: 80px;
}

/* ========================
   STATUS BAR
   ======================== */
.status-tabs {
  display: flex;
  gap: 10px;
  padding: 12px 16px 0 16px;
}

.tab {
  padding: 6px 16px;
  border-radius: 18px;
  font-size: 13px;
  background: #eef2f6;
  color: #777;
  font-weight: 500;
}

.tab.active {
  background: #ffb48a;
  color: white;
  font-weight: 600;
}

.tab:first-child.active {
  background: #8cbcff;
  color: white;
}

/* ========================
   CARD WRAPPER
   ======================== */
.card {
  background: white;
  margin: 12px 14px;
  padding: 16px;
  border-radius: 14px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
}

.card-title {
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 12px;
  color: #333;
}

/* ========================
   ROW
   ======================== */
.row {
  display: flex;
  justify-content: space-between;
  margin: 6px 0;
  font-size: 14px;
}

.label {
  color: #8b8b8b;
}

.value {
  color: #333;
  font-weight: 600;
}

/* ========================
   SHIPPING SECTION
   ======================== */
.ship-type {
  font-size: 14px;
  margin-bottom: 6px;
  color: #333;
}

.ship-status-row {
  margin-top: 4px;
  display: flex;
  align-items: center;
}

.truck {
  font-size: 20px;
  margin-right: 6px;
}

.ship-status {
  color: #2f7bff;
  font-weight: 600;
}

.ship-time {
  margin-left: auto;
  font-size: 13px;
  color: #777;
}

/* ========================
   ADDRESS
   ======================== */
.address-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-top: 4px;
}

.icon {
  font-size: 22px;
  margin-top: 2px;
}

.address-name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 2px;
}

.address-text {
  font-size: 14px;
  color: #666;
  line-height: 20px;
}

/* ========================
   PRODUCT LIST
   ======================== */
.product-row {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f1f1f1;
}

.product-row:last-child {
  border-bottom: none;
}

.p-img {
  width: 62px;
  height: 62px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 14px;
}

.p-info {
  flex: 1;
}

.p-name {
  font-weight: 600;
  font-size: 15px;
  color: #333;
}

.p-sub {
  font-size: 13px;
  color: #9a9a9a;
}

.p-qty {
  font-size: 13px;
  margin-right: 10px;
  color: #555;
}

.p-price {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

/* ========================
   TOTAL SECTION
   ======================== */
.total-final {
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #eee;
  font-size: 16px;
  color: #333;
}

.total-final b {
  font-size: 17px;
  color: black;
}

</style>
