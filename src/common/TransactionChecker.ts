import { PROVIDER_API } from "@/config";
// @ts-ignore
import Web3 from "web3/dist/web3.min.js";

export class TransactionChecker {
    address: string;
    web3: any;
    transactions: any[] = [];
    constructor(address: string) {
        this.address = address.toLowerCase();
        this.web3 = new Web3(PROVIDER_API);
}

async getTransactions() {
    const eth = this.web3.eth;
    let myAddr = this.address;
    let block = await this.web3.eth.getBlock('latest');
    let currentBlock = block.number;
    let n = await eth.getTransactionCount(myAddr, currentBlock);
    let bal = await eth.getBalance(myAddr, currentBlock);

    for (let i=currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
        try {
            console.log("Analysing block number", i)
            let block = await eth.getBlock(i, true);
            const self = this;
            if (block && block.transactions) {
                block.transactions.forEach(function(e: any) {
                    if (myAddr == e.from) {
                        if (e.from != e.to)
                            bal = bal.plus(e.value);
                        self.transactions.push({
                            mode: "sent",
                            to: e.to,
                            value: e.value.toString(10)
                        });
                        console.log(i, e.from, e.to, e.value.toString(10));
                        --n;
                    }
                    if (myAddr == e.to) {
                        if (e.from != e.to)
                            bal = bal.minus(e.value);
                        self.transactions.push({
                            mode: "recived",
                            peerAddress: e.from,
                            value: e.value.toString(10)
                        });
                        console.log(i, e.from, e.to, e.value.toString(10));
                    }
                });
            }
        } catch (e) { console.error("Error in block " + i, e); }
    }
    return [];
  }
}