import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../utils/helper';
import { styles } from './styles';
import { initialCoins } from '../../utils/strings';

const screenWidth = Dimensions.get('window').width;

interface Coin {
  id: string;
  name: string;
  price: number;
  change: string;
  up: boolean;
}

const TradingHome = (props: any) => {
  const [coins, setCoins] = useState<Coin[]>(initialCoins);
  const [equity, setEquity] = useState<number>(5000);
  const [balance, setBalance] = useState<number>(5000);
  const fluctuate = () => {
    let portfolioChange = 0;

    const updatedCoins = coins.map(coin => {
      const randomChange = (Math.random() - 0.5) * 0.05;
      const newPrice = coin.price * (1 + randomChange);
      const changePercent = ((newPrice - coin.price) / coin.price) * 100;
      const up = newPrice > coin.price;
      portfolioChange += changePercent;

      return {
        ...coin,
        price: newPrice,
        change: `${changePercent.toFixed(2)}%`,
        up,
      };
    });

    setCoins(updatedCoins);

    setEquity(prev => prev * (1 + portfolioChange / (coins.length * 100)));
    setBalance(prev => prev * (1 + portfolioChange / (coins.length * 100)));
  };

  useEffect(() => {
    const interval = setInterval(fluctuate, 2000);
    return () => clearInterval(interval);
  }, [coins]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Welcome, Trader!</Text>
        <Text style={styles.amount}>${equity.toFixed(2)}</Text>

        <View style={styles.summaryBox}>
          <Text style={styles.income}>Equity: ${equity.toFixed(2)}</Text>
          <Text style={styles.outcome}>Balance: ${balance.toFixed(2)}</Text>
        </View>
        <FlatList
          data={coins}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.coinRow}
              onPress={() =>
                props.navigation.navigate('coinDetails', { coin: item })
              }
            >
              <Text style={styles.coinName}>{item.name}</Text>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.coinPrice}>${item.price.toFixed(2)}</Text>
                <Text
                  style={[
                    styles.coinChange,
                    { color: item.up ? theme.color.green : theme.color.red },
                  ]}
                >
                  {item.change}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export { TradingHome };
