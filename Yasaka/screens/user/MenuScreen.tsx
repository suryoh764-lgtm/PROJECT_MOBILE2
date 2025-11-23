import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import * as Colors from '../../constants/Colors';
import * as Fonts from '../../constants/Fonts';

const categories = ["PAKET", "AYAM", "MINUMAN", "KENTANG"];

const MenuScreen = () => {
    const [selectedTable, setSelectedTable] = useState<number>(1);
    const [cartCount] = useState<number>(3); 

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

                {/* CATEGORY BUTTONS */}
                <View style={styles.categoryContainer}>
                    {categories.map((cat, index) => (
                        <TouchableOpacity key={index} style={styles.categoryButton}>
                            <Text style={styles.categoryText}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* TABLE SELECT & CART */}
                <View style={styles.tableCartRow}>

                    {/* PILIH NO MEJA */}
                    <View style={styles.tableBox}>
                        <Text style={styles.tableLabel}>PILIH NO MEJA :</Text>

                        <TouchableOpacity style={styles.dropdownButton}>
                            <Text style={styles.dropdownText}>{selectedTable}</Text>
                            <Ionicons name="caret-down" size={16} color={Colors.TEXT_DARK} />
                        </TouchableOpacity>
                    </View>

                    {/* KERANJANG */}
                    <TouchableOpacity style={styles.cartButton}>
                        <Ionicons name="cart-outline" size={26} color={Colors.TEXT_DARK} />
                        <Text style={styles.cartBadge}>{cartCount}</Text>
                    </TouchableOpacity>

                </View>

            </ImageBackground>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_OVERLAY,
    },
    background: {
        flex: 1,
    },

    /* CATEGORY SECTION */
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        gap: 10,
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

    /* TABLE PICKER + CART */
    tableCartRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 15,
    },

    tableBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 25,
    },

    tableLabel: {
        fontSize: 14,
        fontWeight: Fonts.WEIGHT_SEMIBOLD,
        color: Colors.TEXT_DARK,
    },

    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 15,
    },

    dropdownText: {
        fontSize: 14,
        fontWeight: Fonts.WEIGHT_BOLD,
        marginRight: 5,
        color: Colors.TEXT_DARK,
    },

    /* CART */
    cartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 25,
    },

    cartBadge: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_DARK,
    },
});

export default MenuScreen;
