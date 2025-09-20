import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChartPoint {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  changePercent: number;
  up: boolean;
  chartData: ChartPoint[];
}

interface CoinState {
  coins: Coin[];
}

const initialState: CoinState = {
  coins: [],
};

const coinSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<Coin[]>) => {
      state.coins = action.payload.map(c => ({
        ...c,
        changePercent: 0,
        up: true,
        chartData: [],
      }));
    },
    updateCoinPrice: (
      state,
      action: PayloadAction<{
        id: string;
        price: number;
        changePercent: number;
      }>,
    ) => {
      const coin = state.coins.find(c => c.id === action.payload.id);
      if (coin) {
        coin.price = action.payload.price;
        coin.changePercent = action.payload.changePercent;
        coin.up = action.payload.changePercent >= 0;
      }
    },
    updateCoinChartData: (
      state,
      action: PayloadAction<{ id: string; chartData: ChartPoint[] }>,
    ) => {
      const coin = state.coins.find(c => c.id === action.payload.id);
      if (coin) {
        coin.chartData = action.payload.chartData;
      }
    },
  },
});

export const { setCoins, updateCoinPrice, updateCoinChartData } =
  coinSlice.actions;
export default coinSlice.reducer;
