import React from 'react';
import { Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bgImage } from '../../assets';
import { styles } from './styles';

const Home = (props: any) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={bgImage}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <View style={styles.overlay} />

        <View style={styles.container}>
          <Text style={styles.title}>Welcome to CryptoLine</Text>
          <Text style={styles.subtitle}>
            Track, Trade & Analyze the market in real-time. Stay ahead with live
            charts, insights, and secure trading.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate('allCoins')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export { Home };
