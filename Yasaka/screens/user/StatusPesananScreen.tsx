import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import MenuCard from '../../components/MenuCard';
import { useOrders, Order } from '../../context/OrderContext';
import { formatCurrency } from '../../utils/formatCurrency';
import * as Colors from '../../constants/Colors';
import * as Fonts from '../../constants/Fonts';

export default function StatusPesananScreen() {
  const navigation = useNavigation();
  const { getOrdersByStatus } = useOrders();
  const [currentOrder, setCurrentOrder] = useState<Order | undefined>();

  useFocusEffect(
    useCallback(() => {
      const belumDiprosesOrders = getOrdersByStatus('belum_diproses');
      const sedangDiprosesOrders = getOrdersByStatus('sedang_diproses');
      const siapDiambilOrders = getOrdersByStatus('siap_diambil');
      const allActiveOrders = [...belumDiprosesOrders, ...sedangDiprosesOrders, ...siapDiambilOrders];
      
      if (allActiveOrders.length > 0) {
        setCurrentOrder(allActiveOrders[0]);
      } else {
        setCurrentOrder(undefined);
      }
    }, [getOrdersByStatus])
  );

  const getStatusText = (status: string) => {
    switch (status) {
      case 'belum_diproses': return 'BELUM DIPROSES';
      case 'sedang_diproses': return 'SEDANG DIPROSES';
      case 'siap_diambil': return 'SIAP DIAMBIL';
      case 'selesai': return 'SELESAI';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'belum_diproses': return '#9E9E9E';
      case 'sedang_diproses': return '#FFA500';
      case 'siap_diambil': return '#2196F3';
      case 'selesai': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  const handleSelesai = () => {
    navigation.goBack();
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

        <Header title="STATUS PESANAN" onMenuPress={() => (navigation as any).openDrawer()} onBackPress={() => navigation.goBack()} />

        {currentOrder ? (
          <>
            <View style={styles.infoContainer}>
              <View style={styles.tableInfo}>
                <Text style={styles.label}>NO MEJA:</Text>
                <Text style={styles.value}>{currentOrder.tableNumber || 'Belum dipilih'}</Text>
              </View>
              <View style={styles.statusInfo}>
                <Text style={styles.label}>STATUS:</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(currentOrder.status) }]}>
                  <Text style={styles.statusBadgeText}>{getStatusText(currentOrder.status)}</Text>
                </View>
              </View>
              <View style={styles.timeInfo}>
                <Text style={styles.label}>WAKTU:</Text>
                <Text style={styles.value}>{currentOrder.orderTime || new Date().toLocaleString('id-ID')}</Text>
              </View>
              {currentOrder.notes && (
                <View style={styles.notesInfo}>
                  <Text style={styles.label}>CATATAN:</Text>
                  <Text style={styles.value}>{currentOrder.notes}</Text>
                </View>
              )}
            </View>

            <View style={styles.contentContainer}>
              <Text style={styles.sectionTitle}>PESANAN ANDA</Text>
              <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {currentOrder && currentOrder.items.length > 0 ? (
                  <View style={styles.orderItemsContainer}>
                    {currentOrder.items.map((item) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        quantity={item.quantity}
                        onAdd={() => {}}
                        onSubtract={() => {}}
                        showControls={false}
                        showDescription={true}
                        isLarge={true}
                      />
                    ))}
                  </View>
                ) : (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Tidak ada pesanan aktif</Text>
                  </View>
                )}
              </ScrollView>
              {currentOrder && currentOrder.items.length > 0 && (
                <View style={styles.summaryContainer}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total Item:</Text>
                    <Text style={styles.summaryValue}>{currentOrder.totalItems}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total Harga:</Text>
                    <Text style={styles.summaryValue}>{formatCurrency(currentOrder.totalPrice)}</Text>
                  </View>
                </View>
              )}
            </View>
          </>
        ) : (
          <View style={styles.emptyMainContainer}>
            <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
            <Text style={styles.emptyMainTitle}>PESANAN SELESAI!</Text>
            <Text style={styles.emptyMainText}>Terima kasih telah memesan di Yasaka</Text>
            <Text style={styles.emptyMainSubtext}>Silakan pesan lagi kapan saja</Text>
            <TouchableOpacity style={styles.homeButton} onPress={handleSelesai}>
              <Text style={styles.homeButtonText}>KEMBALI</Text>
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
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: Colors.CARD_BACKGROUND || '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  statusInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
  },
  statusBadgeText: {
    color: 'white',
    fontSize: Fonts.SIZE_MENU_ITEM_NAME,
    fontWeight: Fonts.WEIGHT_BOLD,
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  notesInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: Fonts.SIZE_MENU_ITEM_NAME,
    fontWeight: Fonts.WEIGHT_MEDIUM,
    color: '#000000',
    opacity: 0.8,
    textAlignVertical: 'top',
  },
  value: {
    fontSize: Fonts.SIZE_MENU_ITEM_NAME,
    color: '#000000',
    fontWeight: Fonts.WEIGHT_BOLD,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
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
  sectionTitle: {
    fontSize: Fonts.SIZE_HEADER,
    fontWeight: Fonts.WEIGHT_BOLD,
    color: Colors.TEXT_LIGHT,
    textAlign: 'center',
    marginBottom: 20,
  },
  orderItemsContainer: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.TEXT_LIGHT,
    fontWeight: Fonts.WEIGHT_BOLD,
  },
  summaryContainer: {
    backgroundColor: Colors.CARD_BACKGROUND || '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: Fonts.SIZE_MENU_ITEM_NAME,
    fontWeight: Fonts.WEIGHT_MEDIUM,
    color: '#000000',
  },
  summaryValue: {
    fontSize: Fonts.SIZE_MENU_ITEM_NAME,
    fontWeight: Fonts.WEIGHT_BOLD,
    color: '#000000',
  },
  emptyMainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyMainTitle: {
    fontSize: 28,
    fontWeight: Fonts.WEIGHT_BOLD,
    color: '#4CAF50',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyMainText: {
    fontSize: 18,
    color: Colors.TEXT_LIGHT,
    textAlign: 'center',
    marginBottom: 5,
  },
  emptyMainSubtext: {
    fontSize: 14,
    color: Colors.TEXT_LIGHT,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 30,
  },
  homeButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: Fonts.WEIGHT_BOLD,
  },
});

