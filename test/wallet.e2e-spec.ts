import * as dotenv from "dotenv";
import { Provenance } from "../src/services/provenance.service";

dotenv.config();

describe("WALLET TEST", () => {
    let client: Provenance;
    beforeAll(async () => {
      client = await Provenance.build();
    });
  it("should create wallet TEST", async () => {
    const wallet: any = client.createWallet();
    expect(wallet.privateKey).toBeDefined();
    expect(wallet.address).toBeDefined();
    expect(wallet.publicKey).toBeDefined();
    expect(wallet.mnemonicPhrase).toBeDefined();
  });

  it("should create MAIN_NET wallet TEST", async () => {
    client.environment =   "MAIN_NET";
    const wallet: any = client.createWallet();
    expect(wallet.privateKey).toBeDefined();
    expect(wallet.address).toBeDefined();
    expect(wallet.publicKey).toBeDefined();
    expect(wallet.mnemonicPhrase).toBeDefined();
  });
});
