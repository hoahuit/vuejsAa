<script setup>
/* eslint-disable */
import { ref, watch } from "vue";

const props = defineProps({
  visible: Boolean,
  item: Object,
});

const qty = ref(1);

watch(
  () => props.visible,
  () => {
    qty.value = 1;
  }
);
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-box">
      <!-- ẢNH SẢN PHẨM -->
      <img :src="item.img" class="detail-img" />

      <!-- TÊN + GIÁ -->
      <div class="info-block">
        <h3 class="detail-title">{{ item.name }}</h3>
        <p class="detail-price">{{ item.price.toLocaleString("vi-VN") }} đ</p>
      </div>

      <!-- CHỌN OPTION -->
      <div class="option-block">
        <h4 class="option-title">Chọn hương vị *</h4>

        <label class="option-row">
          <input type="radio" name="opt" />
          <span>Vị phô mai</span>
          <span class="opt-price">1.000</span>
        </label>

        <label class="option-row">
          <input type="radio" name="opt" />
          <span>Vị kim chi</span>
          <span class="opt-price">1.000</span>
        </label>
      </div>

      <!-- GHI CHÚ -->
      <div class="note-block">
        <h4 class="note-title">Ghi chú</h4>
        <textarea placeholder="Nhập ghi chú"></textarea>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <!-- SỐ LƯỢNG -->
        <div class="qty-box">
          <button @click="qty--" :disabled="qty <= 1">-</button>
          <span>{{ qty }}</span>
          <button @click="qty++">+</button>
        </div>

        <!-- TỔNG + NÚT -->
        <div class="add-area">
          <div class="total-text">
            Tổng cộng: {{ (item.price * qty).toLocaleString("vi-VN") }} đ
          </div>

          <button class="add-btn" @click="$emit('add', item)">Thêm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 999;
}

/* KHUNG MODAL */
.modal-box {
  width: 100%;
  background: white;
  border-radius: 24px 24px 0 0;
  padding: 18px;
  max-height: 82vh;
  overflow-y: auto;
  animation: slideUp 0.25s ease;
  box-shadow: 0 -4px 18px rgba(0, 0, 0, 0.15);
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

/* ẢNH SẢN PHẨM */
.detail-img {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
}

/* TITLE + PRICE */
.info-block {
  margin-top: 15px;
}
.detail-title {
  font-size: 22px;
  font-weight: bold;
}
.detail-price {
  font-size: 18px;
  font-weight: 600;
  color: #ff7a00;
  margin-top: 4px;
}

/* OPTION */
.option-block {
  margin-top: 20px;
  background: #fff;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #eee;
}
.option-title {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}
.option-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 6px 0;
}
.option-row input {
  margin-right: 10px;
}
.opt-price {
  color: #888;
}

/* GHI CHÚ */
.note-block {
  margin-top: 20px;
}
.note-title {
  font-size: 15px;
  font-weight: bold;
}
textarea {
  width: 100%;
  height: 70px;
  margin-top: 8px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  resize: none;
}

/* FOOTER */
.footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* SỐ LƯỢNG */
.qty-box {
  display: flex;
  align-items: center;
  gap: 10px;
}
.qty-box button {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: #eee;
  font-size: 18px;
}
.qty-box span {
  font-size: 18px;
  font-weight: bold;
}

/* TỔNG + BUTTON */
.add-area {
  text-align: right;
}
.total-text {
  font-weight: bold;
  margin-bottom: 4px;
}
.add-btn {
  width: 130px;
  background: #1e90ff;
  color: white;
  padding: 10px 14px;
  border-radius: 12px;
  border: none;
  font-weight: bold;
}
</style>
