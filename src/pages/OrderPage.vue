<script setup>
/* eslint-disable */
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import PaymentMethodModal from "../components/PaymentMethodModal.vue";
import AddressSelectModal from "../components/AddressSelectModal.vue";
import HeaderBar from "../components/HeaderBar.vue";
import AddAddressModal from "../components/AddAddressModal.vue";

const day = ref("");
const hour = ref("");
const showPaymentModal = ref(false);
const selectedPayment = ref("cod");
const showAddressModal = ref(false);
const showAddModal = ref(false);
const cart = ref([]);
const route = useRoute();
const showSuccess = ref(false);

onMounted(() => {
  if (route.query.cart) {
    cart.value = JSON.parse(route.query.cart);
  }
});
function placeOrder() {
  showSuccess.value = true;
}
function addNewAddress() {
  showAddModal.value = true;
}

function saveNewAddress(addr) {
  addressList.value.push(addr);
  selectedAddress.value = addr;
  showAddModal.value = false; // đóng modal sau khi lưu
}
const selectedAddress = ref({
  id: 1,
  name: "Trúc Vân",
  phone: "0123456789",
  address: "123 Nguyễn Văn Cừ, Q.5, TP.HCM",
});

const addressList = ref([
  {
    id: 1,
    name: "Trúc Vân",
    phone: "0123456789",
    address: "123 Nguyễn Văn Cừ, Q.5, TP.HCM",
  },
  {
    id: 2,
    name: "Nguyễn An",
    phone: "0909123456",
    address: "45 Hoàng Sa, Quận 1",
  },
]);
const dayOptions = ["Hôm nay", "Ngày mai", "Ngày kia"];

const hourOptions = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
];

function confirmTime() {
  if (day.value && hour.value) {
    selectedTime.value = `${day.value} • ${hour.value}`;
    showTimeModal.value = false;
  }
}

const mode = ref("pickup"); // pickup | delivery
const showTimeModal = ref(false);
const selectedTime = ref("");

const usePoint = ref(false);

// Tổng tiền
const totalPrice = computed(() =>
  cart.value.reduce((s, i) => s + (i.price || 0), 0)
);

// Phí giao hàng
const shippingFee = computed(() => (mode.value === "delivery" ? 15000 : 0));

// Điểm trừ
const pointUsed = computed(() => (usePoint.value ? 10000 : 0));

// Tổng thanh toán
const totalPay = computed(
  () => totalPrice.value + shippingFee.value - pointUsed.value
);
</script>

<template>
  <div class="order-wrap">
    <!-- HEADER -->
    <HeaderBar title="Thông tin đơn hàng" />

    <!-- DANH SÁCH SẢN PHẨM -->
    <div class="card">
      <h3>Sản phẩm đã chọn ({{ cart.length }})</h3>

      <div v-for="item in cart" :key="item.id" class="prod-row">
        <img :src="item.img" />
        <div class="prod-info">
          <div class="prod-name">{{ item.name }}</div>
          <div class="prod-note">Không ghi chú</div>
        </div>
        <span class="prod-price"
          >{{ item.price.toLocaleString("vi-VN") }}đ</span
        >
      </div>
    </div>

    <!-- HÌNH THỨC GIAO HÀNG -->
    <div class="card">
      <h3>Hình thức giao hàng</h3>

      <div class="mode-box">
        <button
          class="mode-btn"
          :class="{ active: mode === 'delivery' }"
          @click="mode = 'delivery'"
        >
          Giao hàng
        </button>

        <button
          class="mode-btn"
          :class="{ active: mode === 'pickup' }"
          @click="mode = 'pickup'"
        >
          Tự đến lấy
        </button>
      </div>
    </div>

    <!-- PICKUP / DELIVERY BLOCK -->
    <div class="card">
      <!-- Pick up tại cửa hàng -->
      <div v-if="mode === 'pickup'">
      <div class="section-title">Vị trí cửa hàng</div>
      <div class="row info-row">
        <img src="/location.png" class="icon icon-blue" />
        <div class="info-text">
          <div class="info-main">234 Nguyễn Duy Trinh</div>
          <div class="info-sub">Phường Bình Trưng, Quận 2, TP.HCM</div>
        </div>
      </div>

      <!-- THỜI GIAN NHẬN HÀNG (DÙNG CHUNG CHO CẢ 2 TAB) -->
      <div class="section-title mt-12">Thời gian nhận hàng</div>
        <div class="row clickable" @click="showTimeModal = true">
          <img src="/clock.png" class="icon" />
          <div>
            {{ selectedTime || "Vui lòng chọn thời gian nhận hàng" }}
          </div>
        </div>
      </div>

      <!-- Delivery -->
      <div v-else>
      <div class="section-title">Vị trí cửa hàng</div>
      <div class="row info-row">
        <img src="/location.png" class="icon icon-blue" />
        <div class="info-text">
          <div class="info-main">234 Nguyễn Duy Trinh</div>
          <div class="info-sub">Phường Bình Trưng, Quận 2, TP.HCM</div>
        </div>
      </div>
        <h3>Địa chỉ giao hàng</h3>
        <div class="row clickable" @click="showAddressModal = true">
          <img src="/location.png" class="icon" />
          <div>
            {{ selectedAddress.name }} - {{ selectedAddress.phone }}<br />
            <span class="sub">{{ selectedAddress.address }}</span>
          </div>
        </div>
        <AddressSelectModal
          :visible="showAddressModal"
          :selected="selectedAddress"
          :list="addressList"
          @close="showAddressModal = false"
          @update="(addr) => (selectedAddress = addr)"
          @addNew="showAddModal = true"
          @edit="editAddress"
        />

        <AddAddressModal
          :visible="showAddModal"
          @close="showAddModal = false"
          @save="saveNewAddress"
        />

      </div>
    </div>

    <!-- PHƯƠNG THỨC THANH TOÁN -->
    <div class="card">
      <div class="row clickable" @click="showPaymentModal = true">
        <img src="/cash.png" class="icon" />
        <div>
          {{
            {
              cod: "Thanh toán khi nhận hàng",
              bank: "Chuyển khoản",
              zalopay: "ZaloPay",
              momo: "MoMo",
            }[selectedPayment]
          }}
        </div>
      </div>
    </div>

    <PaymentMethodModal
      :visible="showPaymentModal"
      :selected="selectedPayment"
      @close="showPaymentModal = false"
      @update="selectedPayment = $event"
    />

    <!-- KHUYẾN MÃI -->
    <div class="card">
      <h3>Khuyến mãi</h3>
      <div class="row">
        <img src="/coupon.png" class="icon" />
        <div>Mã khuyến mãi</div>
      </div>

      <div class="usepoint">
        Dùng điểm tích lũy
        <input type="checkbox" v-model="usePoint" />
      </div>
    </div>

    <!-- CHI TIẾT THANH TOÁN -->
    <div class="card">
      <h3>Chi tiết thanh toán</h3>

      <div class="pay-row">
        <span>Tổng tiền</span>
        <span>{{ totalPrice.toLocaleString("vi-VN") }} đ</span>
      </div>

      <div class="pay-row">
        <span>Khuyến mãi</span>
        <span>0 đ</span>
      </div>

      <div class="pay-row">
        <span>Điểm sử dụng</span>
        <span>-{{ pointUsed.toLocaleString("vi-VN") }} đ</span>
      </div>

      <div class="pay-row" v-if="mode === 'delivery'">
        <span>Phí giao hàng</span>
        <span>{{ shippingFee.toLocaleString("vi-VN") }} đ</span>
      </div>

      <div class="pay-total">
        <span>Tổng thanh toán</span>
        <span>{{ totalPay.toLocaleString("vi-VN") }} đ</span>
      </div>
    </div>

  <button class="order-btn" @click="placeOrder">Đặt hàng</button>
<!-- POPUP ĐẶT THÀNH CÔNG -->
<div v-if="showSuccess" class="success-overlay">
  <div class="success-box">
    <h2 class="success-title">Đặt món thành công</h2>
    <p class="success-msg">
      Cảm ơn bạn đã đặt món! <br />
      Nhà bếp đang chuẩn bị món của bạn. <br />
      Vui lòng đợi trong giây lát nhé!
    </p>

    <img class="success-avatar" src="/avatar.png" />

    <div class="success-actions">
      <button class="btn-gray" @click="showSuccess = false">
        Trở về trang chủ
      </button>

      <button class="btn-blue" @click="$router.push('/orders')">
        Xem hóa đơn
      </button>
    </div>
  </div>
</div>

  </div>
  <div
    v-if="showTimeModal"
    class="modal-overlay"
    @click.self="showTimeModal = false"
  >
    <div class="time-modal">
      <h3>Chọn thời gian nhận hàng</h3>

      <!-- Ngày -->
      <label>Ngày</label>
      <select v-model="day" class="select-box">
        <option v-for="d in dayOptions" :value="d">{{ d }}</option>
      </select>

      <!-- Giờ -->
      <label>Giờ</label>
      <select v-model="hour" class="select-box">
        <option v-for="h in hourOptions" :value="h">{{ h }}</option>
      </select>

      <button class="confirm-btn" @click="confirmTime">Xác nhận</button>
    </div>
  </div>
</template>

<style>
/* Overlay mờ */
.success-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

/* Hộp popup */
.success-box {
  width: 80%;
  background: white;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  animation: fadeScale 0.25s ease;
  position: relative;
}

/* Animation popup */
@keyframes fadeScale {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}

.success-title {
  font-size: 18px;
  font-weight: 700;
}

.success-msg {
  font-size: 14px;
  color: #555;
  margin: 10px 0 16px;
  line-height: 1.4;
}

/* Avatar tròn */
.success-avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin: 8px auto;
  display: block;
  border: 2px solid white;
  box-shadow: 0 3px 8px rgba(0,0,0,0.2);
}

/* Button group */
.success-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 14px;
}

/* Nút style */
.btn-gray {
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid #d0d4dd;
  background: #f2f4f7;
  color: #333;
  font-size: 14px;
}

.btn-blue {
  padding: 8px 14px;
  border-radius: 10px;
  background: #1e90ff;
  color: white;
  font-size: 14px;
  border: none;
}

.order-wrap {
  padding: 3px;
  background: #f3f4f6;
}

/* Card */
.card {
  background: white;
  padding: 14px;
  margin-top: 14px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

h3 {
  margin-bottom: 10px;
  font-size: 16px;
}

/* Product row */
.prod-row {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
.prod-row:last-child {
  border-bottom: none;
}
.prod-row img {
  width: 55px;
  height: 55px;
  border-radius: 10px;
  margin-right: 10px;
}
.prod-info {
  flex: 1;
}
.prod-note {
  font-size: 12px;
  color: #777;
}
.prod-price {
  font-weight: bold;
}

/* Delivery mode buttons */
.mode-box {
  display: flex;
  gap: 10px;
}
.mode-btn {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #1e90ff;
  background: white;
  font-weight: bold;
}
.mode-btn.active {
  background: #1e90ff;
  color: white;
}

/* Row item */
.row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
}
.icon {
  width: 20px;
}

/* Payment breakdown */
.pay-row {
  display: flex;
  justify-content: space-between;
  margin: 6px 0;
}
.pay-total {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-weight: bold;
  font-size: 16px;
}

/* Order button */
.order-btn {
  width: 100%;
  margin-top: 20px;
  padding: 14px;
  background: #1e90ff;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: bold;
}
.clickable {
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 999;
}

.time-modal {
  width: 100%;
  background: white;
  padding: 20px;
  border-radius: 20px 20px 0 0;
  animation: slide-up 0.3s ease;
}

@keyframes slide-up {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.select-box {
  width: 100%;
  padding: 10px;
  margin: 10px 0 18px 0;
  border-radius: 10px;
  border: 1px solid #ddd;
}
.section-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
}

.info-row {
  background: #f7f8fb;
  border-radius: 10px;
  padding: 10px 12px;
}

.icon-blue {
  width: 22px;
}

.info-text {
  font-size: 13px;
}

.info-main {
  font-weight: 600;
}

.info-sub {
  font-size: 12px;
  color: #8089a5;
}

.mt-12 {
  margin-top: 12px;
}

.mt-16 {
  margin-top: 16px;
}

.placeholder-text {
  color: #c0c5d5;
  font-weight: 400;
}

.confirm-btn {
  width: 100%;
  background: #1e90ff;
  padding: 12px;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
}
</style>
