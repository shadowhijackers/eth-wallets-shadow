<script setup lang="ts">
import { PROVIDER_API } from "@/config";
import { reactive } from "vue-demi";

// @ts-ignore
import Web3 from "web3/dist/web3.min.js";

const web3 = new Web3(PROVIDER_API);
const entropy = "W@LleTDApP##OF-ShAd0WxxHiJAcKeRS";
const key = "@WallEtSxxShAd0W";

const form = reactive({
  password: "",
  confirmPassword: "",
});

const onSubmit = async () => {
  if (form.password != form.confirmPassword){
    alert("Passwords not matched");
    return;
  }
  const accountInfo = await web3.eth.accounts.create(entropy);
  if (accountInfo) {
    await web3.eth.accounts.wallet.add(accountInfo.privateKey);
    const isSaved = await web3.eth.accounts.save(form.password, key);

    if (isSaved){
        alert("Account created successfully");
    }
  }
};
</script>

<template>
  <div>
    <el-form :model="form">
      <el-form-item label="Password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item label="Confirm Password">
        <el-input v-model="form.confirmPassword"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create Account</el-button>
      </el-form-item>
    </el-form>
    <p>Note: if you lost the password, you cant recover your account</p>
  </div>
</template>

<style>
</style>
