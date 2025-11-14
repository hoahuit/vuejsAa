<script setup>
/* eslint-disable */
import { ref } from "vue";

const props = defineProps({
  visible: Boolean,
  selected: String,
});

const emit = defineEmits(["close", "update"]);

// Danh sách các phương thức thanh toán
const methods = [
  { id: "cod", name: "Thanh toán khi nhận hàng", icon: "/cash.png" },
  { id: "bank", name: "Chuyển khoản", icon: "/bank.png" },
  { id: "zalopay", name: "ZaloPay", icon: "/zalo.png" },
  { id: "momo", name: "MoMo", icon: "/momo.png" },
];

function choose(methodId) {
  emit("update", methodId);
  emit("close");
}
</script>

<template>
  <div v-if="visible" class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <h3 class="title">Phương thức thanh toán</h3>
      <p class="subtitle">Vui lòng chọn phương thức phù hợp</p>

      <div
        v-for="m in methods"
        :key="m.id"
        class="pay-row"
        @click="choose(m.id)"
      >
        <div class="left">
          <img :src="m.icon" class="icon" />
          <span>{{ m.name }}</span>
        </div>

        <input type="radio" :checked="selected === m.id" />
      </div>
    </div>
  </div>
</template>

<style>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 999;
}
.modal {
  width: 100%;
  padding: 20px;
  background: white;
  border-radius: 20px 20px 0 0;
  animation: slide-up 0.25s ease;
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
.title {
  font-size: 18px;
  font-weight: bold;
}
.subtitle {
  color: #777;
  margin-bottom: 14px;
}
.pay-row {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.icon {
  width: 26px;
}
</style>
