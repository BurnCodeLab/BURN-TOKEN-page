const { Connection, PublicKey, Transaction } = solanaWeb3;
const { getOrCreateAssociatedTokenAccount, createBurnInstruction } = splToken;

const MINT_ADDRESS = "TXyF5bNEcYdTBgybocXYTVWkQi4s5CSStVMV25epump";
const DECIMALS = 6;
const BURN_QUANTITY = 25 * (10 ** DECIMALS);

let provider = null;

// DOM Elements
const connectWalletBtn = document.getElementById("connectWalletBtn");
const burnBtn = document.getElementById("burnBtn");
const statusMsg = document.getElementById("statusMsg");

// Check for Phantom wallet
window.addEventListener("load", () => {
  if ("solana" in window) {
    provider = window.solana;
    if (provider.isPhantom) {
      console.log("Phantom wallet found!");
    } else {
      alert("Phantom wallet not found! Install Phantom from https://phantom.app.");
    }
  } else {
    alert("No Solana wallet detected! Please install Phantom.");
  }
});

// Connect Wallet
connectWalletBtn.addEventListener("click", async () => {
  try {
    if (!provider) throw new Error("Phantom wallet is not available.");
    await provider.connect();
    console.log("Wallet connected:", provider.publicKey.toString());

    burnBtn.classList.remove("hidden");
    statusMsg.textContent = "Wallet connected: " + provider.publicKey.toString();
  } catch (err) {
    console.error(err);
    statusMsg.textContent = "Connection error: " + err.message;
  }
});

// Burn Tokens
burnBtn.addEventListener("click", async () => {
  try {
    statusMsg.textContent = "Processing...";
    if (!provider || !provider.publicKey) throw new Error("Wallet not connected!");

    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const mintPubkey = new PublicKey(MINT_ADDRESS);
    const fromWalletPubkey = provider.publicKey;

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      provider,
      mintPubkey,
      fromWalletPubkey
    );

    if (!tokenAccount.amount || tokenAccount.amount < BURN_QUANTITY) {
      throw new Error("Insufficient token balance to burn!");
    }

    const transaction = new Transaction().add(
      createBurnInstruction(
        tokenAccount.address,
        mintPubkey,
        fromWalletPubkey,
        BURN_QUANTITY
      )
    );

    const { signature } = await provider.signAndSendTransaction(transaction);
    statusMsg.textContent = "Burn successful! Signature: " + signature;
    console.log("Transaction signature:", signature);
  } catch (err) {
    console.error(err);
    statusMsg.textContent = "Burn error: " + err.message;
  }
});
