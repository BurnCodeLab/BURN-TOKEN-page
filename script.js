// Phantom Wallet Integration
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

// Redirect to Phantom Burn Page with Pre-filled Details
const openPhantomToBurn = () => {
  const burnAmount = 69420;
  const burnAddress = "11111111111111111111111111111111";
  const tokenAddress = "9nGmUbhs1dh1wSgpwo6V25t4J3nmhYPMhAHmjmxZpump";

  // Construct Phantom's Send URL
  const phantomUrl = `https://phantom.app/send?recipient=${burnAddress}&amount=${burnAmount}&tokenAddress=${tokenAddress}`;

  // Open Phantom's Send Page in a new tab
  window.open(phantomUrl, "_blank");
};

// Attach Event Listeners after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.getElementById("connectWallet");
  const burnBtn = document.getElementById("burnButton");

  connectBtn.addEventListener("click", async () => {
    const publicKey = await connectWallet();
    if (publicKey) {
      console.log(`Wallet Connected: ${publicKey}`);
    }
  });

  burnBtn.addEventListener("click", openPhantomToBurn);
});
