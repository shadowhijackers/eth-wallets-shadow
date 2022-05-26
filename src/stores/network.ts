import { MAINNET_PROVIDER_API, ROPSTEN_PROVIDER_API } from '@/config';
import { defineStore } from 'pinia';

export interface Network {
    type: string;
    rpcURL: string;
    isWebSocket: boolean;
}

export interface NetworkState{
  selected: Network;
  networks: Array<Network>;
}

const initialState = {
    selected: {
        type: "ropsten",
        rpcURL: ROPSTEN_PROVIDER_API,
        isWebSocket: false
    },
    networks: [
        {
            type: "ropsten",
            rpcURL: ROPSTEN_PROVIDER_API,
            isWebSocket: false
        },
        {
            type: "mainnet",
            rpcURL: MAINNET_PROVIDER_API,
            isWebSocket: false
        },
    ]
}
export const useNetworkStore = defineStore({
    id: "network",
    state: ()=>initialState,
    getters: {
        networkType(state){
            return state.selected.type;
        },
        rpcURL(state){
            return state.selected.rpcURL;
        }
    },
    actions: {
       updateSelected(network: Network){
          this.selected = network;
       }
    }
})