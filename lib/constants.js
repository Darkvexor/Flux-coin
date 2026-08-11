export const WALLET_ADDRESSES = {
  SOL: '8HiLpY5sHRrjnLR3twdFzAsxTDFDX2SFnpLqiY8VTmUa',
  'USDT-ERC20': '0x3c6ec410ea1fF3DE300EaF17e8e0C7cE92B97cbB',
  'USDT-TRC20': 'TJBt99vNTFXqdiPHTY5k95xyVrUkdS3RLt',
  BTC: 'bc1qa8zg4jlf26ux3lc3qj6amln78ampsv9m430vh5',
};

export const PAYMENT_METHODS = [
  { id: 'SOL', name: 'Solana (SOL)', icon: '◎', network: 'Solana' },
  { id: 'USDT-ERC20', name: 'USDT (ERC-20)', icon: '💎', network: 'Ethereum' },
  { id: 'USDT-TRC20', name: 'USDT (TRC-20)', icon: '💎', network: 'Tron' },
  { id: 'BTC', name: 'Bitcoin (BTC)', icon: '₿', network: 'Bitcoin' },
];

export const FLUX_PRICE_USD = 1;
export const MIN_PURCHASE = 500;
export const MAX_PURCHASE = 5000;
export const TOTAL_PRESALE_SUPPLY = 5000000;
export const TOTAL_MARKET_CAP = 20000000;
export const LAUNCH_DATE = new Date('2027-01-01T00:00:00Z');