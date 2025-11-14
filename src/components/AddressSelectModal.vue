<script setup>
/* eslint-disable */

const props = defineProps({
  visible: Boolean,
  selected: Object,
  list: Array,
});

const emit = defineEmits(["close", "update", "addNew", "edit"]);

function choose(addr) {
  emit("update", addr);
  emit("close");
}
</script>

<template>
  <div v-if="visible" class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <h3 class="title">Chọn địa chỉ</h3>

      <!-- GỌI MODAL THÊM ĐỊA CHỈ MỚI (emit ra ngoài) -->
      <div class="add-new" @click="$emit('addNew')">
        <span class="plus">+</span> Thêm địa chỉ mới
      </div>

      <div
        v-for="addr in list"
        :key="addr.id"
        class="addr-row"
        @click="choose(addr)"
      >
        <div class="left">
          <div class="name">{{ addr.name }} - {{ addr.phone }}</div>
          <div class="address">{{ addr.address }}</div>
        </div>

        <div class="actions">
          <img src="/edit.png" class="icon" @click.stop="$emit('edit', addr)" />
          <input type="radio" :checked="selected?.id === addr.id" />
        </div>
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
  background: white;
  border-radius: 20px 20px 0 0;
  padding: 20px;
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
  margin-bottom: 16px;
}

.add-new {
  padding: 12px;
  border: 1px solid #1e90ff;
  border-radius: 10px;
  color: #1e90ff;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  cursor: pointer;
}
.plus {
  font-size: 20px;
}

.addr-row {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.name {
  font-weight: bold;
}
.address {
  color: #777;
  font-size: 13px;
}
.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.icon {
  width: 20px;
  cursor: pointer;
}
</style>
