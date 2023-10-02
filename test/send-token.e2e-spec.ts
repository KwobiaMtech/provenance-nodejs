import * as dotenv from "dotenv";
import { Provenance } from "../src/services/provenance.service";

dotenv.config();

describe("SEND TOKEN TEST", () => {
    let client: Provenance;
    beforeAll(async () => {
      client = await Provenance.build();
    });

  const createWallet = async () => {
    const wallet = client.createWallet();
    expect(wallet.privateKey).toBeDefined();
    expect(wallet.address).toBeDefined();
    expect(wallet.publicKey).toBeDefined();
    expect(wallet.mnemonicPhrase).toBeDefined();
    return wallet;
  };

  it("should be able to send token", async () => {
    const wallet = await createWallet();
    const transaction = await client.createTransaction(
      process.env.ADDRESS,
      wallet.address,
      process.env.MNEMONIC_PHRASE,
      1
    );
    expect(transaction).toBeDefined();
    expect(transaction.gasUsed).toBeDefined();
    expect(transaction.gasWanted).toBeDefined();
    expect(transaction.transactionHash).toBeDefined();

    const receiverBalance = await client.getBalance(wallet.address);
    expect(receiverBalance.amount).toEqual("1000000000");
  });
});
