import * as dotenv from "dotenv";
import { ProvenanceService } from "../src/services/provenance.service";

dotenv.config();

describe("SEND TOKEN TEST", () => {
  let provenance: ProvenanceService;
  beforeAll(async () => {
    provenance = new ProvenanceService();
    await provenance.init();
  });

  const createWallet = () => {
    const wallet = provenance.createProvenanceWallet();
    expect(wallet.privateKey).toBeDefined();
    expect(wallet.address).toBeDefined();
    expect(wallet.publicKey).toBeDefined();
    expect(wallet.mnemonicPhrase).toBeDefined();
    return wallet;
  };

  it("should be able to send token", async () => {
    const wallet = createWallet();
    const transaction = await provenance.createTransaction(
      process.env.ADDRESS,
      wallet.address,
      process.env.MNEMONIC_PHRASE,
      1
    );
    expect(transaction).toBeDefined();
    expect(transaction.gasUsed).toBeDefined();
    expect(transaction.gasWanted).toBeDefined();
    expect(transaction.transactionHash).toBeDefined();

    const receiverBalance = await provenance.getBalance(wallet.address);
    expect(receiverBalance.amount).toEqual("1000000000");
  });
});
