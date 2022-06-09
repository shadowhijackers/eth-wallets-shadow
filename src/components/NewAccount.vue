<script setup lang="ts">
import { ROPSTEN_PROVIDER_API } from "@/config";
import { BcryptService } from "@/services/bcrypt.service";
import { Web3Service } from "@/services/web3.service";
import { useWalletStore } from "@/stores/wallet";
import { storeToRefs } from "pinia";
import { onMounted, reactive } from "vue-demi";

// @ts-ignore
import Web3 from "web3/dist/web3.min.js";

const web3 = Web3Service.getInstance();
const entropy = "W@LleTDApP##OF-ShAd0WxxHiJAcKeRS";
const key = "@WallEtSxxShAd0W";
const hasPassword = BcryptService.hasPassword();
const {addOrUpdate} = useWalletStore();

const form = reactive({
  password: "",
  confirmPassword: "",
});

const onSubmit = async () => {
  if (hasPassword){
    if (!(await BcryptService.verifyPassword(form.password))){
      alert("Enter the correct password!");
      return
    }
  }else {
    if (form.password && form.password != form.confirmPassword) {
      alert("Passwords not matched");
      return;
    }
    BcryptService.hashThePassword(form.password);
  }
  const accountInfo = await web3.eth.accounts.create(entropy);
  if (accountInfo) {
    const account = await web3.eth.accounts.wallet.add(accountInfo);
    const isSaved = await web3.eth.accounts.wallet.save(form.password, key);
    addOrUpdate({address: accountInfo.address, encPrivateKey: ''});
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

      <div v-if="!hasPassword">
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
