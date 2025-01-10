// wallet.js

// Connect to Phantom Wallet
const connectWallet = async () => {
  const provider = window.solana;

  if (!provider || !provider.isPhantom) {
    alert("Phantom Wallet is not installed. Please install it to proceed.");
    window.open("https://phantom.app/", "_blank");
    return null;
  }

  try {
    const response = await provider.connect();
    const publicKey = response.publicKey.toString();
    alert(`Wallet connected: ${publicKey}`);
    return publicKey;
  } catch (error) {
    console.error("Error connecting to Phantom Wallet:", error);
    alert("Failed to connect wallet.");
    return null;
  }
};

module.exports = {
  connectWallet,
};
