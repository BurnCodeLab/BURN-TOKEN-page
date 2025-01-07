// Phantom Wallet Burn Tool Integration for Canvas
const canvas = document.getElementById("burnCanvas");
const ctx = canvas.getContext("2d");

// Initialize Phantom Wallet
async function connectWallet() {
    const provider = window.solana;

    if (!provider || !provider.isPhantom) {
        alert("Phantom Wallet is not installed. Please install it to proceed.");
        window.open("https://phantom.app/", "_blank");
        return;
    }

    try {
        // Connect to Phantom Wallet
        await provider.connect();
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

// Burn Tokens Function
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

// Attach Event Listeners
document.getElementById("connectWalletButton").addEventListener("click", connectWallet);
document.getElementById("burnButton").addEventListener("click", burnTokens);
