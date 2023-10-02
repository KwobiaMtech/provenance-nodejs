import { ProvenanceTransactionDetails } from "types/provenance-transaction-details.type";
import { ProvenanceWallet } from "types/provenance-wallet.type";

import * as provenance from "@provenanceio/provenance.js";
import * as bip39 from "bip39";
import * as createHmac from "crypto";
import {
  IndexedTx,
  StargateClient,
  SigningStargateClient,
} from "@cosmjs/stargate";
import {
  DirectSecp256k1HdWallet,
  OfflineDirectSigner,
} from "@cosmjs/proto-signing";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { stringToPath } from "@cosmjs/crypto";
import { PROVENANCE_CONFIG } from "../config/config.provenance";

export class Provenance {
  private static _client: StargateClient;
  private static _environment: "TEST_NET" | "MAIN_NET";

  constructor(environment?: "TEST_NET" | "MAIN_NET") {
    Provenance._environment = environment || "TEST_NET";
  }

  get client() {
    return Provenance._client;
  }

  get environment() {
    return Provenance._environment;
  }

  set environment(environment: "TEST_NET" | "MAIN_NET") {
    Provenance._environment = environment;
  }

  public static async build(): Promise<Provenance> {
    Provenance._client = await StargateClient.connect(
      Provenance._environment === "MAIN_NET"
        ? PROVENANCE_CONFIG.MAIN_NET.PROVENANCE_RPC_URL
        : PROVENANCE_CONFIG.TEST_NET.PROVENANCE_RPC_URL
    );

    return new Provenance();
  }

  createWallet(): ProvenanceWallet {
    const MASTER_SECRET = Buffer.from("Bitcoin seed", "utf8");
    const PRIVATE_KEY_SIZE = 32;
    const CHAINCODE_SIZE = 32;

    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const hmac = createHmac.createHmac("sha512", MASTER_SECRET);
    hmac.update(seed);
    const digest = hmac.digest();
    const privateKey = Buffer.from(digest.subarray(0, PRIVATE_KEY_SIZE));
    const chainCode = Buffer.from(
      digest.subarray(PRIVATE_KEY_SIZE, PRIVATE_KEY_SIZE + CHAINCODE_SIZE)
    );

    const wallet = provenance.Wallet.fromPrivateKey(
      privateKey,
      chainCode,
      this.environment === "MAIN_NET" ? true : false
    );
    const getKey = wallet.getKey(0, 0);

    return {
      privateKey: privateKey.toString("hex"),
      address: getKey.address,
      publicKey: getKey.publicKey,
      mnemonicPhrase: mnemonic,
    };
  }

  public async getBalance(address: string): Promise<provenance.Coin> {
    return await this.client.getBalance(address, "nhash");
  }

  public async getTransactionDetails(
    txHash: string
  ): Promise<ProvenanceTransactionDetails> {
    const faucetTx: IndexedTx = await this.client.getTx(txHash);

    const decodedTx: Tx = Tx.decode(faucetTx.tx);

    const sentMessage: MsgSend = MsgSend.decode(
      decodedTx.body.messages[0].value
    );
    const hash = Number(sentMessage.amount[0].amount) / 1e9;
    return {
      senderAddress: sentMessage.fromAddress,
      receiverAddress: sentMessage.toAddress,
      tokenMintAddress: sentMessage.amount[0].denom,
      amount: hash,
    };
  }

  public async convertToHash(amount: number) {
    return amount * 1e9;
  }

  public async createTransaction(
    senderAddress: string,
    receiverAddress: string,
    senderMnemonic: string,
    amount: number
  ): Promise<{ gasUsed: number; gasWanted: number; transactionHash: string }> {
    amount = 1000000000 * amount;
    const senderBalance = await this.getBalance(senderAddress);
    if (Number(senderBalance.amount) < amount) {
      throw new Error(
        `Sender account balance not sufficient. Current balance ${senderBalance.amount}`
      );
    }

    const path = stringToPath(
      this.environment === "MAIN_NET"
        ? PROVENANCE_CONFIG.MAIN_NET.PROVENANCE_HDPATH
        : PROVENANCE_CONFIG.TEST_NET.PROVENANCE_HDPATH
    );

    const signer: OfflineDirectSigner =
      await DirectSecp256k1HdWallet.fromMnemonic(senderMnemonic, {
        prefix:
          this.environment === "MAIN_NET"
            ? PROVENANCE_CONFIG.MAIN_NET.PROVENANCE_HRP
            : PROVENANCE_CONFIG.TEST_NET.PROVENANCE_HRP,
        hdPaths: [path],
      });
    const signerAccount = await signer.getAccounts();
    const signerAddress = signerAccount[0].address;
    if (signerAddress !== senderAddress) {
    }

    const signingClient = await SigningStargateClient.connectWithSigner(
      this.environment === "MAIN_NET"
        ? PROVENANCE_CONFIG.MAIN_NET.PROVENANCE_RPC_URL
        : PROVENANCE_CONFIG.TEST_NET.PROVENANCE_RPC_URL,
      signer
    );

    const result = await signingClient.sendTokens(
      signerAddress,
      receiverAddress,
      [{ denom: "nhash", amount: amount.toString() }],
      {
        amount: [{ denom: "nhash", amount: "2502007950" }],
        gas: "131339",
      }
    );
    return {
      gasUsed: result.gasUsed,
      gasWanted: result.gasWanted,
      transactionHash: result.transactionHash,
    };
  }
}
