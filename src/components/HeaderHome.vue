<script setup>
/* eslint-disable */
import { getUser } from "../utils/user";

const user = getUser(); // lấy từ session
</script>

<template>
  <div class="header-bg">
    <div class="top-row">
      <div class="left">
        <img :src="user?.avatar || '/avatar.png'" class="avatar" />

        <div class="welcome">
          <div class="hi">Chào mừng trở lại</div>
          <div class="name">{{ user?.name }}</div>
        </div>
      </div>

      <div class="btn-group">
        <button class="icon">⋯</button>
        <div class="divider"></div>
        <button class="icon">✕</button>
      </div>
    </div>

    <div class="banner"></div>
  </div>
</template>

<style scoped>
.header-bg {
  width: 100%;
  background: #2ca6ff; /* pattern nền nếu có */
  background-size: cover;
  background-position: center;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  color: white;
  position: relative;
  overflow: hidden;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  background: #eaeaea;
}

.hi {
  font-size: 13px;
  opacity: 0.9;
  margin-bottom: 2px;
}

.name {
  font-size: 18px;
  font-weight: 700;
  margin-top: -2px;
}

.btn-group {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.18);
  padding: 6px 12px;
  border-radius: 22px;
  backdrop-filter: blur(8px);
}

.icon {
  border: none;
  background: transparent;
  color: white;
  font-size: 18px;
  padding: 0 6px;
}

.divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.45);
  margin: 0 6px;
}

.banner {
  margin: 14px 0 0 0;
  width: 100%;
  height: 120px;
  background-image: url("@/assets/banner.jpg");
  background-size: cover;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(44, 166, 255, 0.08);
}

.search-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: -22px;
}

.search-box {
  width: 94%;
  height: 50px;
  background: white;
  border-radius: 28px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 0 18px;
  gap: 10px;
  position: relative;
}

.search-icon {
  width: 22px;
}

.search-box input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 15px;
  background: transparent;
  color: #222;
}
</style>
