/**********************************************
 *  Phantom Wallet Integration (Connect)
 **********************************************/
async function connectWallet() {
  const provider = window.solana;
  if (!provider || !provider.isPhantom) {
    alert("Phantom Wallet is not installed. Please install it to proceed.");
    window.open("https://phantom.app/", "_blank");
    return null;
  }

  try {
    // Attempt to connect to Phantom
    await provider.connect();
    const publicKey = provider.publicKey.toString();
    alert(`Wallet connected: ${publicKey}`);
    return publicKey;
  } catch (error) {
    console.error("Wallet connection failed:", error);
    alert("Failed to connect wallet.");
    return null;
  }
}

/**********************************************
 *  On-Chain Burn of SPL Tokens via Phantom
 **********************************************/
async function burnSPLTokensUsingPhantom() {
  try {
    const provider = window.solana;
    if (!provider || !provider.isPhantom) {
      alert("Phantom Wallet is not installed. Please install it to proceed.");
      return;
    }

    // 1. Ensure wallet is connected
    await provider.connect();
    const walletPublicKey = provider.publicKey;
    if (!walletPublicKey) {
      alert("Wallet public key not available.");
      return;
    }

    // 2. Create a connection to Devnet (or mainnet if you prefer)
    const connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl("devnet"),
      "confirmed"
    );

    // 3. Your token details
    //    e.g. "9nGmUbhs1dh1wSgpwo6V25t4J3nmhYPMhAHmjmxZpump" => your token mint
    //    If you have decimals, you must multiply burnAmount * (10**decimals)
    const mint = new solanaWeb3.PublicKey(
      "9nGmUbhs1dh1wSgpwo6V25t4J3nmhYPMhAHmjmxZpump"
    );
    const decimals = 0; // If your token has decimals, set them here
    const burnQuantity = 69420;

    // 4. Find the associated token account for this wallet & mint
    const fromTokenAccount = await splToken.getAssociatedTokenAddress(
      mint,
      walletPublicKey
    );

    // 5. Create the Burn instruction
    const burnIx = splToken.createBurnCheckedInstruction(
      fromTokenAccount,
      mint,
      walletPublicKey,
      burnQuantity * (10 ** decimals),
      decimals,
      [],
      splToken.TOKEN_PROGRAM_ID
    );

    // 6. Build & sign a transaction
    let transaction = new solanaWeb3.Transaction().add(burnIx);
    transaction.feePayer = walletPublicKey;
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;

    // Ask Phantom to sign
    const signedTransaction = await provider.signTransaction(transaction);

    // 7. Broadcast the transaction
    const txSignature = await connection.sendRawTransaction(
      signedTransaction.serialize()
    );

    // 8. Confirm the transaction
    await connection.confirmTransaction(txSignature, "confirmed");

    // 9. Success message
    alert(`BURN SUCCESS! TXID: ${txSignature}`);
    console.log(`BURN SUCCESS! https://explorer.solana.com/tx/${txSignature}?cluster=devnet`);

  } catch (error) {
    console.error("Burn error:", error);
    alert(`Burn failed: ${error.message}`);
  }
}

/**********************************************
 *  DOM Event Listeners
 **********************************************/
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("connectWallet")
    .addEventListener("click", connectWallet);

  document.getElementById("burnButton")
    .addEventListener("click", burnSPLTokensUsingPhantom);
});
