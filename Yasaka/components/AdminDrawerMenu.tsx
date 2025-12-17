import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Colors from '../constants/Colors';
import * as Fonts from '../constants/Fonts';

interface AdminDrawerMenuProps {
    navigation: any;
    onClose: () => void;
}

const AdminDrawerMenu: React.FC<AdminDrawerMenuProps> = ({ navigation, onClose }) => {
    const handleNavigate = (screenName: string, params?: any) => {
        onClose();
        navigation.navigate(screenName, params);
    };

    const handleLogout = () => {
        onClose();
        navigation.navigate('AdminLogin');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                >
                    <Ionicons name="close" size={30} color={Colors.TEXT_LIGHT} />
                </TouchableOpacity>
                <Text style={styles.adminTitle}>ADMIN PANEL</Text>
            </View>
            
            <View style={styles.menuContainer}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleNavigate('TambahMenu')}
                >
                    <Ionicons name="add-circle-outline" size={24} color={Colors.TEXT_LIGHT} />
                    <Text style={styles.menuText}>TAMBAH MENU</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleNavigate('EditMenu', { mode: 'select' })}
                >
                    <Ionicons name="create-outline" size={24} color={Colors.TEXT_LIGHT} />
                    <Text style={styles.menuText}>EDIT MENU</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleNavigate('EditStatusPesanan')}
                >
                    <Ionicons name="time-outline" size={24} color={Colors.TEXT_LIGHT} />
                    <Text style={styles.menuText}>STATUS PESANAN</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={24} color={Colors.TEXT_LIGHT} />
                    <Text style={styles.logoutText}>LOGOUT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    closeButton: {
        padding: 10,
        marginRight: 15,
    },
    adminTitle: {
        fontSize: Fonts.SIZE_HEADER,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_LIGHT,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    menuContainer: {
        flex: 1,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 12,
        marginBottom: 12,
    },
    menuText: {
        fontSize: Fonts.SIZE_CATEGORY,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_LIGHT,
        marginLeft: 15,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    bottomSection: {
        marginBottom: 30,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.ACCENT,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 12,
    },
    logoutText: {
        fontSize: Fonts.SIZE_CATEGORY,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_LIGHT,
        marginLeft: 10,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
});

export default AdminDrawerMenu;
