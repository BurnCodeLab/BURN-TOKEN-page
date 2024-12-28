const tokenMintAddress = "GACpABn18xqiSJbD9ZEyArJDT9RHRMUut5nK9Z9Spump"; // Your token mint address

// Wallet Connect Button
document.getElementById("connectWalletButton").addEventListener("click", async () => {
  const provider = window.solana;

  if (!provider || !provider.isPhantom) {
    alert("Phantom Wallet is not installed. Please install it to proceed.");
    window.open("https://phantom.app/", "_blank");
    return;
  }

  try {
    // Connect to Phantom Wallet
    await provider.connect();
    const publicKey = provider.publicKey.toString();

    document.getElementById("walletInfo").innerText = `Wallet: ${publicKey}`;
    document.getElementById("burnButton").disabled = false;

    // Fetch balance of connected wallet
    const connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl("mainnet-beta"),
      "confirmed"
    );

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(new solanaWeb3.PublicKey(publicKey), {
      mint: new solanaWeb3.PublicKey(tokenMintAddress),
    });

    if (tokenAccounts.value.length > 0) {
      const tokenAccount = tokenAccounts.value[0].pubkey;
      const balanceResponse = await connection.getTokenAccountBalance(tokenAccount);
      const balance = parseInt(balanceResponse.value.amount);

      document.getElementById("walletBalance").innerText = `Balance: ${balance} $BURN`;
    } else {
      document.getElementById("walletBalance").innerText = "Balance: 0 $BURN";
    }
  } catch (error) {
    alert(`Error connecting wallet: ${error.message}`);
    console.error("Wallet Connect Error:", error);
  }
});

// Burn Button functionality
document.getElementById("burnButton").addEventListener("click", async () => {
  const burnAmount = 69420; // Amount to burn
  const burnAddress = "11111111111111111111111111111111"; // Solana burn address

  const provider = window.solana;

  try {
    const connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl("mainnet-beta"),
      "confirmed"
    );

    const publicKey = provider.publicKey;
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      mint: new solanaWeb3.PublicKey(tokenMintAddress),
    });

    if (tokenAccounts.value.length === 0) {
      alert("No token account found for the specified SPL token.");
      return;
    }

    const tokenAccount = tokenAccounts.value[0].pubkey;
    const balanceResponse = await connection.getTokenAccountBalance(tokenAccount);
    const tokenBalance = parseInt(balanceResponse.value.amount);

    if (tokenBalance < burnAmount) {
      alert(`Insufficient balance. You have ${tokenBalance} tokens.`);
      return;
    }

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

    const { signature } = await provider.signAndSendTransaction(transaction);
    alert(`Transaction sent! Signature: ${signature}`);
  } catch (error) {
    alert(`Error during burn: ${error.message}`);
    console.error("Burn Error:", error);
  }
});
