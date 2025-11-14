<script setup>
/* eslint-disable */
import { ref } from "vue";
import HeaderBar from "../components/HeaderBar.vue";
import { getUser } from "../utils/user";

const u = getUser();

const user = ref({
  name: u?.name || "",
  phone: u?.phone || "",
  email: u?.email || "",
  birthday: u?.birthday || "",
  gender: u?.gender === "F" ? "Nữ" : "Nam",
  avatar: u?.avatar || null,
});

function updateProfile() {
  alert("Đã lưu thông tin (demo)");
}
</script>


<template>
  <div class="page" v-if="!loading">
    <HeaderBar title="Cập nhật thông tin" />

    <!-- AVATAR -->
    <div class="avatar-wrap">
      <img
        class="avatar"
        :src="user.avatar || '/default-avatar.png'"
      />
    </div>

    <!-- FORM -->
    <div class="form-box">

      <div class="form-title">Thông tin cá nhân</div>

      <!-- HỌ TÊN -->
      <label class="label">Họ và tên *</label>
      <input class="input" v-model="user.name" type="text" />

      <!-- SĐT -->
      <label class="label">Số điện thoại *</label>
      <div class="phone-box">
        <span class="phone-prefix">+84</span>
        <input class="phone-input" v-model="user.phone" type="text" />
      </div>

      <!-- EMAIL -->
      <label class="label">Email</label>
      <input class="input" v-model="user.email" type="email" placeholder="Nhập địa chỉ email" />

      <!-- NGÀY SINH + GIỚI TÍNH -->
    <label class="label">Ngày sinh</label>
    <input class="input" type="date" v-model="user.birthday" />

    <label class="label">Giới tính</label>
    <select v-model="user.gender" class="input" style="width: 100%">
      <option value="Nữ">Nữ</option>
      <option value="Nam">Nam</option>
    </select>

    </div>

    <!-- BUTTON -->
    <button class="btn-confirm" @click="updateProfile">Xác nhận</button>
  </div>
</template>

<style scoped>/* ====================== PAGE ====================== */
.page {
  background: #f2f4f7;
  padding-bottom: 70px;
  font-family: "Inter", sans-serif;
}

/* ====================== AVATAR ====================== */
.avatar-wrap {
  display: flex;
  justify-content: center;
  margin-top: 18px;
}

.avatar {
  width: 110px;
  height: 110px;
  border-radius: 100%;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

/* ====================== FORM ====================== */
.form-box {
  background: white;
  margin: 16px;
  padding: 18px;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.form-title {
  font-weight: 700;
  font-size: 17px;
  margin-bottom: 14px;
  color: #111;
}

.label {
  font-size: 14px;
  font-weight: 600;
  display: block;
  margin: 8px 0 6px;
}

/* ====================== INPUT ====================== */
.input {
  width: 91%;
  padding: 11px 14px;
  border: 1px solid #d5ddea;
  border-radius: 10px;
  font-size: 14px;
  background: #f8fafc;
  outline: none;
}

/* BOX PHONE */
.phone-box {
  width: 100%;
  display: flex;
  border: 1px solid #d5ddea;
  border-radius: 10px;
  background: #f8fafc;
}

.phone-prefix {
  padding: 11px 12px;
  background: #eaf2ff;
  color: #3a7bfd;
  font-weight: 600;
  border-right: 1px solid #c9d7f5;
  display: flex;
  align-items: center;
}

.phone-input {
  flex: 1;
  padding: 0 12px;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
}

/* ====================== ROW 2 COLUMN ====================== */

/* ====================== BUTTON ====================== */
.btn-confirm {
  width: calc(100% - 34px);
  margin: 20px 17px;
  background: #2a7bff;
  color: white;
  border: none;
  padding: 12px 0;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(42, 123, 255, 0.3);
}

</style>
