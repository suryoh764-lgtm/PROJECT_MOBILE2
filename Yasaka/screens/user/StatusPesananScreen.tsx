import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import * as Colors from '../../constants/Colors';
import * as Fonts from '../../constants/Fonts';

export default function StatusPesananScreen() {
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

        <Header title="STATUS PESANAN" onMenuPress={() => (navigation as any).openDrawer()} onBackPress={() => navigation.goBack()} />

        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={styles.title}>Status Pesanan</Text>
            <Text style={styles.description}>Halaman untuk melihat status pesanan Anda</Text>
          </View>
        </ScrollView>
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: Fonts.SIZE_HEADER,
    fontWeight: Fonts.WEIGHT_BOLD,
    color: Colors.TEXT_LIGHT,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: Fonts.SIZE_MENU_ITEM_NAME,
    color: Colors.TEXT_LIGHT,
    textAlign: 'center',
  },
});
