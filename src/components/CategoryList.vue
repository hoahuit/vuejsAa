<template>
  <div class="category-box">
    <div
      class="cat-item"
      v-for="cat in categories"
      :key="cat.id"
      :class="{ active: selectedCategory === cat.id }"
      @click="$emit('select', cat.id)"
    >
      <img :src="cat.image || '/cat.png'" class="cat-img" />
      <span class="cat-name">{{ cat.name }}</span>
    </div>
  </div>
</template>


<script setup>
/* eslint-disable */

defineProps({
  categories: Array,
  selectedCategory: Number,
});
defineEmits(["select"]);
</script>

<style>
.category-box {
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding-bottom: 5px;
}
.cat-item {
  text-align: center;
  width: 70px;
  flex-shrink: 0;
}
.cat-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
.cat-name {
  font-size: 13px;
}
</style>
