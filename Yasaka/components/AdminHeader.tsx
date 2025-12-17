import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Colors from '../constants/Colors';
import * as Fonts from '../constants/Fonts';


interface AdminHeaderProps {
    title: string;
    isTransparent?: boolean;
    navigation?: any;
    onBackPress?: () => void;
}


const AdminHeader: React.FC<AdminHeaderProps> = ({ title, isTransparent = false, navigation, onBackPress }) => {
    const handleMenuPress = () => {
        if (navigation) {
            navigation.openDrawer();
        }
    };

    return (
        <View style={[
            styles.header,
            isTransparent ? styles.headerTransparent : styles.headerDefault
        ]}>
            <TouchableOpacity style={styles.iconButton} onPress={handleMenuPress}>
                <Ionicons
                    name={'menu'}
                    size={30}
                    color={Colors.TEXT_DARK}
                />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            {onBackPress && (
                <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
                    <Ionicons
                        name={'arrow-back'}
                        size={30}
                        color={Colors.TEXT_DARK}
                    />
                </TouchableOpacity>
            )}
            {!onBackPress && <View style={styles.iconButtonPlaceholder} />}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    headerDefault: {
        paddingTop: Platform.OS === 'ios' ? 50 : 30, 
        height: Platform.OS === 'ios' ? 90 : 70, 
        backgroundColor: Colors.PRIMARY, 
    },
    headerTransparent: {
        paddingTop: 10, 
        height: 70, 
        backgroundColor: 'transparent', 
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

export default AdminHeader;
