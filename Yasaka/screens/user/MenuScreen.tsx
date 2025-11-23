import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur'; 
import Header from '../../components/Header';
import * as Colors from '../../constants/Colors';
import * as Fonts from '../../constants/Fonts';

const categories = ["PAKET", "AYAM", "MINUMAN", "KENTANG"];

const MenuScreen = () => {
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
});

export default MenuScreen;
