<script setup lang="ts">
// @ts-ignore
import Web3 from "web3/dist/web3.min.js";

import { storeToRefs } from "pinia";
import { useWalletStore } from "@/stores/wallet";
import { onMounted, reactive, ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import { PROVIDER_API } from "@/config";
import { TransactionChecker } from "../common/TransactionChecker";


const web3 = new Web3(PROVIDER_API);

const entropy = "WaLleTApPxxOFxxShAdOWxxHiJAcKeRS";

const { address, shortAddress, encPrivateKey } = storeToRefs(useWalletStore());
const { addOrUpdate } = useWalletStore();

const showFullAddress = ref(false);
const balance = ref(0);
let activeTab = ref("txHistory");
 let tableData = reactive([
  {
    mode: "sent",
    peerAddress: "0x992jkjdf9983493dd",
    value: "100",
  },
  {
    mode: "recived",
    peerAddress: "0x992jkjdf9983493dd",
    value: "40",
  },
]);

onMounted(async () => {
  addOrUpdate({
    address: "0x93D5e142B24278A3C1eDc3C04e54Ed7d1A0485ec",
    encPrivateKey:
      "a5cca0b3c964445b736b8c617c9f8db3fd082c63d1a62bbf5b2eeda4cdf34925",
  });

  await setBalance();
  // await loadTransactionHistory();
});

function toggleFullAddress() {
  showFullAddress.value = !showFullAddress.value;
}

async function setBalance() {
  const wei = await web3.eth.getBalance(address.value);
  balance.value = web3.utils.fromWei(wei, "ether");
}

async function loadTransactionHistory() {
  const txChecker = new TransactionChecker(address.value);
  tableData = await txChecker.getTransactions() as any[];
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<template>
  <div class="accounts">
    <h2>Account Details</h2>
    <section class="accounts__info">
      <article>
        <p>Address</p>
        <p
          @mouseover="toggleFullAddress()"
          @mouseleave="toggleFullAddress()"
          :title="showFullAddress ? address : ''"
        >
          {{ shortAddress }}
        </p>
      </article>
      <article>
        <p>Balance</p>
        <p>{{ balance }} ETH</p>
      </article>
    </section>

    <section class="accounts__tabs">
      <el-tabs v-model="activeTab" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Transaction History" name="txHistory">
          <div>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="mode" label="Transaction Mode" width="180" />
              <el-table-column prop="peerAddress" label="Peer Address" width="180" />
              <el-table-column prop="value" label="Value" />
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Buy" name="txBuy">Config</el-tab-pane>
        <el-tab-pane label="Sell" name="TxSell">Role</el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<style scoped>
.accounts > h2 {
  font-size: 2.5rem;
  color: rgba(0, 0, 0, 0.7);
  padding: 0.5rem 0;
}
.accounts__info {
  display: flex;
  flex-direction: column;
}

.accounts__info article {
  display: flex;
}

.accounts__info article p {
  margin-right: 1rem;
  font-size: 1.2rem;
  margin: 0.25rem;
}

.accounts__tabs {
  width: 50%;
  margin-top: 1rem;
}
</style>
