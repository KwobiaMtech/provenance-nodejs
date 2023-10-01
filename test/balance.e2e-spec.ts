import * as dotenv from "dotenv";
import { ProvenanceService } from "../src/services/provenance.service";
import { ProvenanceWallet } from "index";

dotenv.config();

describe("BALANCE TEST", () => {
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

  it("get wallet balance", async () => {
    const wallet: ProvenanceWallet = createWallet();
    const balance = await provenance.getBalance(wallet.address);
    expect(balance).toBeDefined();
    expect(balance.denom).toBeDefined();
    expect(balance.amount).toBeDefined();
    expect(balance.amount).toEqual("0");
    expect(balance.denom).toEqual("nhash");
  });
});
