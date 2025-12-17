
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Alert, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TEXT_BG_TRANSPARENT, TEXT_DARK, PRIMARY } from '../../constants/Colors';
import { useAdmin } from '../../context/AdminContext';


type AdminStackParamList = {
    AdminDrawer: undefined;
    TambahMenu: undefined;
    EditMenu: { menuId: string };
    EditStatusPesanan: undefined;
};

type AdminLoginScreenNavigationProp = NativeStackNavigationProp<AdminStackParamList, any>;


interface AdminLoginScreenProps {
    navigation: AdminLoginScreenNavigationProp;
}


export default function AdminLoginScreen({ navigation }: AdminLoginScreenProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAdmin();

    const handleLogin = async () => {
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'Email dan password harus diisi');
            return;
        }


        const success = await login(email, password);
        if (success) {
            Alert.alert('Success', 'Login berhasil!');
            navigation.navigate('AdminDrawer');
        } else {
            Alert.alert('Error', 'Email atau password salah');
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            
            <ImageBackground 
                source={require('../../assets/images/BACKROUND.jpeg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.overlay} />
                
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>ADMIN LOGIN</Text>
                        <Text style={styles.subtitle}>Masuk ke dashboard admin</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputGroup}>
                                <AntDesign name="user" size={20} color={PRIMARY} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email atau Username"
                                    placeholderTextColor="#A0A0A0"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>
                            
                            <View style={styles.inputGroup}>
                                <AntDesign name="lock" size={20} color={PRIMARY} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor="#A0A0A0"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <TouchableOpacity 
                            style={styles.loginButton}
                            onPress={handleLogin}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.loginButtonText}>Masuk</Text>

                            <AntDesign name="arrow-right" size={18} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.backButton}
                            onPress={handleBack}
                            activeOpacity={0.7}
                        >

                            <AntDesign name="arrow-left" size={16} color={PRIMARY} />
                            <Text style={styles.backButtonText}>Kembali</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 2,
        textAlign: 'center',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#E0E0E0',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    formContainer: {
        width: '100%',
        maxWidth: 320,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderRadius: 20,
        padding: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
    },
    inputContainer: {
        marginBottom: 32,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E9ECEF',
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
        color: TEXT_DARK,
        padding: 0,
    },
    loginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PRIMARY,
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        marginBottom: 20,
        shadowColor: PRIMARY,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginRight: 8,
        letterSpacing: 0.5,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    backButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: PRIMARY,
        marginLeft: 6,
        letterSpacing: 0.3,
    },
});
