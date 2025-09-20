import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../../utils/helper';
import { styles } from './styles';
import { localCoins } from '../../utils/strings';
import {
  Coin,
  setCoins,
  updateCoinChartData,
  updateCoinPrice,
} from '../../redux/slice/coinSlice';
import { RootState } from '../../redux/store';
import { generateInitialChartData, updateCoinData } from '../../utils/helper';

type CoinItemProps = {
  coin: Coin;
  cardBg: string;
  onPress: () => void;
};

const CoinItem = ({ coin, cardBg, onPress }: CoinItemProps) => {
  const [logoAvailable, setLogoAvailable] = useState(false);
  const logoUri = `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${coin.symbol.toLowerCase()}.png`;

  useEffect(() => {
    Image.prefetch(logoUri)
      .then(() => setLogoAvailable(true))
      .catch(() => setLogoAvailable(false));
  }, [coin.symbol]);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: cardBg,
        marginVertical: 8,
        borderRadius: 12,
        padding: 16,
        height: 80,
        shadowColor: theme.color.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {logoAvailable ? (
          <Image
            source={{ uri: logoUri }}
            style={{
              width: 36,
              height: 36,
              marginRight: 12,
              borderRadius: 18,
              backgroundColor: '#F3F4F6',
            }}
            resizeMode="contain"
          />
        ) : (
          <View
            style={{
              width: 36,
              height: 36,
              marginRight: 12,
              borderRadius: 18,
              backgroundColor: '#6366F1',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
                textTransform: 'uppercase',
              }}
            >
              {coin?.name?.charAt(0)?.toLocaleUpperCase()}
            </Text>
          </View>
        )}
        <Text style={styles.coinName}>{coin.name}</Text>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.coinPrice}>${coin.price.toFixed(2)}</Text>
        <Text
          style={[
            styles.coinChange,
            {
              color:
                coin.changePercent >= 0 ? theme.color.green : theme.color.red,
            },
          ]}
        >
          {coin.changePercent.toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const TradingHome = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const coins = useSelector((state: RootState) => state.coins.coins);
  const cardBg = theme.color.backgroundSecondary;
  const [equity, setEquity] = useState<number>(5000);
  const chartRefs = useRef<Record<string, Coin['chartData']>>({});

  useEffect(() => {
    dispatch(setCoins(localCoins));
    localCoins.forEach((coin: any) => {
      const initialData = generateInitialChartData(coin.price);
      chartRefs.current[coin.id] = initialData;
      dispatch(updateCoinChartData({ id: coin.id, chartData: initialData }));
    });
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      coins.forEach(coin => {
        const { newChart, newPrice, changePercent } = updateCoinData(
          coin,
          chartRefs.current[coin.id],
        );
        chartRefs.current[coin.id] = newChart;

        dispatch(updateCoinChartData({ id: coin.id, chartData: newChart }));
        dispatch(
          updateCoinPrice({ id: coin.id, price: newPrice, changePercent }),
        );
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [coins, dispatch]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.background }}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Welcome, Trader!</Text>
        <Text style={styles.amount}>${equity.toFixed(2)}</Text>

        <FlatList
          data={coins}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CoinItem
              coin={item}
              cardBg={cardBg}
              onPress={() =>
                navigation.navigate('coinDetails', { coinId: item.id })
              }
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export { TradingHome };
