
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Header from '../../components/Header';
import { menuItems, MenuItem } from '../../constants/DummyData';
import * as Colors from '../../constants/Colors';
import * as Fonts from '../../constants/Fonts';

const categories = ["PAKET", "AYAM", "MINUMAN", "KENTANG"];


const TambahMenuScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [selectedCategory, setSelectedCategory] = useState('PAKET');
    const [menuList, setMenuList] = useState<MenuItem[]>(menuItems);


    const handleAddMenu = () => {
        navigation.navigate('EditMenu', { mode: 'add' });
    };

    const handleEditMenu = (menuId: string) => {
        navigation.navigate('EditMenu', { mode: 'edit', menuId });
    };

    const handleDeleteMenu = (item: MenuItem) => {
        Alert.alert(
            'Konfirmasi Hapus',
            `Apakah Anda yakin ingin menghapus menu "${item.name}"?`,
            [
                { text: 'Batal', style: 'cancel' },
                { 
                    text: 'Hapus', 
                    style: 'destructive',
                    onPress: () => {
                        setMenuList(prev => prev.filter(menuItem => menuItem.id !== item.id));
                        Alert.alert('Success', 'Menu berhasil dihapus');
                    }
                }
            ]
        );
    };

    const filteredMenu = menuList.filter(item => item.category === selectedCategory);

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

                <Header title="TAMBAH MENU" onBackPress={() => navigation.goBack()} />

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
                    {filteredMenu.map(item => (
                        <View key={item.id} style={styles.menuCard}>
                            <View style={styles.menuImageContainer}>
                                <Image 
                                    source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
                                    style={styles.menuImage}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.menuInfo}>
                                <Text style={styles.menuTitle}>{item.name}</Text>
                                <Text style={styles.menuDescription}>{item.description}</Text>
                                <Text style={styles.menuPrice}>Rp {item.price.toLocaleString()}</Text>
                            </View>

                            <View style={styles.actionButtons}>
                                <TouchableOpacity 
                                    style={styles.editButton}
                                    onPress={() => handleEditMenu(item.id)}
                                >
                                    <Ionicons name="create" size={20} color="#4CAF50" />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.deleteButton}
                                    onPress={() => handleDeleteMenu(item)}
                                >
                                    <Ionicons name="trash" size={20} color="#ff4444" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <TouchableOpacity style={styles.addButton} onPress={handleAddMenu}>
                    <Ionicons name="add" size={24} color="white" />
                    <Text style={styles.addButtonText}>Tambah Menu</Text>
                </TouchableOpacity>


            </ImageBackground>
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
        marginBottom: 100,
        paddingHorizontal: 20,
    },
    menuCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 15,
        marginBottom: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    menuImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        marginRight: 15,
    },
    menuImage: {
        width: '100%',
        height: '100%',
    },
    menuInfo: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_DARK,
        marginBottom: 4,
    },
    menuDescription: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    menuPrice: {
        fontSize: 14,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.PRIMARY,
    },

    actionButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    editButton: {
        backgroundColor: '#e6ffe6',
        padding: 8,
        borderRadius: 8,
    },
    deleteButton: {
        backgroundColor: '#ffe6e6',
        padding: 8,
        borderRadius: 8,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 15,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },

    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: Fonts.WEIGHT_BOLD,
        marginLeft: 8,
        textTransform: 'uppercase',
    },
});

export default TambahMenuScreen;

