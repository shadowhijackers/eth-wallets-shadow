<script setup lang="ts">
// @ts-ignore
import Web3 from "web3/dist/web3.min.js";

import { storeToRefs } from "pinia";
import { useWalletStore } from "@/stores/wallet";
import { onMounted, ref } from "vue";

const PROVIDER_API =
  "https://ropsten.infura.io/v3/2f4364c096cd446c8d015eccadc0e0ce";

const web3 = new Web3(PROVIDER_API);

const entropy = "WaLleTApPxxOFxxShAdOWxxHiJAcKeRS";

const { address, shortAddress, encPrivateKey } = storeToRefs(useWalletStore());
const { addOrUpdate } = useWalletStore();

let showFullAddress = ref(false);
let balance = ref(0);

onMounted(async () => {
  addOrUpdate({
    address: "0x93D5e142B24278A3C1eDc3C04e54Ed7d1A0485ec",
    encPrivateKey:
      "a5cca0b3c964445b736b8c617c9f8db3fd082c63d1a62bbf5b2eeda4cdf34925",
  });

  await setBalance();
});

function toggleFullAddress() {
  showFullAddress.value = !showFullAddress.value;
}

async function setBalance() {
  const wei =  await web3.eth.getBalance(address.value);
  balance.value = web3.utils.fromWei(wei,"ether");
}
</script>

<template>
  <h1 class="heading">Welcome to SHADOW HIJACKERS'S ETH WALLET</h1>
  <h2>
    Account
    <span
      @mouseover="toggleFullAddress()"
      @mouseleave="toggleFullAddress()"
      :title="showFullAddress ? address : ''"
    >
      {{ shortAddress }}</span
    >
  </h2>
  <div>
    <h1>Balance</h1>
    <h3>{{balance}} ETH</h3>
  </div>
</template>

<style scoped>
.heading {
  color: rgba(51, 175, 16, 0.8);
}
</style>
