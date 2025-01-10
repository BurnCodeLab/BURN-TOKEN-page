// index.js
const { Connection, clusterApiUrl } = require('@solana/web3.js');
const { connectWallet } = require('./wallet');
const { getTokenAccount, getTokenBalance } = require('./token');
const config = require('./config');

// Initialize Solana connection
const connection = new Connection(clusterApiUrl(config.network), 'confirmed');

const main = async () => {
  try {
    // Connect wallet
    const walletPublicKey = await connectWallet();
    if (!walletPublicKey) return;

    // Fetch token account
    const tokenAccount = await getTokenAccount(
      connection,
      walletPublicKey,
      config.tokenMintAddress
    );

    if (!tokenAccount) {
      console.log("No token account found.");
      alert("You do not have an SPL token account for this token.");
      return;
    }

    // Check token balance
    const tokenBalance = await getTokenBalance(connection, tokenAccount.pubkey);
    console.log(`Token Balance: ${tokenBalance}`);

    if (tokenBalance < config.burnAmount) {
      alert(
        `Insufficient balance. You have ${tokenBalance} tokens, but ${config.burnAmount} tokens are required.`
      );
      return;
    }

    alert(`You have ${tokenBalance} tokens. Proceed to burn ${config.burnAmount} tokens.`);

    // Logic for burning tokens can be added here

  } catch (error) {
    console.error("Error in main flow:", error);
    alert("An error occurred. Check the console for details.");
  }
};

// Run the main function
main();
