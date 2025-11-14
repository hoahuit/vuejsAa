<script setup>
/* eslint-disable */
import { ref } from "vue";

const props = defineProps({
  visible: Boolean,
});

const emit = defineEmits(["close", "save"]);

const name = ref("");
const phone = ref("");
const address = ref("");
const isDefault = ref(false);
const note = ref("");

function save() {
  if (!name.value || !phone.value || !address.value) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  emit("save", {
    id: Date.now(),
    name: name.value,
    phone: phone.value,
    address: address.value,
    note: note.value,
    isDefault: isDefault.value,
  });

  emit("close");
}
</script>

<template>
  <div v-if="visible" class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <h3 class="title">Chọn địa chỉ</h3>

      <!-- Tên -->
      <label class="label">Tên</label>
      <input type="text" v-model="name" class="input" placeholder="Nhập tên" />

      <!-- Số điện thoại -->
      <label class="label">Số điện thoại</label>
      <input
        type="tel"
        v-model="phone"
        class="input"
        placeholder="Nhập số điện thoại"
      />

      <!-- Địa chỉ -->
      <label class="label">Địa chỉ</label>
      <textarea
        v-model="address"
        class="textarea"
        placeholder="Nhập địa chỉ"
      ></textarea>

      <!-- Mặc định -->
      <div class="row">
        <span>Đặt làm địa chỉ mặc định</span>
        <input type="checkbox" v-model="isDefault" />
      </div>

      <!-- Ghi chú -->
      <label class="label">Ghi chú khác</label>
      <input
        type="text"
        v-model="note"
        class="input"
        placeholder="Nhập Ghi chú khác"
      />

      <!-- BUTTONS -->
      <div class="btn-row">
        <button class="btn cancel" @click="$emit('close')">Hủy</button>
        <button class="btn save" @click="save">Lưu</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  background: white;
  padding: 20px;
  border-radius: 20px 20px 0 0;
  animation: slide-up 0.25s ease;
}

.title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 14px;
}

.label {
  font-size: 14px;
  margin-top: 10px;
  display: block;
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 5px;
}

.textarea {
  width: 100%;
  padding: 10px;
  height: 70px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  margin-top: 5px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 0;
}

.btn-row {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.btn {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  font-weight: bold;
}

.cancel {
  background: #eee;
}

.save {
  background: #1e90ff;
  color: white;
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
</style>
