<script setup>
/* eslint-disable */
import HeaderBar from "../components/HeaderBar.vue";
import { ref } from "vue";
import { getUser } from "../utils/user";

const user = getUser();

// tabs
const tab = ref("all"); // all | plus | minus

// Fake history (có thể thay bằng API sau)
const history = ref([
  {
    type: "minus",
    title: "Dùng điểm giảm giá",
    date: "18-9-2025",
    value: -10,
    icon: "/cart.png",
  },
  {
    type: "plus",
    title: "Mua hàng #HD123",
    date: "12-9-2025",
    value: user.totalOrder,
    icon: "/box.png",
  },
]);

function filteredList() {
  if (tab.value === "plus") return history.value.filter((x) => x.value > 0);
  if (tab.value === "minus") return history.value.filter((x) => x.value < 0);
  return history.value;
}
</script>

<template>
  <div class="page">
    <HeaderBar title="Tích điểm" />

    <!-- CARD TỔNG ĐIỂM -->
    <div class="point-card">
      <div class="star">★ Tổng điểm hiện có</div>
      <div class="point">{{ user.point }} điểm</div>
      <div class="sub">≈ {{ user.point * 100 }} VND giảm giá</div>
    </div>

    <!-- LỊCH SỬ -->
    <div class="section-title">Lịch sử</div>

    <!-- TAB FILTER -->
    <div class="tabs">
      <button
        class="tab"
        :class="{ active: tab === 'all' }"
        @click="tab = 'all'"
      >
        Tất cả
      </button>
      <button
        class="tab"
        :class="{ active: tab === 'plus' }"
        @click="tab = 'plus'"
      >
        + Điểm
      </button>
      <button
        class="tab"
        :class="{ active: tab === 'minus' }"
        @click="tab = 'minus'"
      >
        - Điểm
      </button>
    </div>

    <!-- LỊCH SỬ ĐIỂM -->
    <div class="history-list">
      <div
        class="history-item"
        v-for="item in filteredList()"
        :key="item.title"
      >
        <img :src="item.icon" class="h-icon" />

        <div class="h-info">
          <div class="h-title">{{ item.title }}</div>
          <div class="h-date">{{ item.date }}</div>
        </div>

        <div
          class="h-point"
          :class="item.value > 0 ? 'p-plus' : 'p-minus'"
        >
          {{ item.value > 0 ? "+" : "" }}{{ item.value }}
        </div>
      </div>
    </div>

    <!-- QUY TẮC -->
    <div class="rules">
      <div class="rules-title">QUY TẮC TÍCH ĐIỂM</div>

      <ul>
        <li>10.000 VND = 1 điểm</li>
        <li>1 điểm = 100 VND giảm giá</li>
        <li>Tích điểm cho hóa đơn giảm giá (✓)</li>
        <li>Tích điểm cho hóa đơn thanh toán bằng điểm (✓)</li>
        <li>Không tích cho hàng hoá giảm giá (✗)</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.page {
  background: #f2f4f7;
  min-height: 100vh;
  padding-bottom: 30px;
}

/* CARD ĐIỂM */
.point-card {
  background: linear-gradient(145deg, #f7f8fa, #dcdde1);
  margin: 16px;
  padding: 16px 20px;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.star {
  font-size: 14px;
  opacity: 0.7;
}

.point {
  font-size: 28px;
  font-weight: 700;
  color: #0a74ff;
  margin-top: 4px;
}

.sub {
  font-size: 12px;
  color: #666;
  margin-top: -4px;
}

/* SECTION TITLE */
.section-title {
  margin-left: 16px;
  margin-top: 6px;
  font-weight: 700;
}

/* TABS */
.tabs {
  display: flex;
  gap: 8px;
  margin: 10px 16px;
}

.tab {
  padding: 6px 14px;
  border-radius: 20px;
  border: none;
  background: #e8ecf2;
  color: #555;
  font-weight: 600;
}

.tab.active {
  background: #1e90ff;
  color: white;
}

/* HISTORY LIST */
.history-list {
  margin: 10px 16px;
}

.history-item {
  background: white;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.h-icon {
  width: 40px;
  margin-right: 12px;
}

.h-info {
  flex: 1;
}

.h-title {
  font-weight: 600;
  font-size: 15px;
}

.h-date {
  font-size: 12px;
  color: #888;
}

.h-point {
  width: 40px;
  height: 26px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
}

.p-plus {
  background: #dcffe1;
  color: #0aa200;
}

.p-minus {
  background: #ffe1e1;
  color: #ff2b2b;
}

/* RULES */
.rules {
  margin: 20px 16px;
  font-size: 14px;
}

.rules-title {
  font-weight: 700;
  margin-bottom: 6px;
}

.rules ul {
  padding-left: 18px;
}

.rules li {
  margin-bottom: 4px;
  color: #444;
}
</style>
