import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import * as Colors from '../../constants/Colors';
import * as Fonts from '../../constants/Fonts';

export default function KeranjangScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedTable } = (route.params as { selectedTable?: string }) || {};
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
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

        <ScrollView style={styles.cartContainer} showsVerticalScrollIndicator={false}>
          {cartItems.length === 0 ? (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartText}>Keranjang kosong</Text>
              <Text style={styles.emptyCartSubtext}>Tambahkan menu dari halaman menu</Text>
            </View>
          ) : (
            cartItems.map(item => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <View style={styles.titleRow}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeFromCart(item.id)}
                    >
                      <Ionicons name="trash" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.bottomRow}>
                    <Text style={styles.itemPrice}>{formatCurrency(item.price)}</Text>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Ionicons name="remove" size={16} color="white" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Ionicons name="add" size={16} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        {cartItems.length > 0 && (
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: {formatCurrency(getTotalPrice())}</Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>PESAN SEKARANG</Text>
            </TouchableOpacity>
          </View>
        )}
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
  cartContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: Fonts.SIZE_HEADER,
    color: Colors.TEXT_LIGHT,
    fontWeight: Fonts.WEIGHT_BOLD,
    marginBottom: 10,
  },
  emptyCartSubtext: {
    fontSize: Fonts.SIZE_MENU_ITEM_NAME,
    color: Colors.TEXT_LIGHT,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: Fonts.SIZE_MENU_ITEM_NAME,
    color: Colors.TEXT_LIGHT,
    fontWeight: Fonts.WEIGHT_BOLD,
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: Fonts.SIZE_MENU_ITEM_PRICE,
    color: Colors.TEXT_LIGHT,
    marginTop: 5,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: Fonts.SIZE_MENU_ITEM_NAME,
    color: Colors.TEXT_LIGHT,
    marginHorizontal: 15,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: Colors.TEXT_DARK,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  totalText: {
    fontSize: Fonts.SIZE_HEADER,
    color: Colors.TEXT_LIGHT,
    fontWeight: Fonts.WEIGHT_BOLD,
    textAlign: 'center',
    marginBottom: 15,
  },
  checkoutButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: Colors.TEXT_DARK,
    fontSize: Fonts.SIZE_BUTTON,
    fontWeight: Fonts.WEIGHT_BOLD,
  },
});
