<script setup lang="ts">
import { ROPSTEN_PROVIDER_API } from "@/config";
import { Web3Service } from "@/services/web3.service";
import { useWalletStore } from "@/stores/wallet";
import { storeToRefs } from "pinia";
import { reactive } from "vue-demi";

// @ts-ignore
import Web3 from "web3/dist/web3.min.js";

const web3 = Web3Service.getInstance();
const entropy = "W@LleTDApP##OF-ShAd0WxxHiJAcKeRS";
const key = "@WallEtSxxShAd0W";
const { address } = storeToRefs(useWalletStore());

const form = reactive({
  password: "",
  confirmPassword: "",
});

const onSubmit = async () => {
  if (form.password && form.password != form.confirmPassword) {
    alert("Passwords not matched");
    return;
  }
  const accountInfo = await web3.eth.accounts.create(entropy);
  if (accountInfo) {
    await web3.eth.accounts.wallet.add(accountInfo.privateKey);
    const isSaved = await web3.eth.accounts.save(form.password, key);

    if (isSaved) {
      alert("Account created successfully");
    }
  }
};
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
        <el-button type="primary" @click="onSubmit">Create Account</el-button>
      </el-form-item>
    </el-form>
    <p>Note: if you lost the password, you cant recover your account</p>
  </div>
</template>

<style></style>
