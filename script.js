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

  const burnAmount = 69420;
  const burnAddress = "11111111111111111111111111111111";
  const tokenMintAddress = "9nGmUbhs1dh1wSgpwo6V25t4J3nmhYPMhAHmjmxZpump";

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
    await connection.confirmTransaction(signature, "confirmed");

    alert(`Transaction successful! Signature: ${signature}`);
    console.log("Transaction Signature:", signature);
  } catch (error) {
    console.error("Burn Error:", error);
    alert(`Error during burn: ${error.message}`);
  }
});
