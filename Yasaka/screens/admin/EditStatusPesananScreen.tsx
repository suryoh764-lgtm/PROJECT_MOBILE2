import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import AdminHeader from '../../components/AdminHeader';
import { useOrders, Order } from '../../context/OrderContext';
import { formatCurrency } from '../../utils/formatCurrency';
import * as Colors from '../../constants/Colors';
import * as Fonts from '../../constants/Fonts';

const EditStatusPesananScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { orders, updateOrderStatus } = useOrders();
    const [activeTab, setActiveTab] = useState('all');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [localOrders, setLocalOrders] = useState<Order[]>([]);

    useFocusEffect(
        useCallback(() => {
            setLocalOrders(orders);
        }, [orders])
    );

    const getStatusDisplay = (status: string) => {
        switch (status) {
            case 'belum_diproses': return 'BELUM DIPROSES';
            case 'sedang_diproses': return 'SEDANG DIPROSES';
            case 'siap_diambil': return 'SIAP DIAMBIL';
            case 'selesai': return 'SELESAI';
            default: return 'TIDAK DIKETAHUI';
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

    const getContextStatusKey = (tabKey: string) => {
        switch (tabKey) {
            case 'belum_diproses': return 'belum_diproses';
            case 'sedang_diproses': return 'sedang_diproses';
            case 'siap_diambil': return 'siap_diambil';
            case 'selesai': return 'selesai';
            default: return null;
        }
    };

    const filteredOrders = activeTab === 'all' 
        ? localOrders 
        : getContextStatusKey(activeTab) 
            ? localOrders.filter(order => order.status === getContextStatusKey(activeTab))
            : [];

    const categories = [
        { key: 'all', label: 'SEMUA', color: '#666' },
        { key: 'belum_diproses', label: 'BELUM DIPROSES', color: '#9E9E9E' },
        { key: 'sedang_diproses', label: 'SEDANG DIPROSES', color: '#FFA500' },
        { key: 'siap_diambil', label: 'SIAP DIAMBIL', color: '#2196F3' },
        { key: 'selesai', label: 'SELESAI', color: '#4CAF50' },
    ];

    const handleStatusSelect = (newStatusKey: string) => {
        if (selectedOrderId) {
            const contextStatus = getContextStatusKey(newStatusKey);
            if (contextStatus) {
                updateOrderStatus(selectedOrderId, contextStatus as Order['status']);
                setIsStatusModalVisible(false);
                setSelectedOrderId(null);
                Alert.alert('Sukses', 'Status pesanan berhasil diperbarui!');
            }
        }
    };

    const handleQuickAction = (order: Order, action: 'mulai' | 'siap' | 'selesai') => {
        const statusMap = {
            'mulai': 'sedang_diproses' as const,
            'siap': 'siap_diambil' as const,
            'selesai': 'selesai' as const
        };
        updateOrderStatus(order.id, statusMap[action]);
    };

    const handleViewDetails = (order: Order) => {
        const itemsList = order.items.map(item => `• ${item.name} x${item.quantity}`).join('\n');
        Alert.alert(
            `Pesanan #${order.id}`,
            `Meja: ${order.tableNumber}\n\nItem:\n${itemsList}\n\nTotal: ${formatCurrency(order.totalPrice)}\nCatatan: ${order.notes || '-'}\nWaktu: ${order.orderTime}\nStatus: ${getStatusDisplay(order.status)}`,
            [{ text: 'Tutup' }]
        );
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
                    title="PESANAN MASUK" 
                    navigation={navigation}
                    onBackPress={() => navigation.goBack()} 
                />

                <View style={styles.orderCountContainer}>
                    <Text style={styles.orderCountText}>
                        Total Pesanan: {localOrders.length}
                    </Text>
                </View>

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
                    {filteredOrders.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="receipt-outline" size={60} color="rgba(255,255,255,0.5)" />
                            <Text style={styles.emptyText}>Tidak ada pesanan</Text>
                            <Text style={styles.emptySubtext}>Pesanan akan muncul di sini</Text>
                        </View>
                    ) : (
                        filteredOrders.map(order => (
                            <View key={order.id} style={styles.orderCard}>
                                <View style={styles.orderHeader}>
                                    <View style={styles.orderInfo}>
                                        <Text style={styles.orderId}>Pesanan #{order.id}</Text>
                                        <Text style={styles.customerName}>Meja {order.tableNumber}</Text>
                                    </View>
                                    <View style={styles.timeContainer}>
                                        <Ionicons name="time-outline" size={14} color="#666" />
                                        <Text style={styles.orderTime}>{order.orderTime}</Text>
                                    </View>
                                </View>
                                
                                <View style={styles.orderItems}>
                                    <Text style={styles.itemsTitle}>Item Pesanan:</Text>
                                    {order.items.slice(0, 3).map((item, index) => (
                                        <Text key={index} style={styles.itemText}>
                                            • {item.name} x{item.quantity}
                                        </Text>
                                    ))}
                                    {order.items.length > 3 && (
                                        <Text style={styles.moreItems}>
                                            +{order.items.length - 3} item lainnya
                                        </Text>
                                    )}
                                </View>

                                <View style={styles.orderFooter}>
                                    <Text style={styles.orderTotal}>
                                        Total: {formatCurrency(order.totalPrice)}
                                    </Text>
                                </View>

                                {order.notes && (
                                    <View style={styles.notesContainer}>
                                        <Ionicons name="create-outline" size={14} color="#FFA500" />
                                        <Text style={styles.notesText}>{order.notes}</Text>
                                    </View>
                                )}
                                
                                <View style={styles.statusContainer}>
                                    <TouchableOpacity 
                                        style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}
                                        onPress={() => {
                                            setSelectedOrderId(order.id);
                                            setIsStatusModalVisible(true);
                                        }}
                                    >
                                        <Text style={styles.statusText}>{getStatusDisplay(order.status)}</Text>
                                        <Ionicons name="chevron-down" size={12} color="white" style={styles.statusDropdownIcon} />
                                    </TouchableOpacity>

                                    <View style={styles.actionButtons}>
                                        {order.status === 'belum_diproses' && (
                                            <TouchableOpacity 
                                                style={[styles.actionButton, styles.preparingButton]}
                                                onPress={() => handleQuickAction(order, 'mulai')}
                                            >
                                                <Ionicons name="play-outline" size={16} color="white" />
                                                <Text style={styles.actionButtonText}>Mulai</Text>
                                            </TouchableOpacity>
                                        )}
                                        
                                        {order.status === 'sedang_diproses' && (
                                            <TouchableOpacity 
                                                style={[styles.actionButton, styles.readyButton]}
                                                onPress={() => handleQuickAction(order, 'siap')}
                                            >
                                                <Ionicons name="time-outline" size={16} color="white" />
                                                <Text style={styles.actionButtonText}>Siap</Text>
                                            </TouchableOpacity>
                                        )}

                                        {order.status === 'siap_diambil' && (
                                            <TouchableOpacity 
                                                style={[styles.actionButton, styles.completeButton]}
                                                onPress={() => handleQuickAction(order, 'selesai')}
                                            >
                                                <Ionicons name="checkmark-circle-outline" size={16} color="white" />
                                                <Text style={styles.actionButtonText}>Selesai</Text>
                                            </TouchableOpacity>
                                        )}

                                        <TouchableOpacity 
                                            style={[styles.actionButton, styles.detailButton]}
                                            onPress={() => handleViewDetails(order)}
                                        >
                                            <Ionicons name="eye-outline" size={16} color="white" />
                                            <Text style={styles.actionButtonText}>Detail</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))
                    )}
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
                                    <View style={styles.categoryItemContent}>
                                        <View style={[styles.categoryColorDot, { backgroundColor: category.color }]} />
                                        <Text style={[
                                            styles.categoryItemText,
                                            activeTab === category.key && styles.categoryItemTextSelected
                                        ]}>
                                            {category.label}
                                        </Text>
                                    </View>
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
                        <Text style={styles.modalTitle}>Ubah Status Pesanan</Text>
                        <View style={styles.statusList}>
                            {categories.slice(1).map(category => (
                                <TouchableOpacity
                                    key={category.key}
                                    style={[
                                        styles.statusItem,
                                        { backgroundColor: category.color || '#9E9E9E' }
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
    orderCountContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    orderCountText: {
        fontSize: 14,
        color: Colors.TEXT_LIGHT,
        fontWeight: Fonts.WEIGHT_MEDIUM,
    },
    orderContainer: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 20,
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
        marginTop: 15,
    },
    emptySubtext: {
        fontSize: 14,
        color: Colors.TEXT_LIGHT,
        opacity: 0.7,
        marginTop: 5,
    },
    dropdownContainer: {
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
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
        maxHeight: '70%',
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
    },
    categoryItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryColorDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 10,
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
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    orderInfo: {
        flex: 1,
    },
    orderId: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    customerName: {
        fontSize: 16,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_DARK,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderTime: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
    orderItems: {
        marginBottom: 10,
    },
    itemsTitle: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
        fontWeight: Fonts.WEIGHT_MEDIUM,
    },
    itemText: {
        fontSize: 14,
        color: Colors.TEXT_DARK,
        marginLeft: 8,
    },
    moreItems: {
        fontSize: 12,
        color: Colors.PRIMARY,
        marginLeft: 8,
        marginTop: 4,
        fontStyle: 'italic',
    },
    orderFooter: {
        marginBottom: 10,
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.PRIMARY,
    },
    notesContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255, 165, 0, 0.1)',
        padding: 8,
        borderRadius: 8,
        marginBottom: 10,
    },
    notesText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 6,
        flex: 1,
        fontStyle: 'italic',
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
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
        backgroundColor: '#FFA500',
    },
    readyButton: {
        backgroundColor: '#2196F3',
    },
    completeButton: {
        backgroundColor: '#4CAF50',
    },
    detailButton: {
        backgroundColor: '#666',
    },
    actionButtonText: {
        color: 'white',
        fontSize: 10,
        fontWeight: Fonts.WEIGHT_MEDIUM,
    },
});

export default EditStatusPesananScreen;

