import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../components/Header';
import * as Colors from '../../constants/Colors';
import * as Fonts from '../../constants/Fonts';

export default function KeranjangScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedTable } = (route.params as { selectedTable?: string }) || {};
  const [notes, setNotes] = useState('');

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

        <View style={styles.infoContainer}>
          <View style={styles.tableInfo}>
            <Text style={styles.label}>No Meja:</Text>
            <Text style={styles.value}>{selectedTable || 'Belum dipilih'}</Text>
          </View>
          <View style={styles.notesContainer}>
            <Text style={styles.label}>Catatan Pesanan:</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Tulis catatan untuk pesanan Anda..."
              placeholderTextColor={Colors.TEXT_LIGHT}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

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
  infoContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tableInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  notesContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: Fonts.SIZE_HEADER,
    fontWeight: Fonts.WEIGHT_BOLD,
    color: Colors.TEXT_LIGHT,
    marginRight: 10,
  },
  value: {
    fontSize: Fonts.SIZE_HEADER,
    color: Colors.TEXT_LIGHT,
    fontWeight: Fonts.WEIGHT_BOLD,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: Colors.TEXT_LIGHT,
    borderRadius: 8,
    padding: 10,
    fontSize: Fonts.SIZE_MENU_ITEM_NAME,
    color: Colors.TEXT_LIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    textAlignVertical: 'top',
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
