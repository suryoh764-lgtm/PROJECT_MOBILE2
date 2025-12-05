import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Colors from '../constants/Colors';
import * as Fonts from '../constants/Fonts';
import { MenuItem } from '../constants/DummyData';
import { formatCurrency } from '../utils/formatCurrency';

interface MenuCardProps {
    item: MenuItem;
    onPress: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>{formatCurrency(item.price)}</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={onPress}>
                <Ionicons name="add-circle" size={24} color="black" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: Fonts.SIZE_MENU_ITEM_NAME,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_DARK,
    },
    description: {
        fontSize: Fonts.SIZE_MENU_ITEM_DESC,
        color: 'black',
        marginVertical: 5,
        textAlign: 'justify',
    },
    price: {
        fontSize: Fonts.SIZE_MENU_ITEM_PRICE,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: 'black',
    },
    addButton: {
        padding: 5,
    },
});

export default MenuCard;
