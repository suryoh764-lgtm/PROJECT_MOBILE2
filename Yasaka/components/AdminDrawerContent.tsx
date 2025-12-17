import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Colors from '../constants/Colors';
import * as Fonts from '../constants/Fonts';

interface AdminDrawerContentProps {
    navigation: any;
}

const AdminDrawerContent: React.FC<AdminDrawerContentProps> = ({ navigation }) => {
    const handleNavigate = (screenName: string, params?: any) => {
        navigation.closeDrawer();
        navigation.navigate(screenName, params);
    };

    const handleLogout = () => {
        navigation.closeDrawer();
        navigation.navigate('AdminLogin');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => navigation.closeDrawer()}
                >
                    <Ionicons name="close" size={30} color={Colors.TEXT_DARK} />
                </TouchableOpacity>
            </View>
            

            <View style={styles.menuContainer}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleNavigate('TambahMenu')}
                >
                    <Ionicons name="add-circle-outline" size={24} color={Colors.TEXT_DARK} />
                    <Text style={styles.menuText}>TAMBAH MENU</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleNavigate('EditMenu', { mode: 'select' })}
                >
                    <Ionicons name="create-outline" size={24} color={Colors.TEXT_DARK} />
                    <Text style={styles.menuText}>EDIT MENU</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleNavigate('EditStatusPesanan')}
                >
                    <Ionicons name="time-outline" size={24} color={Colors.TEXT_DARK} />
                    <Text style={styles.menuText}>STATUS PESANAN</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutText}>LOGOUT ADMIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
    closeButton: {
        padding: 10,
    },
    menuContainer: {
        flex: 1,
    },
    menuItem: {
        backgroundColor: Colors.BUTTON_HOMESCREEN,
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    menuText: {
        fontSize: Fonts.SIZE_CATEGORY,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_DARK,
        marginLeft: 15,
        textTransform: 'uppercase',
    },
    bottomSection: {
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: Colors.BUTTON_HOMESCREEN,
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    logoutText: {
        fontSize: Fonts.SIZE_CATEGORY,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_DARK,
        textTransform: 'uppercase',
    },
});

export default AdminDrawerContent;
