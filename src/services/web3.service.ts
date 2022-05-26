import { useNetworkStore } from "./../stores/network";

// @ts-ignore
import Web3 from "web3/dist/web3.min.js";

export class Web3Service {
  public static web3: any;

  public static updateWeb3Ins() {
    const { rpcURL } = useNetworkStore();
    Web3Service.web3 = new Web3(rpcURL);
  }

  public static getInstance() {
    if (!this.web3) {
      this.updateWeb3Ins();
    }
    return this.web3;
  }
}
