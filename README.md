## Provenance package for nodejs devolopers

> This is a nodejs package for provenance blockchain. It is a wrapper around the cosmos sdk. It is written in typescript and can be used in any nodejs project. It is a work in progress and will be updated regularly.

This npm package makes it easier to create provenance wallet,create transactions or send hash tokens to other wallets. It also makes it easier to create and sign transactions and broadcast them to the blockchain. It also makes it easier to query the blockchain for data.

**docs**: https://github.com/KwobiaMtech/provenance-nodejs

---

Let's get started!

```sh

npm i provenance-nodejs

yarn add provenance-nodejs

```

For type script you can import the package as shown below:

```typescript
import { client } from "provenance-nodejs";
```

For javascript you can import the package as shown below:

```javascript
const { client } = require("provenance-nodejs");
```

To initiate Provenance client you can use you can instantiate it with the build function:

```typescript
const provenance = await client.Provenance.build();
```

To create a wallet you can use the createWallet function as shown below:

```typescript
const wallet = provenance.createWallet();
```

Successful wallet creation should give below response

```json
{
  "privateKey": "be7441dfe414c3abffb224a2ebeca57fbc17c929942b59d795d9",
  "address": "tp1klrru0tp2ue79mjnsaur32afmv32lasfasdfd68uatm9y",
  "publicKey": "02f0c3bbf8dc3899553fd8e8fa71fed59eb8389404b4c51b80cd",
  "mnemonicPhrase": "james scissors venue guitar naive hidden abandon spot snow luggage lock akon"
}
```

You can also check wallet balance using the getBalance function as shown below:

```typescript
const balance = await provenance.getBalance(wallet.address);
```

Successful balance check should give below response

```json
{
  "denom": "nhash",
  "amount": "1000000000000000000"
}
```

You can also send token to another wallet using the Create Transaction function as shown below:Transaction amount is in hash not nhash

```typescript
const transaction = await provenance.createTransaction(
  senderAddress,
  receiverAddress,
  mneumonic,
  1
);
```

Transaction response should be as shown below:

```json
{
  "gasUsed": 106362,
  "gasWanted": 131339,
  "transactionHash": "FED9E5A6AE8B3904A0DA845BEC86AFA56072D35D0689E2AAE0F41F72B83E6562"
}
```

To get transaction details from transaction hash or transaction ID you can use the getTransaction function as shown below:

```typescript
const transactionDetails = await provenance.getTransactionDetails(
  transactionHash
);
```

Successful transaction response will give below json

```json
{
  "senderAddress": "tp1rxrgg3j43nucq2phgjwccmz23n3a0kya9adasdfasd",
  "receiverAddress": "tp1pxg6vf32jt32qmtd9kg4yskf5sdfasdf",
  "tokenMintAddress": "nhash",
  "amount": 1
}
```
