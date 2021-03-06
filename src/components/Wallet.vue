<script setup lang="ts">
// @ts-ignore
import Web3 from "web3/dist/web3.min.js";

import { storeToRefs } from "pinia";
import { useWalletStore } from "@/stores/wallet";
import { onMounted, reactive, ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import { ROPSTEN_PROVIDER_API } from "@/config";
import { TransactionChecker } from "../services/TransactionChecker";
import { useNetwork } from "@vueuse/core";
import { useNetworkStore } from "@/stores/network";
import { Web3Service } from "@/services/web3.service";
import { add } from "lodash";


const web3 = Web3Service.getInstance();

const entropy = "WaLleTApPxxOFxxShAdOWxxHiJAcKeRS";

const { address, shortAddress, encPrivateKey } = storeToRefs(useWalletStore());
const { addOrUpdate } = useWalletStore();

const walletStore = useWalletStore();

const {networkType} = storeToRefs(useNetworkStore())

const showFullAddress = ref(false);
const balance = ref(0);
let activeTab = ref("txHistory");
let tableData = ref([] as any);

onMounted(async () => {
  await setBalance();
  await loadTransactionHistory();
});

walletStore.$onAction(async (state)=>{
  console.log(state);
  console.log(address);
  debugger
  await setBalance();
  await loadTransactionHistory();
}, true);

function toggleFullAddress() {
  showFullAddress.value = !showFullAddress.value;
}

async function setBalance() {
  const wei = await web3.eth.getBalance(address.value);
  balance.value = web3.utils.fromWei(wei, "ether");
}

async function loadTransactionHistory() {
  const txChecker = new TransactionChecker(address.value);
  tableData.value = await txChecker.getTxHistoryFromEtherscan() as any[];
  console.log(tableData)
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
            <el-table :data="tableData" style="width: 100%;" max-height='250'>
              <el-table-column prop="mode" label="Transaction Mode" width="180" />
              <el-table-column prop="peerAddress" label="Peer Address" width="180" />
              <el-table-column prop="value" label="Value" />
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Buy" name="txBuy">
          <template v-if="networkType == 'ropsten'">
            <a href="https://faucet.dimensions.network/" target="_blank"> Buy from Faucet</a>
          </template>
          <template v-else-if="networkType == 'mainnet'">
            <a href="https://www.moonpay.com/buy/eth" target="_blank"> Buy from MoonPay</a>
          </template>
        </el-tab-pane>

        <el-tab-pane label="Sell" name="TxSell">
          <el-form>
            <el-form-item>
              <el-input placeholder="Enter the reciver address"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="Enter the ether value"></el-input>
            </el-form-item>

            <el-form-item>
              <el-input placeholder="Enter the password"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button>Sell</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
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
