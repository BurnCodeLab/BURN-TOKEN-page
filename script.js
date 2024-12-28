// Wallet Connect
const connectWalletButton = document.getElementById("connectWalletButton");
const burnButton = document.getElementById("burnButton");

let walletConnected = false;

connectWalletButton.addEventListener("click", async () => {
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

    connectWalletButton.textContent = `Wallet: ${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`;
    burnButton.disabled = false;

    console.log("Wallet connected:", publicKey);
  } catch (error) {
    alert("Failed to connect wallet. Please try again.");
    console.error("Wallet Connection Error:", error);
  }
});

// Burn Button Functionality
burnButton.addEventListener("click", async () => {
  // Burn button functionality remains the same as previously discussed
});
