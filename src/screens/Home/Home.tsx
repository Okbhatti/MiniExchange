import React from 'react';
import { Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { bgImage } from '../../assets';
import { styles } from './styles';
import { theme } from '../../utils/helper';

const Home = (props: any) => {
  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Mini Exchange</Text>
        <Text style={styles.subtitle}>
          Track, Trade & Analyze the market in real-time. Stay ahead with live
          charts and insights.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('allCoins')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export { Home };
