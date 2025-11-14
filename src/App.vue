<template>
  <router-view />
</template>

<script setup>
/* eslint-disable */
import { getCustomerInfo } from "./api/shop";
import HomePage from "./pages/HomePage.vue";
import {  onMounted } from "vue";
onMounted(async () => {
  const res = await getCustomerInfo(11875);
  sessionStorage.setItem("user", JSON.stringify(res.data.data));
});
</script>
<style>
body {
  font-family: "Times New Roman", Times, serif;
}
</style>
