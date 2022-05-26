
<script setup lang="ts">
import { useWalletStore } from "@/stores/wallet";
import { storeToRefs } from "pinia";
import { reactive } from "vue";

const { address } = storeToRefs(useWalletStore());

const form = reactive({
  password: "",
  confirmPassword: "",
});


const onSubmit = async () => {

}
</script>

<template>
  <div style="width: 50%">
    <el-form :model="form">
      <el-form-item label="Password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>

      <div v-if="!address">
        <el-form-item label="Confirm Password">
          <el-input v-model="form.confirmPassword"></el-input>
        </el-form-item>
      </div>
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
      </el-form-item>
    </el-form>
    <p>Note: if you lost the password, you cant recover your account</p>
  </div>
</template>