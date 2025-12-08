import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Header from '../../components/Header';
import MenuCard from '../../components/MenuCard';
import { menuItems } from '../../constants/DummyData';
import * as Colors from '../../constants/Colors';
import * as Fonts from '../../constants/Fonts';
import { RootStackParamList } from '../../navigation/UserStack';

const categories = ["PAKET", "AYAM", "MINUMAN", "KENTANG"];

const tableNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

const MenuScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [selectedTableNumber, setSelectedTableNumber] = useState('1');
    const [selectedCategory, setSelectedCategory] = useState('PAKET');
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tempTableNumber, setTempTableNumber] = useState(1);

    useEffect(() => {
        const loadSelectedTable = async () => {
            try {
                const savedTable = await AsyncStorage.getItem('selectedTable');
                if (savedTable) {
                    setSelectedTableNumber(savedTable);
                }
            } catch (error) {
                console.error('Error loading selected table:', error);
            }
        };
        loadSelectedTable();
    }, []);

    const handleTableChange = async (value: string) => {
        setSelectedTableNumber(value);
        try {
            await AsyncStorage.setItem('selectedTable', value);
        } catch (error) {
            console.error('Error saving selected table:', error);
        }
    };

    const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

    const handleOrderNow = () => {
        navigation.navigate('Keranjang', { selectedTable: selectedTableNumber });
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

                <Header title="MENU" onMenuPress={() => (navigation as any).openDrawer()} />

                <View style={styles.tableSelectionContainer}>
                    <Text style={styles.tableLabel}>PILIH NO MEJA :</Text>
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity style={pickerSelectStyles.inputIOS} onPress={() => { setTempTableNumber(parseInt(selectedTableNumber)); setIsModalVisible(true); }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, color: '#000' }}>{selectedTableNumber}</Text>
                                <Ionicons name="chevron-down" size={14} color="#555" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.categoryContainer}>
                    {categories.map((cat, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.categoryButton,
                                selectedCategory === cat && styles.categoryButtonSelected
                            ]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text style={[
                                styles.categoryText,
                                selectedCategory === cat && styles.categoryTextSelected
                            ]}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
                    {menuItems
                        .filter(item => item.category === selectedCategory)
                        .map(item => (
                            <MenuCard
                                key={item.id}
                                item={item}
                                quantity={quantities[item.id] || 0}
                                onAdd={() => {
                                    setQuantities(prev => ({
                                        ...prev,
                                        [item.id]: (prev[item.id] || 0) + 1
                                    }));
                                }}
                                onSubtract={() => {
                                    setQuantities(prev => ({
                                        ...prev,
                                        [item.id]: Math.max(0, (prev[item.id] || 0) - 1)
                                    }));
                                }}
                            />
                        ))
                    }
                </ScrollView>

                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.orderButton} onPress={handleOrderNow}>
                        <View style={styles.cartIconContainer}>
                            <Ionicons name="cart" size={24} color="black" />
                            {totalItems > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{totalItems}</Text>
                                </View>
                            )}
                        </View>
                        <Text style={styles.orderButtonText}>PESAN SEKARANG</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Pilih No Meja</Text>
                        <View style={styles.tableSelector}>
                            <TouchableOpacity onPress={() => setTempTableNumber(Math.max(1, tempTableNumber - 1))}>
                                <Ionicons name="chevron-up" size={24} color="black" />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.tableNumberInput}
                                value={tempTableNumber.toString()}
                                onChangeText={(text) => {
                                    const num = parseInt(text);
                                    if (!isNaN(num) && num >= 1 && num <= 10) {
                                        setTempTableNumber(num);
                                    } else if (text === '') {
                                        setTempTableNumber(1);
                                    }
                                }}
                                keyboardType="numeric"
                                maxLength={2}
                                selectTextOnFocus
                            />
                            <TouchableOpacity onPress={() => setTempTableNumber(Math.min(10, tempTableNumber + 1))}>
                                <Ionicons name="chevron-down" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.confirmButton} onPress={() => { setSelectedTableNumber(tempTableNumber.toString()); handleTableChange(tempTableNumber.toString()); setIsModalVisible(false); }}>
                            <Text style={styles.confirmButtonText}>Konfirmasi</Text>
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

    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        gap: 10
    },

    categoryButton: {
        backgroundColor: Colors.PRIMARY,
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
    },

    categoryText: {
        color: Colors.TEXT_DARK,
        fontSize: Fonts.SIZE_CATEGORY,
        fontWeight: Fonts.WEIGHT_BOLD,
    },

    categoryButtonSelected: {
        backgroundColor: Colors.BUTTON_HOMESCREEN,
    },

    categoryTextSelected: {
        color: Colors.TEXT_DARK,
    },

    menuContainer: {
        flex: 1,
        marginTop: 20,
        marginBottom: 80,
    },

    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    orderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    cartIconContainer: {
        position: 'relative',
        marginRight: 15,
    },
    badge: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: Colors.TEXT_LIGHT,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: Colors.TEXT_DARK,
        fontSize: 12,
        fontWeight: Fonts.WEIGHT_BOLD,
    },
    orderButtonText: {
        color: Colors.TEXT_DARK,
        fontSize: Fonts.SIZE_BUTTON,
        fontWeight: Fonts.WEIGHT_BOLD,
        textTransform: 'uppercase',
    },

    tableSelectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        paddingHorizontal: 20,
    },
    tableLabel: {
        fontSize: 16,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: 'white',
        textTransform: 'uppercase',
        marginRight: 10,
    },
    dropdownContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    arrowIcon: {
        fontSize: 14,
        color: '#555',
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
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    tableSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    tableNumberText: {
        fontSize: 24,
        marginHorizontal: 20,
    },
    tableNumberInput: {
        fontSize: 24,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        width: 60,
    },
    confirmButton: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
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
    inputAndroid: {
        fontSize: 16,
        fontWeight: Fonts.WEIGHT_MEDIUM,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#D8D8D8',
        borderRadius: 25,
        color: '#000',
        backgroundColor: '#F2F2F5',
        paddingRight: 30,
        height: 40,
    },
    iconContainer: {
        top: 12,
        right: 12,
    },
});

export default MenuScreen;
