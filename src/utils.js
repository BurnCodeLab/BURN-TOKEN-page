// utils.js
const { PublicKey } = require('@solana/web3.js');

// Validate if a string is a valid Solana public key
const isValidPublicKey = (key) => {
  try {
    new PublicKey(key);
    return true;
  } catch (error) {
    return false;
  }
};

// Format large numbers for readability
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

module.exports = {
  isValidPublicKey,
  formatNumber,
};
