# $BURN Token 🔥

## Overview
$BURN Token is a Solana-based web application that allows users to burn tokens securely using the Phantom Wallet. The project includes real-time wallet connection, token balance checking, and burn functionality, integrated with Solana's SPL Token Program.

## Features
- **Phantom Wallet Integration**: Connect and interact with your Solana wallet.
- **Token Burning**: Burn exactly `69420 $BURN` tokens.
- **Dynamic Animations**: Enjoy a responsive and engaging UI.
- **Secure Transactions**: Leveraging Solana's blockchain for transparency.

## Technologies Used
- **Solana Web3.js**
- **Solana SPL Token**
- **Node.js**
- **GitHub Pages** for hosting

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/<your-repository-name>.git
   cd <your-repository-name>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Add Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```
   SOLANA_NETWORK=mainnet-beta
   TOKEN_MINT_ADDRESS=9nGmUbhs1dh1wSgpwo6V25t4J3nmhYPMhAHmjmxZpump
   BURN_ADDRESS=11111111111111111111111111111111
   BURN_AMOUNT=69420
   ```

4. **Run Locally**:
   Use `lite-server` for local development:
   ```bash
   npm start
   ```

5. **Deploy to GitHub Pages**:
   Ensure the `homepage` field in `package.json` is set:
   ```json
   "homepage": "https://<your-username>.github.io/<your-repository-name>",
   ```
   Then deploy:
   ```bash
   npm run deploy
   ```

## Usage

- Open the application in a browser.
- Connect your Phantom Wallet.
- Verify your $BURN token balance.
- Burn exactly `69420 $BURN` tokens by clicking the `Burn Now` button.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests to improve the project.
