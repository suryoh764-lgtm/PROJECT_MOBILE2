import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MenuItem } from '../constants/DummyData'; 
import * as Colors from '../constants/Colors';
import * as Fonts from '../constants/Fonts';

interface MenuCardProps {
    item: MenuItem;
    formatRupiah: (price: number) => string;
    initialQuantity: number; 
}

const MenuCard: React.FC<MenuCardProps> = ({ item, formatRupiah, initialQuantity }) => {
    
    const [quantity, setQuantity] = useState(initialQuantity); 

    return (
        <View style={styles.menuItemCard}>
            
            {/* Gambar & Deskripsi */}
            <View style={styles.itemDetailContainer}>
                <View style={styles.imageWrapper}>
                    <Image source={item.imageUri} style={styles.itemImage} resizeMode="cover" />
                </View>
                
                <View style={styles.textDetail}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <Text style={styles.itemPrice}>{formatRupiah(item.price)}</Text>
                </View>
            </View>

            {/* Kontrol Quantity */}
            <View style={styles.quantityControl}>
                <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => setQuantity(prev => Math.max(0, prev - 1))}
                >
                    <Text style={styles.quantityText}>−</Text>
                </TouchableOpacity>

                <Text style={styles.quantityText}>{quantity}</Text>
                
                <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => setQuantity(prev => prev + 1)}
                >
                    <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    menuItemCard: {
        width: '95%',
        backgroundColor: Colors.CARD_BACKGROUND, 
        borderRadius: 15,
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1, 
        borderColor: Colors.BORDER_LIGHT,
    },
    itemDetailContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    imageWrapper: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        marginRight: 10,
        overflow: 'hidden',
        borderWidth: 3, 
        borderColor: Colors.TEXT_LIGHT,
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    textDetail: {
        flex: 1,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: Fonts.SIZE_MENU_ITEM_NAME,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_DARK,
    },
    itemDescription: {
        fontSize: Fonts.SIZE_MENU_ITEM_DESC,
        color: Colors.TEXT_GRAY,
        marginTop: 2,
    },
    itemPrice: {
        fontSize: Fonts.SIZE_MENU_ITEM_PRICE,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_PRICE,
        marginTop: 5,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.QUANTITY_BACKGROUND,
        borderRadius: 15,
        padding: 3,
    },
    quantityButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.TEXT_LIGHT,
        borderRadius: 15,
    },
    quantityText: {
        fontSize: Fonts.SIZE_QUANTITY,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_DARK,
        paddingHorizontal: 10,
    },
});

export default MenuCard;