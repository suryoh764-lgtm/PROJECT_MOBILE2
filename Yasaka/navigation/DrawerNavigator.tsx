import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import UserStack from './UserStack';
import * as Colors from '../constants/Colors';
import * as Fonts from '../constants/Fonts';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="UserStack" component={UserStack} />
    </Drawer.Navigator>
  );
};


const DrawerContent = (props: any) => {
  const { navigation } = props;


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
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('UserStack', { screen: 'Home' });
          }}
        >
          <Ionicons name="home" size={24} color={Colors.TEXT_DARK} />
          <Text style={styles.menuText}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('UserStack', { screen: 'Menu' });
          }}
        >
          <Ionicons name="book" size={24} color={Colors.TEXT_DARK} />
          <Text style={styles.menuText}>MENU</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('UserStack', { screen: 'Keranjang' });
          }}
        >
          <Ionicons name="cart" size={24} color={Colors.TEXT_DARK} />
          <Text style={styles.menuText}>KERANJANG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('UserStack', { screen: 'StatusPesanan' });
          }}
        >
          <Ionicons name="time-outline" size={24} color={Colors.TEXT_DARK} />
          <Text style={styles.menuText}>STATUS PESANAN</Text>
        </TouchableOpacity>
      </View>



      <View style={styles.adminButtonContainer}>
        <TouchableOpacity
          style={styles.adminMenuItem}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('Admin');
          }}
        >
          <Text style={styles.adminMenuText}>LOGIN ADMIN</Text>
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
  adminButtonContainer: {
    marginBottom: 20,
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

  adminMenuItem: {
    backgroundColor: Colors.BUTTON_HOMESCREEN,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  adminMenuText: {
    fontSize: Fonts.SIZE_CATEGORY,
    fontWeight: Fonts.WEIGHT_BOLD,
    color: Colors.TEXT_DARK,
    textTransform: 'uppercase',
  },
  menuText: {
    fontSize: Fonts.SIZE_CATEGORY,
    fontWeight: Fonts.WEIGHT_BOLD,
    color: Colors.TEXT_DARK,
    marginLeft: 15,
    textTransform: 'uppercase',
  },
});

export default DrawerNavigator;

