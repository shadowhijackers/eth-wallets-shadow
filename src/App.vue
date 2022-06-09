<script setup lang="ts">
import { onMounted } from "vue-demi";
import { RouterLink, RouterView } from "vue-router";
import { useWalletStore } from "./stores/wallet";

const {addOrUpdate} = useWalletStore();

onMounted(()=>{
  const key = "@WallEtSxxShAd0W";
  const accounts = JSON.parse(localStorage.getItem(key) as string);
  for (let ac of accounts){
    addOrUpdate(ac);
  }
});

</script>

<template>
  <RouterView />
</template>
<style>
 *{
   padding: 0;
   margin: 0;
 }
 html{
   font-size: 16px;
 }
</style>