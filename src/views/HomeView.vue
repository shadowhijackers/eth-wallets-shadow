<script setup lang="ts">
import Wallet from "../components/Wallet.vue";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { useWalletStore } from "@/stores/wallet";
import { useNetworkStore } from "@/stores/network";

const { accounts } = storeToRefs(useWalletStore());
const { networks } = storeToRefs(useNetworkStore());


</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header style="font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item disabled>Choose Network</el-dropdown-item>
                <el-dropdown-item
                  v-for="network of networks"
                  :key="network.type"
                  >{{ network.type }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <h1>WALLET'S SHADOW</h1>
        </div>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-scrollbar>
            <el-menu :default-openeds="['1', '2']">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><icon-menu /></el-icon>Accounts
                </template>
                <el-menu-item
                  :index="'1' + '-' + index.toString()"
                  v-for="(account, index) of accounts"
                  :key="account.address"
                >
                  <router-link
                    :to="{ name: 'Account Details', params: { id: account.address } }"
                    >Account {{ index +1}}</router-link
                  >
                </el-menu-item>
                <el-menu-item :index="'1' + '-' + accounts.length.toString()">
                  <router-link :to="{ name: 'CreateAccount' }">
                    Create Account</router-link
                  ></el-menu-item
                >
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><message /></el-icon> About us
                </template>
                <el-menu-item index="2-1">Contact</el-menu-item>
                <el-menu-item index="2-2">Sponser</el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </el-aside>

        <el-main>
          <el-scrollbar>
            <RouterView />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
