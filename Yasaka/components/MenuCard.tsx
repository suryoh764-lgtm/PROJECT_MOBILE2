import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Colors from '../constants/Colors';
import * as Fonts from '../constants/Fonts';
import { MenuItem } from '../constants/DummyData';
import { formatCurrency } from '../utils/formatCurrency';

interface MenuCardProps {
    item: MenuItem;
    quantity: number;
    onAdd: () => void;
    onSubtract: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, quantity, onAdd, onSubtract }) => {
    return (
        <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.bottomSection}>
                    <Text style={styles.price}>{formatCurrency(item.price)}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={onSubtract}>
                            <Ionicons name="remove-circle" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <TouchableOpacity onPress={onAdd}>
                            <Ionicons name="add-circle" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
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
    rightSection: {
        alignItems: 'center',
    },
    price: {
        fontSize: Fonts.SIZE_MENU_ITEM_PRICE,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: 'black',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    quantity: {
        fontSize: Fonts.SIZE_QUANTITY,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: 'black',
        marginHorizontal: 10,
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
});

export default MenuCard;
