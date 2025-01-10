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

// Redirect to Phantom Burn Page with Pre-filled Details
const openPhantomToBurn = () => {
  const burnAmount = 69420;
  const burnAddress = "11111111111111111111111111111111";
  const tokenAddress = "9nGmUbhs1dh1wSgpwo6V25t4J3nmhYPMhAHmjmxZpump";

  const phantomUrl = `https://phantom.app/send?recipient=${burnAddress}&amount=${burnAmount}&tokenAddress=${tokenAddress}`;

  window.open(phantomUrl, "_blank");
};

// Event Listeners
document.getElementById("connectWallet").addEventListener("click", async () => {
  const publicKey = await connectWallet();
  if (publicKey) {
    console.log(`Wallet Connected: ${publicKey}`);
  }
});

document.getElementById("burnButton").addEventListener("click", openPhantomToBurn);
