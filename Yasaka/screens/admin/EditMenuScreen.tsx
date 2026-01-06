import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, TextInput, Alert, Image, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import AdminHeader from '../../components/AdminHeader';
import { menuItems, MenuItem } from '../../constants/DummyData';
import * as Colors from '../../constants/Colors';
import * as Fonts from '../../constants/Fonts';
import { AdminStackParamList } from '../../navigation/AdminStack';

const categories = ["PAKET", "AYAM", "MINUMAN", "KENTANG"];

type EditMenuScreenRouteProp = RouteProp<AdminStackParamList, 'EditMenu'>;
type EditMenuScreenNavigationProp = NativeStackNavigationProp<AdminStackParamList, 'EditMenu'>;

const EditMenuScreen: React.FC = () => {
    const navigation = useNavigation<EditMenuScreenNavigationProp>();
    const route = useRoute<EditMenuScreenRouteProp>();
    const { mode, menuId } = route.params;

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: 'PAKET'
    });

    const [menuList, setMenuList] = useState<MenuItem[]>(menuItems);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [tempImageUrl, setTempImageUrl] = useState('');

    const isEditMode = mode === 'edit';
    const currentMenu = isEditMode ? menuList.find(item => item.id === menuId) : null;

    useEffect(() => {
        if (isEditMode && currentMenu) {
            setFormData({
                name: currentMenu.name,
                description: currentMenu.description || '',
                price: currentMenu.price.toString(),
                imageUrl: typeof currentMenu.image === 'string' ? currentMenu.image : '',
                category: currentMenu.category
            });
        }
    }, [isEditMode, currentMenu]);

    const handleSaveMenu = () => {
        if (!formData.name.trim()) {
            Alert.alert('Error', 'Nama menu harus diisi');
            return;
        }

        if (!formData.description.trim()) {
            Alert.alert('Error', 'Deskripsi menu harus diisi');
            return;
        }

        if (!formData.price.trim()) {
            Alert.alert('Error', 'Harga menu harus diisi');
            return;
        }

        const price = parseFloat(formData.price);
        if (isNaN(price) || price <= 0) {
            Alert.alert('Error', 'Harga harus berupa angka positif');
            return;
        }

        const menuData = {
            name: formData.name.trim(),
            description: formData.description.trim(),
            price: price,
            category: formData.category,
            image: formData.imageUrl.trim() ? { uri: formData.imageUrl.trim() } : require('../../assets/images/Bubble.png')
        };

        if (isEditMode && currentMenu) {
            setMenuList(prev => prev.map(item => 
                item.id === menuId 
                    ? { ...item, ...menuData }
                    : item
            ));
            Alert.alert('Success', 'Menu berhasil diperbarui');
        } else {
            const newItem: MenuItem = {
                id: Date.now().toString(),
                ...menuData
            };
            setMenuList(prev => [...prev, newItem]);
            Alert.alert('Success', 'Menu berhasil ditambahkan');
        }

        navigation.goBack();
    };

    const handleImageSelect = () => {
        if (tempImageUrl.trim()) {
            setFormData(prev => ({ ...prev, imageUrl: tempImageUrl.trim() }));
        }
        setIsImageModalVisible(false);
        setTempImageUrl('');
    };

    const pickImageFromGallery = async () => {
        try {
            const { status: permissionStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            
            if (permissionStatus !== 'granted') {
                Alert.alert(
                    'Izin Diperlukan', 
                    'Izin akses galeri diperlukan untuk memilih gambar. Silakan berikan izin di pengaturan aplikasi.'
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const selectedImage = result.assets[0];
                setTempImageUrl(selectedImage.uri);
                setFormData(prev => ({ ...prev, imageUrl: selectedImage.uri }));
            }
        } catch (error) {
            Alert.alert('Error', 'Gagal memilih gambar. Silakan coba lagi.');
        }
    };

    const renderImagePreview = () => {
        const imageSource = formData.imageUrl.trim() 
            ? { uri: formData.imageUrl.trim() }
            : require('../../assets/images/Bubble.png');

        return (
            <View style={styles.imagePreviewContainer}>
                <Image 
                    source={imageSource} 
                    style={styles.imagePreview}
                    resizeMode="cover"
                    onError={() => {
                        Alert.alert('Error', 'URL gambar tidak valid');
                        setFormData(prev => ({ ...prev, imageUrl: '' }));
                    }}
                />
                <TouchableOpacity 
                    style={styles.changeImageButton}
                    onPress={() => setIsImageModalVisible(true)}
                >
                    <Ionicons name="camera" size={20} color="white" />
                    <Text style={styles.changeImageText}>Ubah Gambar</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/cover.jpg')}
                style={styles.background}
                resizeMode="cover"
            >
                <BlurView
                    intensity={30}
                    tint="dark"
                    style={StyleSheet.absoluteFill}
                />



                <AdminHeader 
                    title={isEditMode ? "EDIT MENU" : "TAMBAH MENU"} 
                    navigation={navigation}
                    onBackPress={() => navigation.goBack()} 
                />

                <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
                    {renderImagePreview()}

                    <View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Nama Menu *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Masukkan nama menu"
                                value={formData.name}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Deskripsi *</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Masukkan deskripsi menu"
                                multiline
                                numberOfLines={4}
                                value={formData.description}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Harga (Rp) *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Masukkan harga menu"
                                keyboardType="numeric"
                                value={formData.price}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, price: text }))}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Kategori *</Text>
                            <View style={styles.categorySelector}>
                                {categories.map((cat) => (
                                    <TouchableOpacity
                                        key={cat}
                                        style={[
                                            styles.categoryChip,
                                            formData.category === cat && styles.categoryChipSelected
                                        ]}
                                        onPress={() => setFormData(prev => ({ ...prev, category: cat }))}
                                    >
                                        <Text style={[
                                            styles.categoryChipText,
                                            formData.category === cat && styles.categoryChipTextSelected
                                        ]}>{cat}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <TouchableOpacity 
                            style={styles.saveButton}
                            onPress={handleSaveMenu}
                        >
                            <Ionicons name="save" size={20} color="white" />
                            <Text style={styles.saveButtonText}>
                                {isEditMode ? 'Perbarui Menu' : 'Simpan Menu'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </ImageBackground>

            <Modal
                visible={isImageModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => {
                    setIsImageModalVisible(false);
                    setTempImageUrl('');
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Pilih Sumber Gambar</Text>
                        
                        {/* Opsi Gallery */}
                        <TouchableOpacity 
                            style={styles.galleryOptionButton}
                            onPress={() => {
                                setIsImageModalVisible(false);
                                pickImageFromGallery();
                            }}
                        >
                            <Ionicons name="images" size={24} color={Colors.PRIMARY} />
                            <Text style={styles.galleryOptionText}>Pilih dari Galeri</Text>
                        </TouchableOpacity>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>atau</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        {/* Input URL */}
                        <Text style={styles.urlLabel}>Masukkan URL Gambar:</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="https://example.com/image.jpg"
                            value={tempImageUrl}
                            onChangeText={setTempImageUrl}
                            autoCapitalize="none"
                            keyboardType="url"
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity 
                                style={styles.modalCancelButton}
                                onPress={() => {
                                    setIsImageModalVisible(false);
                                    setTempImageUrl('');
                                }}
                            >
                                <Text style={styles.modalCancelText}>Batal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.modalConfirmButton}
                                onPress={() => {
                                    if (tempImageUrl.trim()) {
                                        setFormData(prev => ({ ...prev, imageUrl: tempImageUrl.trim() }));
                                    }
                                    setIsImageModalVisible(false);
                                    setTempImageUrl('');
                                }}
                            >
                                <Text style={styles.modalConfirmText}>Pilih</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_OVERLAY
    },
    background: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        marginTop: 10,
    },
    imagePreviewContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imagePreview: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: Colors.PRIMARY,
    },
    changeImageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 10,
    },
    changeImageText: {
        color: 'white',
        fontSize: 12,
        fontWeight: Fonts.WEIGHT_MEDIUM,
        marginLeft: 5,
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: Fonts.WEIGHT_MEDIUM,
        color: 'white',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 14,
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    categorySelector: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    categoryChip: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    categoryChipSelected: {
        backgroundColor: Colors.PRIMARY,
        borderColor: Colors.PRIMARY,
    },
    categoryChipText: {
        fontSize: 12,
        color: 'white',
        fontWeight: Fonts.WEIGHT_MEDIUM,
    },
    categoryChipTextSelected: {
        color: 'white',
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 15,
        borderRadius: 25,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: Fonts.WEIGHT_BOLD,
        marginLeft: 8,
        textTransform: 'uppercase',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_DARK,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 14,
        color: Colors.TEXT_DARK,
        backgroundColor: '#FAFAFA',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    modalCancelButton: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalCancelText: {
        color: '#666',
        fontSize: 14,
        fontWeight: Fonts.WEIGHT_MEDIUM,
    },
    modalConfirmButton: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalConfirmText: {
        color: 'white',
        fontSize: 14,
        fontWeight: Fonts.WEIGHT_BOLD,
    },
    galleryOptionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F8FF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.PRIMARY,
        borderStyle: 'dashed',
    },
    galleryOptionText: {
        fontSize: 16,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.PRIMARY,
        marginLeft: 10,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    dividerText: {
        marginHorizontal: 15,
        color: '#999',
        fontSize: 12,
    },
    urlLabel: {
        fontSize: 14,
        fontWeight: Fonts.WEIGHT_MEDIUM,
        color: Colors.TEXT_DARK,
        marginBottom: 8,
    },
});

export default EditMenuScreen;
