<script setup>
/* eslint-disable */
import HeaderBar from "../components/HeaderBar.vue";
import { ref } from "vue";

const activeTab = ref("all"); // all | used
const searchText = ref("");

// Fake data
const promotions = ref([
  {
    id: 1,
    expire: "30/09/2025",
    title: "Giảm giá 20%",
    desc: "Cho hóa đơn trên 1 triệu",
    status: "collect", // collect | saved | used
  },
  {
    id: 2,
    expire: "30/09/2025",
    title: "Giảm giá 1% cho sinh viên",
    desc: "cho sinh viên khi có giấy khen",
    status: "saved",
  },
]);

const usedPromotions = ref([
  {
    id: 3,
    usedDate: "30/09/2025",
    title: "Giảm giá 20%",
    desc: "Cho hóa đơn trên 1 triệu",
  },
]);

function changeTab(tab) {
  activeTab.value = tab;
}
</script>

<template>
  <div class="page">
    <HeaderBar title="Khuyến mãi" />

    <!-- TAB -->
    <div class="tab-bar">
      <div
        class="tab"
        :class="{ active: activeTab === 'all' }"
        @click="changeTab('all')"
      >
        Tất cả
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'used' }"
        @click="changeTab('used')"
      >
        Đã dùng
      </div>
    </div>

    <!-- SEARCH -->
    <div class="search-box">
      <input
        class="search-input"
        v-model="searchText"
        placeholder="Nhập mã khuyến mãi của bạn"
      />
      <img src="/search.png" class="search-icon" />
    </div>

    <!-- TAB: TẤT CẢ -->
    <div v-if="activeTab === 'all'">
      <div
        v-for="p in promotions"
        :key="p.id"
        class="promo-card"
      >
        <div class="expire">HSD: {{ p.expire }}</div>

        <div class="title">{{ p.title }}</div>
        <div class="desc">{{ p.desc }}</div>

        <button
          class="btn"
          :class="{
            collect: p.status === 'collect',
            saved: p.status === 'saved'
          }"
        >
          {{ p.status === "collect" ? "Thu thập" : "Đã lưu" }}
        </button>
      </div>
    </div>

    <!-- TAB: ĐÃ DÙNG -->
    <div v-else>
      <div v-for="u in usedPromotions" :key="u.id" class="used-card">
        <div class="used-row">
          <span class="used-date">Ngày sử dụng: {{ u.usedDate }}</span>
          <span class="used-tag">Đã áp dụng</span>
        </div>

        <div class="title">{{ u.title }}</div>
        <div class="desc">{{ u.desc }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

/* TAB */
.tab-bar {
  display: flex;
  background: white;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 12px;
}
.tab {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-weight: 600;
  color: #7b8ca9;
  border-radius: 10px;
}
.tab.active {
  background: #1e90ff;
  color: white;
}

/* SEARCH */
.search-box {
  position: relative;
  margin-bottom: 14px;
}
.search-input {
  width: 100%;
  padding: 10px 14px;
  padding-left: 38px;
  border-radius: 12px;
  border: 1px solid #d7dce5;
  background: white;
}
.search-icon {
  width: 18px;
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
}

/* PROMO CARD */
.promo-card {
  background: white;
  padding: 14px;
  border-radius: 12px;
  margin-bottom: 12px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.expire {
  font-size: 12px;
  color: #7f8aa5;
  margin-bottom: 6px;
}
.title {
  font-weight: 700;
  font-size: 15px;
}
.desc {
  font-size: 13px;
  color: #606b85;
  margin-bottom: 10px;
}

/* BUTTON */
.btn {
  position: absolute;
  right: 14px;
  top: 14px;
  padding: 5px 12px;
  border-radius: 10px;
  border: none;
  font-size: 13px;
  font-weight: 600;
}
.btn.collect {
  background: #e8f1ff;
  color: #1e90ff;
}
.btn.saved {
  background: #f1f2f4;
  color: #6f7480;
}

/* USED TAB */
.used-card {
  background: white;
  padding: 14px;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.used-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.used-date {
  font-size: 12px;
  color: #1e90ff;
}
.used-tag {
  font-size: 12px;
  color: #ff6b6b;
}
</style>
