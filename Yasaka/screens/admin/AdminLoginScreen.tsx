import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TEXT_BG_TRANSPARENT, TEXT_DARK, PRIMARY } from '../../constants/Colors';

type AdminStackParamList = {
    TambahMenu: undefined;
    EditMenu: { menuId: string };
    EditStatusPesanan: undefined;
};

type AdminLoginScreenNavigationProp = NativeStackNavigationProp<AdminStackParamList, any>;

export default function AdminLoginScreen({ navigation }: { navigation: AdminLoginScreenNavigationProp }) { 
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'Email dan password harus diisi');
            return;
        }

        if (email === 'admin' && password === 'admin') {
            Alert.alert('Success', 'Login berhasil!');
            navigation.navigate('TambahMenu');
        } else {
            Alert.alert('Error', 'Email atau password salah');
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        
        <ImageBackground 
            source={require('../../assets/images/BACKROUND.jpeg')}
            style={styles.background}
            resizeMode="cover"
        >

            <View style={styles.overlay} /> 

            <View style={styles.contentContainer}>

                <View style={styles.textOverlay}>
                    <Text style={styles.yasakaText}>admin</Text>
                    <Text style={styles.friedChickenText}>login</Text>
                </View>

                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email atau Username"
                        placeholderTextColor={TEXT_DARK}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={TEXT_DARK}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                    />

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={handleLogin}
                        activeOpacity={0.8}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                        <AntDesign name="arrow-right" size={24} color="black" style={styles.buttonIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={handleBack}
                        activeOpacity={0.8}>
                        <Text style={styles.backButtonText}>KEMBALI</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end', 
    alignItems: 'center',
  },

  textOverlay: {
    position: 'absolute', 
    top: '20%', 
    alignItems: 'center',
    width: '100%',
  },
  yasakaText: {
    fontSize: 60, 
    color: TEXT_DARK, 
    backgroundColor: TEXT_BG_TRANSPARENT,
    paddingHorizontal: 15,
    paddingVertical: 5,
    paddingTop: 0,
    paddingBottom: 25,
    letterSpacing: 2,
    textShadowColor: 'black', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  friedChickenText: {
    fontSize: 25,
    color: TEXT_DARK,
    marginTop: -30, 
    letterSpacing: 1.5,
    fontStyle: 'italic',
  },

  formContainer: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 40,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: PRIMARY,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    color: TEXT_DARK,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0', 
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginBottom: 15,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, 
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
    letterSpacing: 1,
  },
  buttonIcon: {},

  backButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: PRIMARY,
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 10,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PRIMARY,
    letterSpacing: 1,
  },
});
