export type Category = 'PAKET' | 'AYAM' | 'MINUMAN' | 'KENTANG';

export type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category;
    imageUri: number; 
};

export type TableNumber = {
    label: string;
    value: string;
};

export type RootStackParamList = {
    Home: undefined;
    Menu: undefined;
    Keranjang: undefined;
    StatusPesanan: undefined;
};


// --- DAFTAR KATEGORI ---
export const CATEGORIES: Category[] = ['PAKET', 'AYAM', 'MINUMAN', 'KENTANG'];

// --- DATA DUMMY MENU ---
export const DUMMY_MENU_ITEMS: MenuItem[] = [
    { 
        id: '1', 
        name: 'Paket Yummy 1', 
        description: 'AYAM SAYAP / PAHA BAWAH CRISPY + NASI + ES TEH', 
        price: 13000, 
        category: 'PAKET', 
        imageUri: require('../../assets/images/Paketyummy.png') 
    },
    { 
        id: '2', 
        name: 'Paket Yummy 2', 
        description: 'AYAM DADA / PAHA ATAS CRISPY + NASI + ES TEH', 
        price: 15000, 
        category: 'PAKET', 
        imageUri: require('../../assets/images/Paketyummy.png') 
    },
    { 
        id: '3', 
        name: 'Dimsum Paket uhuy', 
        description: 'Dimsum lumpia beff 3 Dimsum ayam 3', 
        price: 40000, 
        category: 'PAKET', 
        imageUri: require('../../assets/images/Paketyummy.png') 
    },
    { 
        id: '4', 
        name: 'Ayam Paha Crispy', 
        description: 'Ayam Paha Bawah/Atas Crispy', 
        price: 10000, category: 'AYAM', 
        imageUri: require('../../assets/images/Paketyummy.png') 
    },
    { 
        id: '5', name: 'Es Teh Manis', 
        description: 'Es Teh Manis Segar', 
        price: 5000, category: 'MINUMAN', 
        imageUri: require('../../assets/images/esteh.png') 
    },
    { 
        id: '6', 
        name: 'Kentang Goreng', 
        description: 'Kentang Goreng Reguler', 
        price: 8000, 
        category: 'KENTANG', 
        imageUri: require('../../assets/images/Paketyummy.png') 
    },
];

// --- DATA DUMMY NOMOR MEJA ---
export const TABLE_NUMBERS: TableNumber[] = [
    { label: 'Pilih No Meja', value: '0' },
    { label: 'Meja 1', value: '1' },
    { label: 'Meja 2', value: '2' },
    { label: 'Meja 3', value: '3' },
];