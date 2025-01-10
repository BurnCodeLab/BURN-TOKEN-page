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

// Redirect to Phantom Token Page
const openPhantomTokenPage = () => {
  const tokenUrl =
    "https://phantom.app/tokens/solana/9nGmUbhs1dh1wSgpwo6V25t4J3nmhYPMhAHmjmxZpump?referralId=lwdt8z4n45c";
  window.open(tokenUrl, "_blank");
};

// Burn Setup Instructions
const setupBurn = async () => {
  const burnAmount = 69420;
  const burnAddress = "11111111111111111111111111111111";

  const walletPublicKey = window.solana?.publicKey?.toString();
  if (!walletPublicKey) {
    alert("Please connect your wallet first.");
    return;
  }

  const confirmation = confirm(
    `You are about to open Phantom Wallet to manually burn ${burnAmount} tokens to the burn address: ${burnAddress}. Do you wish to proceed?`
  );

  if (!confirmation) return;

  // Open Phantom Token Page
  openPhantomTokenPage();

  // Provide Burn Address Instructions
  alert(
    `To complete the burn:\n1. Send exactly ${burnAmount} tokens.\n2. Use the following burn address:\n\n${burnAddress}`
  );
};

// Event Listeners
document.getElementById("connectWallet").addEventListener("click", async () => {
  const publicKey = await connectWallet();
  if (publicKey) {
    console.log(`Wallet Connected: ${publicKey}`);
  }
});

document.getElementById("burnButton").addEventListener("click", setupBurn);
