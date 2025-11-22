import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

import * as Colors from '../constants/Colors';
import * as Fonts from '../constants/Fonts';

interface HeaderProps {
    title: string;
    onMenuPress: () => void; 
}

const Header: React.FC<HeaderProps> = ({ title, onMenuPress }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
                <Ionicons 
                    name={Platform.OS === 'ios' ? 'menu' : 'menu'} 
                    size={30} 
                    color={Colors.TEXT_LIGHT} 
                />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.iconButton} /> 
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'ios' ? 50 : 30, 
        paddingHorizontal: 15,
        backgroundColor: Colors.PRIMARY,
        height: Platform.OS === 'ios' ? 90 : 70, 
    },
    title: {
        fontSize: Fonts.SIZE_HEADER,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_LIGHT,
    },
    iconButton: {
        width: 40, 
        alignItems: 'flex-start',
    },
});

export default Header;