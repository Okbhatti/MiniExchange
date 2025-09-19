import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { theme } from '../../utils/helper';
import { styles } from './style';
// import { WebView } from 'react-native-webview';

const screenWidth = Dimensions.get('window').width;

const TradingGraphs = ({ route }: any) => {
  const { coin } = route.params;
  const [currentPrice, setCurrentPrice] = useState<number>(coin.price);
  const [changePercent, setChangePercent] = useState<number>(0);
  const [chartData, setChartData] = useState<
    { time: number; open: number; high: number; low: number; close: number }[]
  >([]);

  useEffect(() => {
    const basePrice = coin.price;

    // Initialize 20 points of OHLC data
    let initialData = Array.from({ length: 20 }, (_, i) => {
      const open = basePrice + Math.random() * 10 - 5;
      const close = open + Math.random() * 5 - 2.5;
      const high = Math.max(open, close) + Math.random() * 5;
      const low = Math.min(open, close) - Math.random() * 5;
      return { time: Date.now() + i * 1000, open, high, low, close };
    });

    setChartData(initialData);

    const interval = setInterval(() => {
      setChartData(prev => {
        if (prev.length === 0) return prev;

        const last = prev[prev.length - 1];
        const open = last.close;
        const close = open + Math.random() * 10 - 5;
        const high = Math.max(open, close) + Math.random() * 3;
        const low = Math.min(open, close) - Math.random() * 3;

        const newPoint = { time: Date.now(), open, high, low, close };

        // Update current price and change percent
        setCurrentPrice(Number(close.toFixed(2)));
        setChangePercent(
          Number((((close - basePrice) / basePrice) * 100).toFixed(2)),
        );

        return [...prev.slice(1), newPoint];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [coin.price]);

  // ✅ Avoid crashes when chartData is empty
  const plotlyData =
    chartData.length > 0
      ? {
          x: chartData.map(d => new Date(d.time).toLocaleTimeString()),
          open: chartData.map(d => d.open),
          high: chartData.map(d => d.high),
          low: chartData.map(d => d.low),
          close: chartData.map(d => d.close),
          type: 'candlestick',
          increasing: { line: { color: theme.color.green } },
          decreasing: { line: { color: theme.color.red } },
        }
      : {};

  const plotlyLayout = {
    title: `${coin.name} Price Chart`,
    xaxis: { title: 'Time' },
    yaxis: { title: 'Price', autorange: true },
    autosize: true,
    margin: { t: 50, b: 50 },
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
      </head>
      <body>
        <div id="plot" style="width:100%;height:100%;"></div>
        <script>
          const data = [${JSON.stringify(plotlyData)}];
          const layout = ${JSON.stringify(plotlyLayout)};
          if(data[0] && data[0].x && data[0].x.length > 0){
            Plotly.newPlot('plot', data, layout, {responsive: true});
          }
        </script>
      </body>
    </html>
  `;

  // ✅ High & Low safe calculation
  const high =
    chartData.length > 0
      ? Math.max(...chartData.map(c => c.high)).toFixed(2)
      : '--';
  const low =
    chartData.length > 0
      ? Math.min(...chartData.map(c => c.low)).toFixed(2)
      : '--';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
      >
        {/* Coin Name */}
        <Text style={styles.title}>{coin.name} Trading Dashboard</Text>

        {/* Candlestick Chart */}
        <View
          style={{ width: screenWidth - 20, height: 300, marginVertical: 20 }}
        >
          {/* <WebView
            originWhitelist={['*']}
            source={{ html: htmlContent }}
            style={{ flex: 1 }}
          /> */}
        </View>

        {/* Stats */}
        <View style={styles.statsBox}>
          <Text style={styles.stat}>Current Price: ${currentPrice}</Text>
          <Text
            style={[
              styles.stat,
              {
                color: changePercent >= 0 ? theme.color.green : theme.color.red,
              },
            ]}
          >
            Change:{' '}
            {changePercent >= 0 ? `+${changePercent}%` : `${changePercent}%`}
          </Text>
          <Text style={styles.stat}>High: ${high}</Text>
          <Text style={styles.stat}>Low: ${low}</Text>
        </View>

        {/* 🔹 Circular Indicators */}
        <AnimatedCircularProgress
          style={{ marginTop: 30 }}
          size={220}
          width={15}
          fill={Math.min(Math.abs(changePercent), 100)}
          tintColor={changePercent >= 0 ? theme.color.green : theme.color.red}
          backgroundColor={theme.color.grayDark}
        >
          {() => (
            <View style={{ alignItems: 'center' }}>
              <Text
                style={[
                  styles.price,
                  {
                    color:
                      changePercent >= 0 ? theme.color.green : theme.color.red,
                    fontSize: 28,
                  },
                ]}
              >
                ${currentPrice}
              </Text>
              <Text
                style={{
                  color:
                    changePercent >= 0 ? theme.color.green : theme.color.red,
                }}
              >
                {changePercent >= 0
                  ? `+${changePercent}%`
                  : `${changePercent}%`}
              </Text>
              <Text
                style={{ color: theme.color.gray, fontSize: 14, marginTop: 4 }}
              >
                Current Price
              </Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </ScrollView>
    </SafeAreaView>
  );
};

export { TradingGraphs };
