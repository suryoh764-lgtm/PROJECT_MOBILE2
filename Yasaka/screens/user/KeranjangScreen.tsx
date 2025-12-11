
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, ScrollView, TouchableOpacity, Image, Modal, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { formatCurrency } from '../../utils/formatCurrency';
import * as Colors from '../../constants/Colors';
import * as Fonts from '../../constants/Fonts';

export default function KeranjangScreen() {

  const navigation = useNavigation();
  const route = useRoute();
  const { selectedTable } = (route.params as { selectedTable?: string }) || {};
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [notes, setNotes] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    if (isModalVisible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isModalVisible]);

  const handleCheckout = () => {
    // Buat order baru dari data keranjang
    addOrder({
      items: cartItems,
      totalPrice: getTotalPrice(),
      totalItems: cartItems.reduce((total, item) => total + item.quantity, 0),
      tableNumber: selectedTable || 'Belum dipilih',
      notes: notes,
    });
    
    // Bersihkan keranjang
    clearCart();
    
    // Tampilkan modal
    setIsModalVisible(true);
  };

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

            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>PESAN SEKARANG</Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Animated.View style={[styles.modalOverlay, { opacity: opacityAnim }]}>
          <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleAnim }] }]}>
            <Ionicons name="checkmark-circle" size={100} color={Colors.PRIMARY} style={styles.modalLogo} />
            <Text style={styles.modalTitle}>PESANAN DI TERIMA</Text>
            <Text style={styles.modalDescription}>
              Pesanan mu sudah diterima dan akan segera dipersiapkan, silahkan membayar ke kasir agar pesanan di persiapkan.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => { setIsModalVisible(false); (navigation as any).navigate('StatusPesanan'); }}>
              <Text style={styles.modalButtonText}>LIHAT STATUS PESANAN</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalLogo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: Fonts.SIZE_HEADER,
    fontWeight: Fonts.WEIGHT_BOLD,
    color: Colors.TEXT_DARK,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: Fonts.SIZE_MENU_ITEM_NAME,
    color: Colors.TEXT_DARK,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: Colors.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  modalButtonText: {
    color: 'white',
    fontSize: Fonts.SIZE_BUTTON,
    fontWeight: Fonts.WEIGHT_BOLD,
    textAlign: 'center',
  },
});
