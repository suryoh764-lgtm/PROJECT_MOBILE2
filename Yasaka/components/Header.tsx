// components/Header.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import * as Colors from '../constants/Colors';
import * as Fonts from '../constants/Fonts';

interface HeaderProps {
    title: string;
    onMenuPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuPress }) => (
    <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={onMenuPress}>
            <Feather name="menu" size={28} color={Colors.TEXT_LIGHT} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        
        <View style={{ width: 40 }} /> 
    </View>
);

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.PRIMARY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50, 
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
    headerIcon: {
        padding: 5,
    },
    headerTitle: {
        fontSize: Fonts.SIZE_HEADER,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_LIGHT,
    },
});

export default Header;