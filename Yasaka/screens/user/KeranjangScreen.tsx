import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import * as Colors from '../../constants/Colors';

export default function KeranjangScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/cover.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <BlurView
          intensity={30}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />

        <Header title="KERANJANG" onMenuPress={() => (navigation as any).openDrawer()} onBackPress={() => navigation.goBack()} />

        <View style={styles.content}>
          <Text style={styles.text}>Keranjang Screen</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_OVERLAY,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});
