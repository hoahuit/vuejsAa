<script setup>
/* eslint-disable */
import { ref, watch } from "vue";

const props = defineProps({
  visible: Boolean,
  data: Object,
});

const emit = defineEmits(["close", "save"]);

// Form state
const form = ref({
  id: null,
  name: "",
  phone: "",
  address: "",
  note: "",
  isDefault: false,
});

// Khi mở modal → load dữ liệu
watch(
  () => props.visible,
  (val) => {
    if (val) {
      if (props.data) {
        form.value = { ...props.data };
      } else {
        form.value = {
          id: null,
          name: "",
          phone: "",
          address: "",
          note: "",
          isDefault: false,
        };
      }
    }
  }
);

function save() {
  emit("save", { ...form.value });
}
</script>

<template>
  <div v-if="visible" class="overlay" @click.self="emit('close')">
    <div class="modal">
      <div class="bar"></div>
      <h3>Chọn địa chỉ</h3>

      <label class="lbl">Tên</label>
      <input class="input" v-model="form.name" type="text" />

      <label class="lbl">Số điện thoại</label>
      <input class="input" v-model="form.phone" type="text" />

      <label class="lbl">Địa chỉ</label>
      <textarea class="input" v-model="form.address" rows="2"></textarea>

      <div class="default-row">
        <span>Đặt làm địa chỉ mặc định</span>
        <input type="checkbox" v-model="form.isDefault" />
      </div>

      <label class="lbl">Ghi chú khác</label>
      <input class="input" v-model="form.note" placeholder="Nhập ghi chú khác" />

      <div class="btn-row">
        <button class="btn cancel" @click="emit('close')">Hủy</button>
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
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.bar {
  width: 60px;
  height: 5px;
  background: #d8dce3;
  border-radius: 5px;
  margin: 0 auto 16px;
}

.lbl {
  font-size: 14px;
  font-weight: 600;
  margin: 10px 0 4px;
}

.input {
  width: 100%;
  background: #f7f9fc;
  border-radius: 10px;
  border: 1px solid #d8dce3;
  padding: 10px;
  font-size: 14px;
  margin-bottom: 8px;
}

.default-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 0;
}

.btn-row {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.btn {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
}

.cancel {
  background: #f1f1f5;
  margin-right: 10px;
}

.save {
  background: #1e90ff;
  color: white;
}
</style>
