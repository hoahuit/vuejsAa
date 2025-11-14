<script setup>
/* eslint-disable */
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  title: { type: String, default: "Thông tin đơn hàng" },
});

function goBack() {
  router.back();
}
function closePage() {
  router.push("/");
}
</script>

<template>
  <div class="header-bg">
    <div class="row">
      <button class="back-btn" @click="goBack">←</button>

      <span class="title">{{ title }}</span>

      <div class="btn-group">
        <button class="icon">⋯</button>
        <div class="divider"></div>
        <button class="icon" @click="closePage">✕</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Nền xanh + pattern giống iOrder */
.header-bg {
  width: 100%;
  background: #2ca6ff repeat;
  background-size: cover;
  background-position: center;
  border-bottom-left-radius: 22px;
  border-bottom-right-radius: 22px;
  position: relative;
  color: white;
}

/* Dòng nội dung chính */
.row {
  display: flex;
  align-items: center;
  width: 100%;
}

/* Nút back */
.back-btn {
  border: none;
  background: transparent;
  color: white;
  font-size: 24px;
  margin-right: 8px;
}

/* Tiêu đề */
.title {
  margin-top:16px;
  flex: 1;
  font-size: 18px;
  font-weight: 600;
  margin-left: 4px;
}

/* Cụm nút 3 chấm + X */
.btn-group {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.25);
  padding: 6px 12px;
  border-radius: 22px;
  backdrop-filter: blur(8px);
}

/* Icon */
.icon {
  border: none;
  background: transparent;
  color: white;
  font-size: 18px;
}

/* Gạch giữa */
.divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.5);
  margin: 0 6px;
}
</style>
