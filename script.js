/**********************************************
 *  Phantom Wallet Integration (Connect)
 **********************************************/
const connectWallet = async () => {
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
};

/**********************************************
 *  On-Chain Burn of SPL Tokens via Phantom
 **********************************************/
const burnSPLTokensUsingPhantom = async () => {
  try {
    const provider = window.solana;
    if (!provider || !provider.isPhantom) {
      alert("Phantom Wallet is not installed. Please install it to proceed.");
      return;
    }

    // Ensure wallet is connected
    await provider.connect();
    const walletPublicKey = provider.publicKey;
    if (!walletPublicKey) {
      alert("Wallet public key not available.");
      return;
    }

    // Create a connection to Devnet (use "mainnet-beta" for actual mainnet)
    const connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl("devnet"),
      "confirmed"
    );

    // Mint address for the token you want to burn
    const mintAddress = new solanaWeb3.PublicKey(
      "9nGmUbhs1dh1wSgpwo6V25t4J3nmhYPMhAHmjmxZpump"
    );
    // How many tokens to burn
    const burnAmount = 69420;

    // Get the associated token account that holds this mint for the user
    const fromTokenAccount = await splToken.getAssociatedTokenAddress(
      mintAddress,       // The token mint
      walletPublicKey    // The user/wallet
    );

    // Construct a burn instruction using SPL Token
    const burnInstruction = splToken.createBurnInstruction(
      fromTokenAccount,           // From which token account
      mintAddress,                // Mint address
      walletPublicKey,            // Owner of the token account
      burnAmount,                 // Number of tokens to burn
      [],                         // Remaining accounts (none)
      splToken.TOKEN_PROGRAM_ID   // The SPL Token Program
    );

    // Build a transaction with that instruction
    let transaction = new solanaWeb3.Transaction().add(burnInstruction);
    transaction.feePayer = walletPublicKey;

    // Fetch the latest blockhash to make the transaction valid
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;

    // Ask Phantom to sign the transaction
    const signedTransaction = await provider.signTransaction(transaction);

    // Send the signed transaction to the cluster
    const txSignature = await connection.sendRawTransaction(
      signedTransaction.serialize()
    );

    // Confirm it
    await connection.confirmTransaction(txSignature);

    // If all goes well:
    alert(`Burn transaction confirmed! TXID: ${txSignature}`);
    console.log("Burn transaction confirmed. Signature:", txSignature);

  } catch (error) {
    console.error("Burn error:", error);
    alert(`Burn failed: ${error.message}`);
  }
};

/**********************************************
 *  Set Up Event Listeners
 **********************************************/
document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.getElementById("connectWallet");
  const burnBtn = document.getElementById("burnButton");

  // Connect Phantom
  connectBtn.addEventListener("click", async () => {
    const publicKey = await connectWallet();
    if (publicKey) {
      console.log(`Wallet Connected: ${publicKey}`);
    }
  });

  // Burn SPL tokens on click
  burnBtn.addEventListener("click", burnSPLTokensUsingPhantom);
});
