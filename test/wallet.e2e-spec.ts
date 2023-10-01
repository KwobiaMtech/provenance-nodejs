import * as dotenv from "dotenv";
import { ProvenanceService } from "../src/services/provenance.service";

dotenv.config();

describe("WALLET TEST", () => {
  let provenance: ProvenanceService;
  beforeAll(async () => {
    provenance = new ProvenanceService();
    await provenance.init();
  });

  it("should create wallet TEST", async () => {
    const wallet: any = await provenance.createProvenanceWallet();
    expect(wallet.privateKey).toBeDefined();
    expect(wallet.address).toBeDefined();
    expect(wallet.publicKey).toBeDefined();
    expect(wallet.mnemonicPhrase).toBeDefined();
  });

  it("should create MAIN_NET wallet TEST", async () => {
    provenance.setEnvironment("MAIN_NET");
    const wallet: any = await provenance.createProvenanceWallet();
    expect(wallet.privateKey).toBeDefined();
    expect(wallet.address).toBeDefined();
    expect(wallet.publicKey).toBeDefined();
    expect(wallet.mnemonicPhrase).toBeDefined();
  });
});
