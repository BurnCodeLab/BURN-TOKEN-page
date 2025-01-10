// script.js

// Phantom Wallet Integration
const connectWallet = async () => {
  const provider = window.solana;
  if (!provider || !provider.isPhantom) {
    alert("Phantom Wallet is not installed. Please install it to proceed.");
    window.open("https://phantom.app/", "_blank");
    return;
  }

  try {
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

// Burn Functionality
const burnTokens = async (walletPublicKey, burnAmount, burnAddress, tokenMintAddress) => {
  try {
    const connection = new window.solanaWeb3.Connection(
      window.solanaWeb3.clusterApiUrl("mainnet-beta"),
      "confirmed"
    );

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      new window.solanaWeb3.PublicKey(walletPublicKey),
      { mint: new window.solanaWeb3.PublicKey(tokenMintAddress) }
    );

    if (tokenAccounts.value.length === 0) {
      alert("No token account found for the specified SPL token. Ensure you hold the required tokens.");
      return;
    }

    const tokenAccount = tokenAccounts.value[0].pubkey;
    const balanceResponse = await connection.getTokenAccountBalance(tokenAccount);
    const tokenBalance = parseInt(balanceResponse.value.amount);

    if (tokenBalance < burnAmount) {
      alert(`Insufficient balance. You have ${tokenBalance} tokens, but ${burnAmount} are required.`);
      return;
    }

    const transaction = new window.solanaWeb3.Transaction().add(
      splToken.Token.createTransferInstruction(
        splToken.TOKEN_PROGRAM_ID,
        tokenAccount,
        new window.solanaWeb3.PublicKey(burnAddress),
        new window.solanaWeb3.PublicKey(walletPublicKey),
        [],
        burnAmount
      )
    );

    const provider = window.solana;
    const signedTransaction = await provider.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signedTransaction.serialize());
    await connection.confirmTransaction(signature, "confirmed");

    alert(`Successfully burned ${burnAmount} tokens. Transaction Signature: ${signature}`);
    return signature;
  } catch (error) {
    console.error("Burn Error:", error);
    alert(`Error during burn: ${error.message}`);
  }
};

// Event Listeners
document.getElementById("connectWallet").addEventListener("click", async () => {
  const publicKey = await connectWallet();
  if (publicKey) {
    console.log(`Wallet Connected: ${publicKey}`);
  }
});

document.getElementById("burnButton").addEventListener("click", async () => {
  const burnAmount = 69420;
  const burnAddress = "11111111111111111111111111111111";
  const tokenMintAddress = "9nGmUbhs1dh1wSgpwo6V25t4J3nmhYPMhAHmjmxZpump";

  const walletPublicKey = window.solana?.publicKey?.toString();
  if (!walletPublicKey) {
    alert("Please connect your wallet first.");
    return;
  }

  const confirmation = confirm(
    `You are about to burn ${burnAmount} tokens to the Solana burn address. Do you wish to proceed?`
  );

  if (!confirmation) return;

  await burnTokens(walletPublicKey, burnAmount, burnAddress, tokenMintAddress);
});
