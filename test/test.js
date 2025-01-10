// test/test.js
const { expect } = require('chai');
const { isValidPublicKey, formatNumber } = require('../utils');
const { getTokenAccount, getTokenBalance } = require('../token');
const { Connection, PublicKey } = require('@solana/web3.js');

// Mock Solana connection for tests
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

// Unit Tests
describe('Utility Functions', () => {
  it('should validate a correct public key', () => {
    const validKey = '11111111111111111111111111111111';
    expect(isValidPublicKey(validKey)).to.be.true;
  });

  it('should reject an invalid public key', () => {
    const invalidKey = 'INVALID_KEY';
    expect(isValidPublicKey(invalidKey)).to.be.false;
  });

  it('should format numbers correctly', () => {
    const formattedNumber = formatNumber(1234567890);
    expect(formattedNumber).to.equal('1,234,567,890');
  });
});

describe('Token Functions', () => {
  it('should return null for a non-existent token account', async () => {
    const tokenAccount = await getTokenAccount(
      connection,
      new PublicKey('11111111111111111111111111111111'),
      new PublicKey('9nGmUbhs1dh1wSgpwo6V25t4J3nmhYPMhAHmjmxZpump')
    );
    expect(tokenAccount).to.be.null;
  });

  it('should return zero for non-existent token balance', async () => {
    const balance = await getTokenBalance(
      connection,
      new PublicKey('11111111111111111111111111111111')
    );
    expect(balance).to.equal(0);
  });
});
