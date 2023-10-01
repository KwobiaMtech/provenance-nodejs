import { ProvenanceTransactionDetails } from "types/provenance-transaction-details.type";
import { ProvenanceWallet } from "types/provenance-wallet.type";
export declare class ProvenanceService {
    private client;
    private environment;
    constructor(environment?: "TEST_NET" | "MAIN_NET");
    init(): Promise<ProvenanceService>;
    setEnvironment(environment: "TEST_NET" | "MAIN_NET"): void;
    getEnvironment(): "TEST_NET" | "MAIN_NET";
    createProvenanceWallet(): ProvenanceWallet;
    getBalance(address: string): Promise<import("cosmjs-types/cosmos/base/v1beta1/coin").Coin>;
    getTransactionDetails(txHash: string): Promise<ProvenanceTransactionDetails>;
    createTransaction(senderAddress: string, receiverAddress: string, senderMnemonic: string, amount: number): Promise<{
        gasUsed: number;
        gasWanted: number;
        transactionHash: string;
    }>;
}
//# sourceMappingURL=provenance.service.d.ts.map