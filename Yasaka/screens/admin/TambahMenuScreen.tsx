import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Alert, Image, TextInput, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import AdminHeader from '../../components/AdminHeader';
import { MenuItem, useMenu } from '../../context/MenuContext';
import * as Colors from '../../constants/Colors';
import * as Fonts from '../../constants/Fonts';

const categories = ["PAKET", "AYAM", "MINUMAN", "KENTANG"];

interface TambahMenuScreenProps {
    navigation: NativeStackNavigationProp<any>;
    onMenuPress?: () => void;
}

interface MenuFormData {
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    category: string;
}

const TambahMenuScreen = ({ navigation, onMenuPress }: TambahMenuScreenProps) => {
    const { menuItems, addMenu, deleteMenu } = useMenu();
    const [selectedCategory, setSelectedCategory] = useState('PAKET');
    const [showForm, setShowForm] = useState(false);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [tempImageUrl, setTempImageUrl] = useState('');

    const [formData, setFormData] = useState<MenuFormData>({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: 'PAKET'
    });

    const [errors, setErrors] = useState<Partial<MenuFormData>>({});

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            imageUrl: '',
            category: 'PAKET'
        });
        setErrors({});
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<MenuFormData> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Nama menu harus diisi';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Deskripsi harus diisi';
        }

        if (!formData.price.trim()) {
            newErrors.price = 'Harga harus diisi';
        } else {
            const price = parseFloat(formData.price);
            if (isNaN(price) || price <= 0) {
                newErrors.price = 'Harga harus berupa angka positif';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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

    const handleSaveMenu = () => {
        if (!validateForm()) {
            return;
        }

        const price = parseFloat(formData.price);
        const newMenuItem: MenuItem = {
            id: Date.now().toString(),
            name: formData.name.trim(),
            description: formData.description.trim(),
            price: price,
            category: formData.category,
            image: formData.imageUrl.trim() 
                ? { uri: formData.imageUrl.trim() } 
                : require('../../assets/images/Bubble.png')
        };

        addMenu(newMenuItem);
        Alert.alert('Sukses', 'Menu berhasil ditambahkan!');
        setShowForm(false);
        resetForm();
    };

    const handleImageSelect = () => {
        if (tempImageUrl.trim()) {
            setFormData(prev => ({ ...prev, imageUrl: tempImageUrl.trim() }));
        }
        setIsImageModalVisible(false);
        setTempImageUrl('');
    };

    const handleEditMenu = (menuId: string) => {
        navigation.navigate('EditMenu', { mode: 'edit', menuId });
    };

    const handleDeleteMenu = (item: MenuItem) => {
        Alert.alert(
            'Konfirmasi Hapus',
            `Apakah Anda yakin ingin menghapus menu "${item.name}"?`,
            [
                { text: 'Batal', style: 'cancel' },
                { 
                    text: 'Hapus', 
                    style: 'destructive',
                    onPress: () => {
                        deleteMenu(item.id);
                        Alert.alert('Success', 'Menu berhasil dihapus');
                    }
                }
            ]
        );
    };

    const filteredMenu = menuItems.filter(item => item.category === selectedCategory);

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
                    <Text style={styles.changeImageText}>Pilih Gambar</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderForm = () => (
        <View style={styles.formContainer}>
            <View style={styles.formHeader}>
                <Text style={styles.formTitle}>TAMBAH MENU BARU</Text>
                <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => {
                        setShowForm(false);
                        resetForm();
                    }}
                >
                    <Ionicons name="close" size={24} color={Colors.TEXT_LIGHT} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.formScrollView} showsVerticalScrollIndicator={false}>
                {renderImagePreview()}

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Nama Menu *</Text>
                    <TextInput
                        style={[styles.input, errors.name && styles.inputError]}
                        placeholder="Masukkan nama menu"
                        value={formData.name}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Deskripsi *</Text>
                    <TextInput
                        style={[styles.input, styles.textArea, errors.description && styles.inputError]}
                        placeholder="Masukkan deskripsi menu"
                        multiline
                        numberOfLines={4}
                        value={formData.description}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                    />
                    {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Harga (Rp) *</Text>
                    <TextInput
                        style={[styles.input, errors.price && styles.inputError]}
                        placeholder="Masukkan harga menu"
                        keyboardType="numeric"
                        value={formData.price}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, price: text }))}
                    />
                    {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
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

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.cancelButton}
                        onPress={() => {
                            setShowForm(false);
                            resetForm();
                        }}
                    >
                        <Text style={styles.cancelButtonText}>Batal</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.saveButton}
                        onPress={handleSaveMenu}
                    >
                        <Ionicons name="save" size={20} color="white" />
                        <Text style={styles.saveButtonText}>Simpan Menu</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );

    if (showForm) {
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
                    {renderForm()}
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
    }

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
                    title="MANAJEMEN MENU" 
                    navigation={navigation}
                    onBackPress={() => navigation.goBack()} 
                />

                <View style={styles.categoryContainer}>
                    {categories.map((cat, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.categoryButton,
                                selectedCategory === cat && styles.categoryButtonSelected
                            ]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text style={[
                                styles.categoryText,
                                selectedCategory === cat && styles.categoryTextSelected
                            ]}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
                    {filteredMenu.map(item => (
                        <View key={item.id} style={styles.menuCard}>
                            <View style={styles.menuImageContainer}>
                                <Image 
                                    source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
                                    style={styles.menuImage}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.menuInfo}>
                                <Text style={styles.menuTitle}>{item.name}</Text>
                                <Text style={styles.menuDescription}>{item.description}</Text>
                                <Text style={styles.menuPrice}>Rp {item.price.toLocaleString()}</Text>
                            </View>

                            <View style={styles.actionButtons}>
                                <TouchableOpacity 
                                    style={styles.editButton}
                                    onPress={() => handleEditMenu(item.id)}
                                >
                                    <Ionicons name="create" size={20} color="#4CAF50" />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.deleteButton}
                                    onPress={() => handleDeleteMenu(item)}
                                >
                                    <Ionicons name="trash" size={20} color="#ff4444" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={() => setShowForm(true)}
                >
                    <Ionicons name="add" size={24} color="white" />
                    <Text style={styles.addButtonText}>Tambah Menu Baru</Text>
                </TouchableOpacity>
            </ImageBackground>
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
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        gap: 10
    },
    categoryButton: {
        backgroundColor: Colors.PRIMARY,
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
    },
    categoryText: {
        color: Colors.TEXT_DARK,
        fontSize: Fonts.SIZE_CATEGORY,
        fontWeight: Fonts.WEIGHT_BOLD,
    },
    categoryButtonSelected: {
        backgroundColor: Colors.BUTTON_HOMESCREEN,
    },
    categoryTextSelected: {
        color: Colors.TEXT_DARK,
    },
    menuContainer: {
        flex: 1,
        marginTop: 20,
        marginBottom: 100,
        paddingHorizontal: 20,
    },
    menuCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 15,
        marginBottom: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    menuImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        marginRight: 15,
    },
    menuImage: {
        width: '100%',
        height: '100%',
    },
    menuInfo: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_DARK,
        marginBottom: 4,
    },
    menuDescription: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    menuPrice: {
        fontSize: 14,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.PRIMARY,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    editButton: {
        backgroundColor: '#e6ffe6',
        padding: 8,
        borderRadius: 8,
    },
    deleteButton: {
        backgroundColor: '#ffe6e6',
        padding: 8,
        borderRadius: 8,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 15,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: Fonts.WEIGHT_BOLD,
        marginLeft: 8,
        textTransform: 'uppercase',
    },
    
    formContainer: {
        flex: 1,
        marginTop: 90,
        marginBottom: 20,
        marginHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderRadius: 20,
        overflow: 'hidden',
    },
    formHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    formTitle: {
        fontSize: 18,
        fontWeight: Fonts.WEIGHT_BOLD,
        color: Colors.TEXT_LIGHT,
        textTransform: 'uppercase',
    },
    closeButton: {
        padding: 5,
    },
    formScrollView: {
        flex: 1,
        padding: 20,
    },
    imagePreviewContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imagePreview: {
        width: 120,
        height: 120,
        borderRadius: 60,
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
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: Fonts.WEIGHT_MEDIUM,
        color: Colors.TEXT_DARK,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 14,
        color: Colors.TEXT_DARK,
        backgroundColor: '#FAFAFA',
    },
    inputError: {
        borderColor: '#ff4444',
        backgroundColor: '#fff5f5',
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
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    categoryChipSelected: {
        backgroundColor: Colors.PRIMARY,
        borderColor: Colors.PRIMARY,
    },
    categoryChipText: {
        fontSize: 12,
        color: Colors.TEXT_DARK,
        fontWeight: Fonts.WEIGHT_MEDIUM,
    },
    categoryChipTextSelected: {
        color: 'white',
    },
    errorText: {
        color: '#ff4444',
        fontSize: 12,
        marginTop: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 20,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: Fonts.WEIGHT_MEDIUM,
    },
    saveButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 15,
        borderRadius: 12,
        gap: 8,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: Fonts.WEIGHT_BOLD,
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

export default TambahMenuScreen;

