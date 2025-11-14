<script setup>
/* eslint-disable */
defineProps({
  item: Object,
  onClick: Function,
});
</script>

<template>
  <div class="card" @click="onClick(item)">
    <img :src="item.img" class="card-img" />
    <div class="card-name">{{ item.name }}</div>
    <div class="card-price">{{ item.price.toLocaleString("vi-VN") }} đ</div>
  </div>
</template>

<style>
.card {
  background: white;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}
.card-img {
  width: 100%;
  border-radius: 10px;
}
.card-name {
  font-size: 15px;
  font-weight: 600;
  margin-top: 5px;
}
.card-price {
  color: #ff7a00;
  margin-top: 3px;
}
</style>
