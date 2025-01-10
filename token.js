// token.js
const { PublicKey } = require('@solana/web3.js');
const { TOKEN_PROGRAM_ID } = require('@solana/spl-token');

// Fetch SPL token account for a given wallet
const getTokenAccount = async (connection, owner, mint) => {
  try {
    const accounts = await connection.getParsedTokenAccountsByOwner(
      new PublicKey(owner),
      { mint: new PublicKey(mint) }
    );
    return accounts.value.length ? accounts.value[0] : null;
  } catch (error) {
    console.error("Error fetching token account:", error);
    return null;
  }
};

// Check SPL token balance
const getTokenBalance = async (connection, tokenAccount) => {
  try {
    const balanceResponse = await connection.getTokenAccountBalance(tokenAccount);
    return parseInt(balanceResponse.value.amount);
  } catch (error) {
    console.error("Error fetching token balance:", error);
    return 0;
  }
};

module.exports = {
  getTokenAccount,
  getTokenBalance,
};
