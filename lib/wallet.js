import * as bip39 from 'bip39';
import { ethers } from 'ethers';

// Generate a new 12-word seed phrase
export function generateSeedPhrase() {
  return bip39.generateMnemonic(128); // 12 words
}

// Validate a seed phrase
export function validateSeedPhrase(phrase) {
  return bip39.validateMnemonic(phrase);
}

// Derive Ethereum address from seed phrase
export function getEthereumWallet(seedPhrase) {
  const wallet = ethers.Wallet.fromPhrase(seedPhrase);
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
}

// Derive Solana address from seed phrase
export async function getSolanaWallet(seedPhrase) {
  const { Keypair } = await import('@solana/web3.js');
  const seed = await bip39.mnemonicToSeed(seedPhrase);
  const keypair = Keypair.fromSeed(seed.slice(0, 32));
  return {
    address: keypair.publicKey.toString(),
    secretKey: Array.from(keypair.secretKey),
  };
}

// Store encrypted wallet in localStorage
export function saveWallet(password, data) {
  const encrypted = btoa(JSON.stringify(data)); // Simple encoding (use proper encryption in production)
  localStorage.setItem('flux_wallet', JSON.stringify({ encrypted, password }));
}

// Load wallet from localStorage
export function loadWallet(password) {
  const stored = localStorage.getItem('flux_wallet');
  if (!stored) return null;
  const { encrypted } = JSON.parse(stored);
  return JSON.parse(atob(encrypted));
}