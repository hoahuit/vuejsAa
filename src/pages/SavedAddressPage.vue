<script setup>
/* eslint-disable */
import HeaderBar from "../components/HeaderBar.vue";
import EditAddressModal from "../components/EditAddressModal.vue";
import { ref } from "vue";
import { getUser } from "../utils/user";

const user = getUser();
// Fake data (sau có API bạn thay vào)
const addresses = ref([
  {
    id: 1,
    name: "Trúc Vân",
    phone: "0123456789",
    address: "Ấu cơ, Phường 14, Tân Phú, Hồ Chí Minh, Vietnam",
    isDefault: true,
  },
]);

const showModal = ref(false);
const editItem = ref(null);

function openAdd() {
  editItem.value = null;
  showModal.value = true;
}

function openEdit(addr) {
  editItem.value = { ...addr };
  showModal.value = true;
}

function deleteAddress(id) {
  addresses.value = addresses.value.filter((x) => x.id !== id);
}

function saveAddress(data) {
  if (data.id) {
    // update
    const idx = addresses.value.findIndex((x) => x.id === data.id);
    addresses.value[idx] = data;
  } else {
    // add
    data.id = Date.now();
    addresses.value.push(data);
  }

  showModal.value = false;
}
</script>

<template>
  <div class="page">
    <HeaderBar title="Địa chỉ đã lưu" />

    <!-- ADD NEW BUTTON -->
    <div class="add-box" @click="openAdd">
      <span class="plus">＋</span>
      <span>Thêm địa chỉ mới</span>
    </div>

    <!-- ADDRESS LIST -->
    <div v-for="item in addresses" :key="item.id" class="addr-card">
      <div class="top">
        <div class="name">{{ item.name }} - {{ item.phone }}</div>

        <div class="actions">
          <img
            src="/edit.png"
            class="act-icon"
            @click="openEdit(item)"
          />
          <img
            src="/delete.png"
            class="act-icon"
            @click="deleteAddress(item.id)"
          />
        </div>
      </div>

      <div class="address">{{ user.address }}</div>

      <span v-if="item.isDefault" class="default-tag">Mặc định</span>
    </div>

    <EditAddressModal
      :visible="showModal"
      :data="editItem"
      @close="showModal = false"
      @save="saveAddress"
    />
  </div>
</template>

<style scoped>


/* Add new button */
.add-box {
  background: white;
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding: 14px;
  font-weight: 600;
  margin-bottom: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  cursor: pointer;
}
.plus {
  color: #1e90ff;
  font-size: 20px;
  margin-right: 10px;
}

/* Address Card */
.addr-card {
  background: white;
  padding: 14px;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.name {
  font-weight: 700;
}

.actions {
  display: flex;
  gap: 10px;
}
.act-icon {
  width: 20px;
  cursor: pointer;
}

.address {
  font-size: 13px;
  margin-top: 6px;
  color: #515b76;
}

.default-tag {
  margin-top: 8px;
  display: inline-block;
  background: #ffd4d4;
  padding: 3px 10px;
  border-radius: 10px;
  color: #ff4949;
  font-size: 12px;
  font-weight: 600;
}
</style>
