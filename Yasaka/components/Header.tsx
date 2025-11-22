import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import * as Colors from '../constants/Colors';
import * as Fonts from '../constants/Fonts';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <View style={styles.header}>
            <View style={styles.iconButton}> 
                <Ionicons 
                    name={Platform.OS === 'ios' ? 'menu' : 'menu'} 
                    size={30} 
                    color={Colors.TEXT_DARK} 
                />
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.iconButtonPlaceholder} /> 
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
        color: Colors.TEXT_DARK,
    },
    iconButton: {
        width: 40, 
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    iconButtonPlaceholder: {
        width: 40,
    }
});

export default Header;