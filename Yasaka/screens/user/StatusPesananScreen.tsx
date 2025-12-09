import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../components/Header';
import MenuCard from '../../components/MenuCard';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import * as Colors from '../../constants/Colors';
import * as Fonts from '../../constants/Fonts';

export default function StatusPesananScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedTable } = (route.params as { selectedTable?: string }) || {};
  const { cartItems, getTotalPrice, getTotalItems } = useCart();

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

        <View style={styles.infoContainer}>
          <View style={styles.tableInfo}>
            <Text style={styles.label}>NO MEJA:</Text>
            <Text style={styles.value}>{selectedTable || '1'}</Text>
          </View>
          <View style={styles.statusInfo}>
            <Text style={styles.label}>STATUS:</Text>
            <Text style={styles.value}>SEDANG DIPROSES</Text>
          </View>
          <View style={styles.timeInfo}>
            <Text style={styles.label}>WAKTU:</Text>
            <Text style={styles.value}>{new Date().toLocaleString('id-ID')}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>PESANAN ANDA</Text>
          <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {cartItems.length > 0 ? (
              <View style={styles.orderItemsContainer}>
                {cartItems.map((item) => (
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
              <Text style={styles.emptyText}>Tidak ada pesanan</Text>
            )}
          </ScrollView>
          {cartItems.length > 0 && (
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total Item:</Text>
                <Text style={styles.summaryValue}>{getTotalItems()}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total Harga:</Text>
                <Text style={styles.summaryValue}>{formatCurrency(getTotalPrice())}</Text>
              </View>
            </View>
          )}
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
  timeInfo: {
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
  emptyText: {
    fontSize: Fonts.SIZE_MENU_ITEM_NAME,
    color: Colors.TEXT_LIGHT,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
