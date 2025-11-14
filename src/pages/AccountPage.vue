<script setup>
/* eslint-disable */
import { getUser } from "../utils/user";
import BottomNav from "../components/BottomNav.vue";
import HeaderBar from "../components/HeaderBar.vue";
import { useRouter } from "vue-router";

const user = getUser();
const router = useRouter();

</script>

<template>
  <div class="page">
<HeaderBar title="Tài khoản" />

<div
  class="account-card"
  @click="$router.push('/account-info-detail')"
>
  <img :src="user?.avatar || '/avatar.png'" class="avatar" />

  <div class="info">
    <div class="name">{{ user?.name }}</div>
    <div class="phone">{{ user?.phone }}</div>
  </div>

  <span class="arrow">›</span>
</div>


    <!-- MENU LIST -->
    <div class="menu">
        
      <div class="menu-item"@click="$router.push('/point-page')">
        <span class="icon star">★</span>
        <span class="text">Lịch sử tích điểm</span>
        <span class="arrow">›</span>
      </div>

          <div class="menu-item"@click="$router.push('/promotion-page')">

        <span class="icon gift">🎁</span>
        <span class="text">Ưu đãi</span>
        <span class="arrow">›</span>
      </div>

    <div class="menu-item"@click="$router.push('/address-save')">

        <span class="icon location">📍</span>
        <span class="text">Địa chỉ đã lưu</span>
        <span class="arrow">›</span>
      </div>
    </div>

    <BottomNav active="account" />
  </div>
</template>

<style scoped>

.title {
  font-size: 20px;
  font-weight: 700;
}

.right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
}

.divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.5);
}

/*==================== ACCOUNT CARD ====================*/
.account-card {
  margin: 16px;
  background: white;
  padding: 14px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
}

.avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 14px;
  border: 2px solid #eaeaea;
}

.info .name {
  font-size: 14px;
  color: #777;
}

.info .phone {
  font-size: 16px;
  font-weight: bold;
}

.arrow {
  margin-left: auto;
  font-size: 24px;
  color: #ccc;
}

/*==================== MENU LIST ====================*/
.menu {
  background: white;
  margin: 10px 0;
}

.menu-item {
  padding: 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
}

.menu-item:last-child {
  border-bottom: none;
}

.icon {
  font-size: 20px;
  margin-right: 14px;
  color: #2a8cfd;
}

.text {
  font-size: 15px;
  flex: 1;
}

</style>
