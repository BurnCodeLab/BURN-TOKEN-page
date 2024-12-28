let walletConnected = false;

document.getElementById("connectButton").addEventListener("click", async () => {
  const provider = window.solana;

  if (!provider || !provider.isPhantom) {
    alert("Phantom Wallet is not installed. Please install it to proceed.");
    window.open("https://phantom.app/", "_blank");
    return;
  }

  try {
    await provider.connect();
    const publicKey = provider.publicKey.toString();
    walletConnected = true;

    document.getElementById("walletInfo").innerText = `Wallet Connected: ${publicKey}`;
    document.getElementById("burnButton").disabled = false;

    console.log("Wallet connected:", publicKey);
  } catch (error) {
    console.error("Connection Error:", error);
    alert("Failed to connect wallet. Please try again.");
  }
});

document.getElementById("burnButton").addEventListener("click", async () => {
  if (!walletConnected) {
    alert("Please connect your wallet first.");
    return;
  }

  const burnAmount = 1; // Burn 1 token for testing
  const burnAddress = "11111111111111111111111111111111"; // Solana official burn address
  const tokenMintAddress = "GACpABn18xqiSJbD9ZEyArJDT9RHRMUut5nK9Z9Spump"; // Updated token address

  const provider = window.solana;
  try {
    const connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl("mainnet-beta"),
      "confirmed"
    );

    const publicKey = provider.publicKey;

    // Fetch token accounts for the given mint
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      mint: new solanaWeb3.PublicKey(tokenMintAddress),
    });

    if (tokenAccounts.value.length === 0) {
      alert("No token account found for the specified SPL token.");
      return;
    }

    const tokenAccount = tokenAccounts.value[0].pubkey;

    // Create a transfer instruction to burn tokens
    const transaction = new solanaWeb3.Transaction().add(
      splToken.Token.createTransferInstruction(
        splToken.TOKEN_PROGRAM_ID,
        tokenAccount,
        new solanaWeb3.PublicKey(burnAddress),
        publicKey,
        [],
        burnAmount
      )
    );

    // Send transaction
    const { signature } = await provider.signAndSendTransaction(transaction);
    await connection.confirmTransaction(signature, "confirmed");

    alert(`Transaction successful! Signature: ${signature}`);
    console.log("Transaction Signature:", signature);
  } catch (error) {
    console.error("Burn Error:", error);
    alert(`Error during burn: ${error.message}`);
  }
});
