import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import Header from '../../components/Header';
import MenuCard from '../../components/MenuCard';
import { menuItems } from '../../constants/DummyData';
import * as Colors from '../../constants/Colors';
import * as Fonts from '../../constants/Fonts';

const categories = ["PAKET", "AYAM", "MINUMAN", "KENTANG"];

const tableNumbers = Array.from({ length: 20 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
}));

const MenuScreen = () => {
    const [selectedTableNumber, setSelectedTableNumber] = useState('1');
    const [selectedCategory, setSelectedCategory] = useState('PAKET');
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    return (
        <View style={styles.container}>

            {/* Background + Blur */}
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

                {/* HEADER */}
                <Header title="MENU" />

                {/* TABLE NUMBER SELECTION */}
                <View style={styles.tableSelectionContainer}>
                    <Text style={styles.tableLabel}>PILIH NO MEJA :</Text>
                    <View style={styles.dropdownContainer}>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedTableNumber(value)}
                            items={tableNumbers}
                            value={selectedTableNumber}
                            style={pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => <Ionicons name="chevron-down" size={14} color="#555" />}
                        />
                    </View>
                </View>

                {/* CATEGORY BUTTONS */}
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

                {/* MENU ITEMS */}
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

    /* CATEGORY SECTION */
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

    /* MENU ITEMS */
    menuContainer: {
        flex: 1,
        marginTop: 20,
    },

    /* TABLE SELECTION */
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
