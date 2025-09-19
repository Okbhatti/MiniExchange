interface Coin {
  id: string;
  name: string;
  price: number;
  change: string;
  up: boolean;
}

export const initialCoins: Coin[] = [
  { id: '1', name: 'BTC/USDT', price: 46600, change: '+3.2%', up: true },
  { id: '2', name: 'ETH/USDT', price: 3250, change: '-0.8%', up: false },
  { id: '3', name: 'BNB/USDT', price: 410, change: '+1.1%', up: true },
  { id: '4', name: 'ADA/USDT', price: 1.25, change: '+2.4%', up: true },
  { id: '5', name: 'XRP/USDT', price: 0.85, change: '-1.2%', up: false },
  { id: '6', name: 'SOL/USDT', price: 145, change: '+0.6%', up: true },
  { id: '7', name: 'DOGE/USDT', price: 0.25, change: '+5.4%', up: true },
  { id: '8', name: 'DOT/USDT', price: 36, change: '-0.5%', up: false },
  { id: '9', name: 'LTC/USDT', price: 130, change: '+1.8%', up: true },
  { id: '10', name: 'UNI/USDT', price: 24, change: '-2.1%', up: false },
  { id: '11', name: 'MATIC/USDT', price: 1.15, change: '+3.1%', up: true },
  { id: '12', name: 'SHIB/USDT', price: 0.00007, change: '+10.2%', up: true },
  { id: '13', name: 'AVAX/USDT', price: 68, change: '-0.9%', up: false },
  { id: '14', name: 'TRX/USDT', price: 0.09, change: '+1.4%', up: true },
  { id: '15', name: 'ATOM/USDT', price: 32, change: '-1.5%', up: false },
  { id: '16', name: 'LINK/USDT', price: 28, change: '+2.7%', up: true },
  { id: '17', name: 'AAVE/USDT', price: 310, change: '-0.3%', up: false },
  { id: '18', name: 'FTM/USDT', price: 2.1, change: '+4.2%', up: true },
  { id: '19', name: 'NEAR/USDT', price: 10.5, change: '-0.6%', up: false },
  { id: '20', name: 'EGLD/USDT', price: 270, change: '+1.9%', up: true },
];
