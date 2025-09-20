export const theme = {
  color: {
    black: '#000000',
    white: '#ffffff',
    yellow: '#F59E0B',
    purple: '#6366F1',
    red: '#EF4444',
    green: '#10B981',
    blue: '#3B82F6',
    grayLight: '#D1D5DB',
    gray: '#9CA3AF',
    grayDark: '#374151',
    background: '#111827',
    backgroundSecondary: '#1F2937',
  },
};

import { Coin } from '../redux/slice/coinSlice';

export const generateInitialChartData = (basePrice: number, length = 20) => {
  return Array.from({ length }, (_, i) => {
    const open = basePrice + Math.random() * 10 - 5;
    const close = open + Math.random() * 5 - 2.5;
    const high = Math.max(open, close) + Math.random() * 5;
    const low = Math.min(open, close) - Math.random() * 5;
    return { time: Date.now() + i * 1000, open, high, low, close };
  });
};

export const getNextChartPoint = (lastClose: number) => {
  const open = lastClose;
  const close = open + Math.random() * 10 - 5;
  const high = Math.max(open, close) + Math.random() * 3;
  const low = Math.min(open, close) - Math.random() * 3;
  return { time: Date.now(), open, high, low, close };
};

export const updateCoinData = (coin: Coin, chartRef: Coin['chartData']) => {
  const last = chartRef[chartRef.length - 1] || { close: coin.price };
  const newPoint = getNextChartPoint(last.close);

  const newChart = [...chartRef.slice(1), newPoint];
  const newPrice = Number(newPoint.close.toFixed(2));
  const changePercent = Number(
    (((newPrice - coin.price) / coin.price) * 100).toFixed(2),
  );

  return { newChart, newPrice, changePercent };
};
