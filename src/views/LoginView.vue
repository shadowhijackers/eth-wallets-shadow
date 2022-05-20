<script setup lang="ts">
  import {ref} from "vue"

  let userName = ref("");
  let password = ref("");

  function login(ev: any){
      ev.preventDefault();
  }
  
</script>

<template>

<form @submit="login($event)">
  <section>
   <div>
     <input type="text" v-model="userName" placeholder="Enter your name">
   </div>
   <div>
     <input type="password" v-model="password" placeholder="Enter your password">
   </div>
    <div>
      <button type="button">Login</button>
    </div>
  </section>
</form>
</template>

<style scoped>
</style>