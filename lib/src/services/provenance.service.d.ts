import { ProvenanceTransactionDetails } from "types/provenance-transaction-details.type";
import { ProvenanceWallet } from "types/provenance-wallet.type";
import * as provenance from "@provenanceio/provenance.js";
import { StargateClient } from "@cosmjs/stargate";
export declare class Provenance {
    private static _client;
    private static _environment;
    constructor(environment?: "TEST_NET" | "MAIN_NET");
    get client(): StargateClient;
    get environment(): "TEST_NET" | "MAIN_NET";
    set environment(environment: "TEST_NET" | "MAIN_NET");
    static build(): Promise<Provenance>;
    createWallet(): ProvenanceWallet;
    getBalance(address: string): Promise<provenance.Coin>;
    getTransactionDetails(txHash: string): Promise<ProvenanceTransactionDetails>;
    convertToHash(amount: number): Promise<number>;
    createTransaction(senderAddress: string, receiverAddress: string, senderMnemonic: string, amount: number): Promise<{
        gasUsed: number;
        gasWanted: number;
        transactionHash: string;
    }>;
}
//# sourceMappingURL=provenance.service.d.ts.map