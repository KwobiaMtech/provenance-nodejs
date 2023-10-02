import * as dotenv from "dotenv";
import { Provenance } from "../src/services/provenance.service";
import { ProvenanceWallet } from "index";

dotenv.config();

describe("BALANCE TEST", () => {
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

  it("get wallet balance", async () => {
    const wallet: ProvenanceWallet = createWallet();
    const balance = await client.getBalance(wallet.address);
    expect(balance).toBeDefined();
    expect(balance.denom).toBeDefined();
    expect(balance.amount).toBeDefined();
    expect(balance.amount).toEqual("0");
    expect(balance.denom).toEqual("nhash");
  });
});
