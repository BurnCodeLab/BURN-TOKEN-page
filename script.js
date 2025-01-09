<<<<<<< HEAD
// Phantom Wallet Burn Tool Integration
document.getElementById("burnButton").addEventListener("click", async () => {
  const burnAmount = 69420; // Amount to burn
  const burnAddress = "11111111111111111111111111111111"; // Solana burn address
  const tokenMintAddress = "GACpABn18xqiSJbD9ZEyArJDT9RHRMUut5nK9Z9Spump"; // Your token mint address

=======

document.getElementById("burnButton").addEventListener("click", async () => {
  const burnAmount = 69420; // Amount of tokens to burn
  const burnAddress = "11111111111111111111111111111111"; // Solana burn address
  const tokenMintAddress = "9nGmUbhs1dh1wSgpwo6V25t4J3nmhYPMhAHmjmxZpump"; // Your specific token mint address

>>>>>>> 9f6ce859059a6f5675ed30450db94d71334059ef
  const provider = window.solana;
  if (!provider || !provider.isPhantom) {
    alert("Phantom Wallet is not installed. Please install it to proceed.");
    window.open("https://phantom.app/", "_blank");
    return;
  }

  try {
    await provider.connect();
    const publicKey = provider.publicKey;

    const confirmation = confirm(
      `You are about to burn ${burnAmount} tokens to the Solana burn address. Do you wish to proceed?`
    );
<<<<<<< HEAD
    if (!confirmation) return;

=======

    if (!confirmation) return;

>>>>>>> 9f6ce859059a6f5675ed30450db94d71334059ef
    const connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl("mainnet-beta"),
      "confirmed"
    );

<<<<<<< HEAD
=======
    // Fetch token accounts by owner
>>>>>>> 9f6ce859059a6f5675ed30450db94d71334059ef
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      mint: new solanaWeb3.PublicKey(tokenMintAddress),
    });

    if (tokenAccounts.value.length === 0) {
      alert("No token account found for the specified SPL token. Ensure you hold the required tokens.");
      return;
    }

    const tokenAccount = tokenAccounts.value[0].pubkey;
    const balanceResponse = await connection.getTokenAccountBalance(tokenAccount);
    const tokenBalance = parseInt(balanceResponse.value.amount);
<<<<<<< HEAD

    if (tokenBalance < burnAmount) {
      alert(`Insufficient balance. You have ${tokenBalance} tokens, but ${burnAmount} are required.`);
      return;
    }
=======
>>>>>>> 9f6ce859059a6f5675ed30450db94d71334059ef

    if (tokenBalance < burnAmount) {
      alert(`Insufficient balance. You have ${tokenBalance} tokens, but ${burnAmount} are required.`);
      return;
    }

    // Create a burn transaction
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

    const confirmationStatus = await connection.confirmTransaction(signature, "confirmed");

    if (confirmationStatus.value.err) {
      throw new Error("Transaction failed during confirmation.");
    }

    alert(`Transaction successful! Signature: ${signature}`);
    console.log(`Transaction Signature: ${signature}`);
  } catch (error) {
    alert(`Error during burn: ${error.message}`);
    console.error("Burn Error:", error);
  }
});

// Scroll Animation
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".scroll-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.5 }
  );

  items.forEach((item) => observer.observe(item));
});
