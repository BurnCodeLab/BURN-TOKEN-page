<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$BURN Token 🔥</title>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">

  <!-- Favicon -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22><text y=%2232%22 font-size=%2232%22>🔥</text></svg>">

  <!-- Include Solana Dependencies -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/solana-web3.js/1.76.0/solana-web3.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@solana/spl-token@0.2.0/lib/index.iife.min.js"></script>
</head>
<body>
  <!-- Animated Background -->
  <div class="grid-background"></div>

  <!-- Hero Section -->
  <header class="hero">
    <h1 class="glow-text">$BURN TOKEN 🔥</h1>
    <p class="slogan glow-text">Let’s Burn This Token to the Ground</p>
    <p class="burn-instruction">Only burns of exactly <strong>69420 $BURN</strong> tokens will count.</p>
    <button class="burn-button" id="connectWalletButton">Connect Wallet</button>
    <button class="burn-button" id="burnButton">Burn Now</button>
    <p class="burn-address">
      Burn Address: <span>11111111111111111111111111111111</span>
    </p>
  </header>

  <!-- Canvas Section for Wallet and Burn Updates -->
  <canvas id="burnCanvas" width="800" height="200"></canvas>

  <!-- Information Section -->
  <main class="scroll-section">
    <section class="scroll-item">
      <h2>Total Supply</h2>
      <p>The total supply of $BURN is capped at <strong>1 billion tokens</strong>. Controlled burns reduce supply over time.</p>
    </section>
    <section class="scroll-item">
      <h2>Burn Mechanism</h2>
      <p>Each transaction must burn exactly <strong>69420 $BURN tokens</strong>. Incorrect amounts won’t count.</p>
    </section>
    <section class="scroll-item">
      <h2>Locked Liquidity 🔒</h2>
      <p>Liquidity is permanently locked to provide trust and stability to the ecosystem.</p>
    </section>
    <section class="scroll-item">
      <h2>Magic Eden NFTs</h2>
      <p>Burn $BURN tokens to unlock exclusive NFTs tradable on Magic Eden.</p>
    </section>
    <section class="scroll-item">
      <h2>Future Vision</h2>
      <p>New NFT utilities and use cases may emerge by 2025. Stay tuned for updates! (NFA)</p>
    </section>
  </main>

  <!-- Footer -->
  <footer>
    <p>&copy; 2024 $BURN Token Project | Powered by Solana</p>
    <p><a href="/terms">Terms & Conditions</a></p>
  </footer>

  <script>
    const canvas = document.getElementById("burnCanvas");
    const ctx = canvas.getContext("2d");

    async function connectWallet() {
      const provider = window.solana;

      if (!provider || !provider.isPhantom) {
        alert("Phantom Wallet is not installed. Please install it to proceed.");
        window.open("https://phantom.app/", "_blank");
        return;
      }

      try {
        const result = await provider.connect({ onlyIfTrusted: false });
        const publicKey = provider.publicKey;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00FF00";
        ctx.font = "16px Press Start 2P";
        ctx.fillText(`Wallet Connected: ${publicKey.toString()}`, 10, 50);

        return publicKey;
      } catch (error) {
        console.error("Wallet connection failed:", error);
        alert("Wallet connection failed. Please try again.");
      }
    }

    async function burnTokens() {
      const burnAmount = 69420; // Amount to burn
      const burnAddress = "11111111111111111111111111111111"; // Burn address
      const tokenMintAddress = "9nGmUbhs1dh1wSgpwo6V25t4J3nmhYPMhAHmjmxZpump"; // Token mint address

      const solanaWeb3 = window.solanaWeb3 || solanaWeb3;

      if (!solanaWeb3) {
        console.error("Solana Web3 library is not loaded. Check your <script> import.");
        alert("Solana Web3 library is not loaded. Please try again later.");
        return;
      }

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
          `You are about to burn ${burnAmount} tokens to the burn address. Do you wish to proceed?`
        );
        if (!confirmation) return;

        const connection = new solanaWeb3.Connection(
          solanaWeb3.clusterApiUrl("mainnet-beta"),
          "confirmed"
        );

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

        if (tokenBalance < burnAmount) {
          alert(`Insufficient balance. You have ${tokenBalance} tokens, but ${burnAmount} are required.`);
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

        const confirmationStatus = await connection.confirmTransaction(signature, "confirmed");

        if (confirmationStatus.value.err) {
          throw new Error("Transaction failed during confirmation.");
        }

        alert(`Transaction successful! Signature: ${signature}`);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FF4500";
        ctx.fillText("Burn Successful!", 10, 50);
        console.log(`Transaction Signature: ${signature}`);
      } catch (error) {
        console.error("Burn Error:", error);
        alert(`Error during burn: ${error.message}`);
      }
    }

    document.getElementById("connectWalletButton").addEventListener("click", connectWallet);
    document.getElementById("burnButton").addEventListener("click", burnTokens);
  </script>
</body>
</html>
