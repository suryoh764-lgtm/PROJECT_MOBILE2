import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur'; 
import Header from '../../components/Header';
import * as Colors from '../../constants/Colors';
import * as Fonts from '../../constants/Fonts';

const MenuScreen = () => {
    return (
        <View style={styles.container}>
            
            <ImageBackground 
                source={require('../../assets/images/cover.jpg')} 
                style={styles.background}
                resizeMode="cover"
            >
                <BlurView 
                    intensity={10} 
                    tint="dark" 
                    style={StyleSheet.absoluteFill} 
                />

                <Header title="MENU" /> 

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
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
    },
    placeholderText: {
        color: Colors.TEXT_DARK,
        fontSize: Fonts.SIZE_MENU_ITEM_NAME,
        marginTop: 50,
    }
});

export default MenuScreen;