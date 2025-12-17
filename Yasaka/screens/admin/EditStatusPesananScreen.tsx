import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AdminHeader from '../../components/AdminHeader';
import * as Colors from '../../constants/Colors';
import * as Fonts from '../../constants/Fonts';

const EditStatusPesananScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [activeTab, setActiveTab] = useState('all');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    const [orders, setOrders] = useState([
        { id: '1', noMeja: '01', status: 'belum_diproses', total: 50000 },
        { id: '2', noMeja: '05', status: 'di_proses', total: 75000 },
        { id: '3', noMeja: '03', status: 'selesai', total: 60000 },
        { id: '4', noMeja: '02', status: 'belum_diproses', total: 45000 },
        { id: '5', noMeja: '07', status: 'di_proses', total: 85000 },
    ]);

    const categories = [
        { key: 'all', label: 'SEMUA', color: '#666' },
        { key: 'belum_diproses', label: 'BELUM DI PROSES', color: '#FFA500' },
        { key: 'di_proses', label: 'DI PROSES', color: '#2196F3' },
        { key: 'selesai', label: 'SELESAI', color: '#4CAF50' },
    ];

    const filteredOrders = activeTab === 'all' 
        ? orders 
        : orders.filter(order => order.status === activeTab);

    const handleStatusSelect = (newStatus: string) => {
        if (selectedOrderId) {
            const updatedOrders = orders.map(order => 
                order.id === selectedOrderId 
                    ? { ...order, status: newStatus }
                    : order
            );
            setOrders(updatedOrders);
            setActiveTab(newStatus);
            setIsStatusModalVisible(false);
            setSelectedOrderId(null);
            Alert.alert('Success', `Status pesanan berhasil diperbarui menjadi ${newStatus}`);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'belum_diproses': return '#FFA500';
            case 'di_proses': return '#2196F3';
            case 'selesai': return '#4CAF50';
            default: return '#FFA500';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'belum_diproses': return 'BELUM DI PROSES';
            case 'di_proses': return 'DI PROSES';
            case 'selesai': return 'SELESAI';
            default: return 'BELUM DI PROSES';
        }
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

                <AdminHeader 
                    title="EDIT STATUS PESANAN" 
                    navigation={navigation}
                    onBackPress={() => navigation.goBack()} 
                />

                <View style={styles.dropdownContainer}>
                    <TouchableOpacity 
                        style={styles.dropdownButton}
                        onPress={() => setIsModalVisible(true)}
                    >
                        <View style={styles.dropdownContent}>
                            <Text style={styles.dropdownText}>
                                {categories.find(cat => cat.key === activeTab)?.label || 'Pilih Kategori'}
                            </Text>
                            <Ionicons name="chevron-down" size={14} color="#555" />
                        </View>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.orderContainer} showsVerticalScrollIndicator={false}>
                    {filteredOrders.map(order => (
                        <View key={order.id} style={styles.orderCard}>

                            <View style={styles.orderInfo}>
                                <Text style={styles.customerName}>Meja {order.noMeja}</Text>
                                <Text style={styles.orderId}>Pesanan #{order.id}</Text>
                                <Text style={styles.orderTotal}>Rp {order.total.toLocaleString()}</Text>
                            </View>
                            

                            <View style={styles.statusContainer}>
                                <TouchableOpacity 
                                    style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}
                                    onPress={() => {
                                        setSelectedOrderId(order.id);
                                        setIsStatusModalVisible(true);
                                    }}
                                >
                                    <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
                                    <Ionicons name="chevron-down" size={12} color="white" style={styles.statusDropdownIcon} />
                                </TouchableOpacity>
                                

                                <View style={styles.actionButtons}>
                                    {order.status === 'belum_diproses' && (
                                        <TouchableOpacity 
                                            style={[styles.actionButton, styles.preparingButton]}
                                            onPress={() => {
                                                const updatedOrders = orders.map(o => 
                                                    o.id === order.id 
                                                        ? { ...o, status: 'di_proses' }
                                                        : o
                                                );
                                                setOrders(updatedOrders);
                                                setActiveTab('di_proses');
                                            }}
                                        >
                                            <Ionicons name="time-outline" size={16} color="white" />
                                            <Text style={styles.actionButtonText}>Mulai Proses</Text>
                                        </TouchableOpacity>
                                    )}
                                    
                                    {order.status === 'di_proses' && (
                                        <TouchableOpacity 
                                            style={[styles.actionButton, styles.readyButton]}
                                            onPress={() => {
                                                const updatedOrders = orders.map(o => 
                                                    o.id === order.id 
                                                        ? { ...o, status: 'selesai' }
                                                        : o
                                                );
                                                setOrders(updatedOrders);
                                                setActiveTab('selesai');
                                            }}
                                        >
                                            <Ionicons name="checkmark-circle-outline" size={16} color="white" />
                                            <Text style={styles.actionButtonText}>Selesai</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    ))}

                </ScrollView>

            </ImageBackground>

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Pilih Kategori Status</Text>
                        <View style={styles.categoryList}>
                            {categories.map(category => (
                                <TouchableOpacity
                                    key={category.key}
                                    style={[
                                        styles.categoryItem,
                                        activeTab === category.key && styles.categoryItemSelected
                                    ]}
                                    onPress={() => {
                                        setActiveTab(category.key);
                                        setIsModalVisible(false);
                                    }}
                                >
                                    <Text style={[
                                        styles.categoryItemText,
                                        activeTab === category.key && styles.categoryItemTextSelected
                                    ]}>
                                        {category.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity 
                            style={styles.closeButton} 
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Tutup</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>

            <Modal
                visible={isStatusModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsStatusModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Pilih Status Pesanan</Text>
                        <View style={styles.statusList}>
                            {categories.slice(1).map(category => (
                                <TouchableOpacity
                                    key={category.key}
                                    style={[
                                        styles.statusItem,
                                        { backgroundColor: category.color || '#FFA500' }
                                    ]}
                                    onPress={() => handleStatusSelect(category.key)}
                                >
                                    <Text style={styles.statusItemText}>{category.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity 
                            style={styles.closeButton} 
                            onPress={() => setIsStatusModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Batal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_OVERLAY
    },
    background: {
        flex: 1
    },

    orderContainer: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
    },
    dropdownContainer: {
        marginHorizontal: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dropdownButton: {
        fontSize: 16,
        fontWeight: Fonts.WEIGHT_MEDIUM,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#D8D8D8',
        borderRadius: 25,
        color: '#000',
        backgroundColor: '#F2F2F5',
        paddingRight: 30,
        height: 40,
    },
    dropdownContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dropdownText: {
        fontSize: 16,
        color: '#000',
        fontWeight: Fonts.WEIGHT_MEDIUM,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        maxHeight: '60%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: Fonts.WEIGHT_BOLD,
        marginBottom: 20,
        color: Colors.TEXT_DARK,
    },
    categoryList: {
        width: '100%',
        marginBottom: 20,
    },
    categoryItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        alignItems: 'center',
    },
    categoryItemSelected: {
        backgroundColor: 'rgba(245, 111, 21, 0.1)',
    },
    categoryItemText: {
        fontSize: 16,
        color: Colors.TEXT_DARK,
        fontWeight: Fonts.WEIGHT_MEDIUM,
    },
    categoryItemTextSelected: {
        color: Colors.PRIMARY,
        fontWeight: Fonts.WEIGHT_BOLD,
    },
    closeButton: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: Fonts.WEIGHT_BOLD,
    },
    statusList: {
        width: '100%',
        marginBottom: 20,
        gap: 10,
    },
    statusItem: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statusItemText: {
        color: 'white',
        fontSize: 16,
        fontWeight: Fonts.WEIGHT_BOLD,
    },
    orderCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 15,
        marginBottom: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    orderInfo: {
        marginBottom: 12,
    },
    customerName: {
        fontSize: 16,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_DARK,
        marginBottom: 4,
    },
    orderId: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    orderTotal: {
        fontSize: 14,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.PRIMARY,
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        gap: 4,
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: Fonts.WEIGHT_MEDIUM,
    },
    statusDropdownIcon: {
        marginLeft: 4,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    preparingButton: {
        backgroundColor: '#2196F3',
    },
    readyButton: {
        backgroundColor: '#4CAF50',
    },
    actionButtonText: {
        color: 'white',
        fontSize: 10,
        fontWeight: Fonts.WEIGHT_MEDIUM,
    },
});

export default EditStatusPesananScreen;

