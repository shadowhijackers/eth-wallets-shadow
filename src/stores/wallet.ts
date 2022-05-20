import { defineStore } from 'pinia';

const initialState = {
    address:  "",
    encPrivateKey: ""
};
export const useWalletStore = defineStore({
    id: "wallet",
    state: ()=>(initialState),
    getters:{
        shortAddress(state){
            return ""+state.address.slice(0, 15) + "...";
        }
    },
    actions: {
        addOrUpdate(wallet: any){
            this.$patch(wallet)
        },
        clear(){
            this.$patch(initialState);
        }
    }
})