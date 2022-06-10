import { defineStore } from "pinia";

export interface Account {
  address: string;
  encPrivateKey?: string;
}

const initialState = {
  selected: {
    address: "0x93D5e142B24278A3C1eDc3C04e54Ed7d1A0485ec",
    encPrivateKey:
      "a5cca0b3c964445b736b8c617c9f8db3fd082c63d1a62bbf5b2eeda4cdf34925",
  } as Account,
  accounts: [
    {
      address: "0x93D5e142B24278A3C1eDc3C04e54Ed7d1A0485ec",
      encPrivateKey:
        "a5cca0b3c964445b736b8c617c9f8db3fd082c63d1a62bbf5b2eeda4cdf34925",
    } as Account,
  ] as Array<Account>,
};

export const useWalletStore = defineStore({
  id: "wallet",
  state: () => initialState,
  getters: {
    shortAddress(state) {
      return "" + state.selected.address.slice(0, 15) + "...";
    },
    address(state) {
      return state.selected?.address;
    },
    encPrivateKey(state) {
      return state.selected?.encPrivateKey;
    },
  },
  actions: {
    addOrUpdate(account: Account) {
      const isAccountExists = !!this.accounts.find(
        (_ac: any) => _ac.address == account.address
      );
      if (!isAccountExists) {
        this.accounts.push({address: account.address});
      }
    },
    updateSelected(account: Account){
       this.selected = account;
    }
  },
});
