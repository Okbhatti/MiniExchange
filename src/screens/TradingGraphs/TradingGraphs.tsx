import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { WebView } from 'react-native-webview';
import { LineChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../../utils/helper';
import { styles } from './style';
import { Loader } from '../../components';
import {
  Coin,
  updateCoinChartData,
  updateCoinPrice,
} from '../../redux/slice/coinSlice';
import { RootState } from '../../redux/store';
import { getNextChartPoint } from '../../utils/helper';

const screenWidth = Dimensions.get('window').width;

const formatNumber = (num: number) =>
  num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num.toString();

const TradingGraphs = ({ route }: any) => {
  const { coinId } = route.params;
  const dispatch = useDispatch();
  const coinData = useSelector((state: RootState) =>
    state.coins.coins.find(c => c.id === coinId),
  );

  const webviewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef<Coin['chartData']>(coinData?.chartData || []);

  useEffect(() => {
    if (coinData?.chartData.length) chartRef.current = coinData.chartData;
  }, [coinData]);

  useEffect(() => {
    if (!coinData) return;
    const basePrice = coinData.price;

    const interval = setInterval(() => {
      if (!coinData) return;

      const last = chartRef.current[chartRef.current.length - 1] || {
        close: coinData.price,
      };
      const newPoint = getNextChartPoint(last.close);

      chartRef.current = [...chartRef.current.slice(1), newPoint];

      dispatch(
        updateCoinChartData({ id: coinId, chartData: chartRef.current }),
      );
      dispatch(
        updateCoinPrice({
          id: coinId,
          price: Number(newPoint.close.toFixed(2)),
          changePercent: Number(
            (((newPoint.close - basePrice) / basePrice) * 100).toFixed(2),
          ),
        }),
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [coinData, coinId, dispatch]);

  useEffect(() => {
    if (webviewRef.current && coinData?.chartData.length) {
      webviewRef.current.postMessage(JSON.stringify(coinData.chartData));
    }
  }, [coinData?.chartData]);

  if (!coinData)
    return (
      <View>
        <Text>Coin data not found</Text>
      </View>
    );

  const linePrices = coinData.chartData.map(d => d.close);
  const lineColor =
    linePrices.length > 1
      ? linePrices[linePrices.length - 1] >= linePrices[linePrices.length - 2]
        ? theme.color.green
        : theme.color.red
      : theme.color.gray;

  const labelCount = 6;
  const lineLabels = coinData.chartData
    .map(d => new Date(d.time).toLocaleTimeString())
    .filter(
      (_, i) => i % Math.ceil(coinData.chartData.length / labelCount) === 0,
    );

  const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script src="https://cdn.plot.ly/plotly-2.30.0.min.js"></script>
    <style>
      body, html { margin:0; padding:0; height:100%; width:100%; background:black; overflow:hidden; }
      #plot { width:100%; height:100%; }
    </style>
  </head>
  <body>
    <div id="plot"></div>
    <script>
      let chartData = [];
      function renderChart(data) {
        if (!data || data.length === 0) return;
        const trace = {
          x: data.map(d => new Date(d.time).toLocaleTimeString()),
          open: data.map(d => d.open),
          high: data.map(d => d.high),
          low: data.map(d => d.low),
          close: data.map(d => d.close),
          type: 'candlestick',
          increasing: { line: { color: 'green' } },
          decreasing: { line: { color: 'red' } }
        };
        const layout = {
          margin: { t: 30, b: 30, l: 50, r: 20 },
          xaxis: { showgrid: false, fixedrange: true, rangeslider: { visible: false } },
          yaxis: { autorange: true, fixedrange: true },
          paper_bgcolor: '#111827',
          plot_bgcolor: '#111827',
          font: { color: 'white' }
        };
        const config = { displayModeBar: false, staticPlot: true };
        Plotly.newPlot('plot', [trace], layout, config);
      }
      document.addEventListener('message', function(event) {
        try { chartData = JSON.parse(event.data); renderChart(chartData); }
        catch(e){ console.error("Parse error", e); }
      });
      // For iOS
      window.addEventListener('message', function(event) {
        try { chartData = JSON.parse(event.data); renderChart(chartData); }
        catch(e){ console.error("Parse error", e); }
      });
    </script>
  </body>
</html>
`;

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
      >
        <Text style={styles.title}>{coinData.name} Live Insights</Text>

        <View
          pointerEvents="none"
          style={{
            width: screenWidth - 20,
            height: 300,
            marginVertical: 20,
            backgroundColor: theme.color.backgroundSecondary,
            borderRadius: 10,
          }}
        >
          <WebView
            ref={webviewRef}
            originWhitelist={['*']}
            source={{ html: htmlContent }}
            javaScriptEnabled
            style={{
              flex: 1,
              width: '100%',
              height: 300,
              backgroundColor: theme.color.backgroundSecondary,
            }}
            scrollEnabled={false}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setTimeout(() => setLoading(false), 2000)}
          />
        </View>

        {linePrices.length > 0 && (
          <LineChart
            data={{ labels: lineLabels, datasets: [{ data: linePrices }] }}
            width={screenWidth - 20}
            height={180}
            yAxisSuffix=""
            yAxisInterval={1}
            withVerticalLabels
            withHorizontalLabels
            withDots={false}
            withInnerLines
            withOuterLines
            formatYLabel={value => formatNumber(Number(value))}
            chartConfig={{
              backgroundColor: theme.color.backgroundSecondary,
              backgroundGradientFrom: theme.color.backgroundSecondary,
              backgroundGradientTo: theme.color.backgroundSecondary,
              decimalPlaces: 2,
              color: () => lineColor,
              labelColor: () => theme.color.gray,
              propsForBackgroundLines: {
                strokeWidth: 0.5,
                stroke: theme.color.grayDark,
              },
            }}
            bezier
            style={{ marginVertical: 10, borderRadius: 10 }}
          />
        )}

        <View style={styles.progressWrapper}>
          {/* Label on Top */}
          <Text style={styles.labelOutside}>Current Price</Text>

          <AnimatedCircularProgress
            size={220}
            width={18}
            fill={Math.max(Math.abs(coinData.changePercent), 100)}
            tintColor={lineColor}
            backgroundColor={theme.color.grayDark}
            rotation={0}
            lineCap="round"
          >
            {() => (
              <View style={styles.circleContent}>
                <Text style={styles.priceInside}>${coinData.price}</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export { TradingGraphs };
