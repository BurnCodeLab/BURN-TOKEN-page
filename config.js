// config.js
require('dotenv').config();

const config = {
  network: process.env.SOLANA_NETWORK || 'devnet',
  tokenMintAddress: process.env.TOKEN_MINT_ADDRESS,
  burnAddress: process.env.BURN_ADDRESS,
  burnAmount: parseInt(process.env.BURN_AMOUNT, 10),
};

module.exports = config;
