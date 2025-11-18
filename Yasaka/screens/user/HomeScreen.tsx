import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity 
} from 'react-native';

import { AntDesign } from '@expo/vector-icons'; 
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


type RootStackParamList = {
    Menu: undefined;
    
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Menu'>;

export default function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) { 
    
    // Fungsi untuk menangani penekanan tombol
    const handlePress = () => {
       
        navigation.navigate('Menu'); 
        console.log("Navigating to Menu Screen...");
    };

    return (
        
        <ImageBackground 
            source={require('../../assets/images/BACKROUND.jpeg')} // ⚠️ Pastikan path ini benar!
            style={styles.background}
            resizeMode="cover"
        >
            
            <View style={styles.overlay} /> 

            {/* Konten Utama */}
            <View style={styles.contentContainer}>
                
                {/* Konten Teks */}
                <View style={styles.textOverlay}>
                    <Text style={styles.yasakaText}>yasaka</Text>
                    <Text style={styles.friedChickenText}>fried chicken</Text>
                </View>

                <View style={{ flex: 1 }} /> 

                {/* Tombol PESAN SEKARANG */}
                <TouchableOpacity 
                    style={styles.button}
                    onPress={handlePress}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>PESAN SEKARANG</Text>
                    <AntDesign name="arrow-right" size={24} color="black" style={styles.buttonIcon} />
                </TouchableOpacity>

            </View>
        </ImageBackground>
    );
}

// --- Styling ---
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
  
  // Styling Teks
  textOverlay: {
    position: 'absolute', 
    top: '30%', 
    alignItems: 'center',
    width: '100%',
  },
  yasakaText: {
    fontSize: 70, 
    color: '#E0E0E0', 
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    letterSpacing: 2,
    textShadowColor: 'black', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  friedChickenText: {
    fontSize: 30,
    color: '#E0E0E0',
    marginTop: -15, 
    letterSpacing: 1.5,
    fontStyle: 'italic',
  },

  // Styling Tombol
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0', 
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginBottom: 40, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, 
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
    letterSpacing: 1,
  },
  buttonIcon: {}
});