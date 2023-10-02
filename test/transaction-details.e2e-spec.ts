import * as dotenv from "dotenv";
import { Provenance } from "../src/services/provenance.service";
import { ProvenanceTransactionDetails } from "index";

dotenv.config();

describe("TRANSACTION DETAILS TEST", () => {
    let client: Provenance;
    beforeAll(async () => {
      client = await Provenance.build();
    });
  

  const createWallet = () => {
    const wallet = client.createWallet();
    expect(wallet.privateKey).toBeDefined();
    expect(wallet.address).toBeDefined();
    expect(wallet.publicKey).toBeDefined();
    expect(wallet.mnemonicPhrase).toBeDefined();
    return wallet;
  };

  it("should return transaction details from transaction hash", async () => {
    const wallet = createWallet();
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

    const transactionDetails: ProvenanceTransactionDetails =
      await client.getTransactionDetails(transaction.transactionHash);
    expect(transactionDetails).toBeDefined();
    expect(transactionDetails.amount).toEqual(1);
    expect(transactionDetails.receiverAddress).toEqual(wallet.address);
    expect(transactionDetails.senderAddress).toEqual(process.env.ADDRESS);
    expect(transactionDetails.tokenMintAddress).toEqual("nhash");
  });
});
