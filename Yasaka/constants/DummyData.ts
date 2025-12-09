export interface MenuItem {
    id: string;
    name: string;
    price: number;
    category: string;
    image: any; // For require() images
    description?: string;
}

export const menuItems: MenuItem[] = [
    // PAKET
    {
        id: '1',
        name: 'Paket Ayam Geprek',
        price: 25000,
        category: 'PAKET',
        image: require('../assets/images/Bubble.png'),
        description: 'Ayam geprek dengan nasi hangat, sambal terasi, dan lalapan segar. Cocok untuk makan siang atau malam.'
    },
    {
        id: '2',
        name: 'Paket Nasi Box',
        price: 30000,
        category: 'PAKET',
        image: require('../assets/images/Bubble.png'),
        description: 'Nasi box praktis dengan ayam goreng, telur, sayuran, dan sambal. Ideal untuk makan cepat saji.'
    },
    // AYAM
    {
        id: '3',
        name: 'Ayam Goreng',
        price: 15000,
        category: 'AYAM',
        image: require('../assets/images/Bubble.png'),
        description: 'Ayam goreng crispy dengan bumbu rempah tradisional. Kulitnya renyah, dagingnya juicy dan empuk.'
    },
    {
        id: '4',
        name: 'Ayam Bakar',
        price: 18000,
        category: 'AYAM',
        image: require('../assets/images/Bubble.png'),
        description: 'Ayam bakar dengan bumbu kecap manis dan rempah. Aromanya harum, rasanya manis gurih.'
    },
    // MINUMAN
    {
        id: '5',
        name: 'Es Teh',
        price: 5000,
        category: 'MINUMAN',
        image: require('../assets/images/Bubble.png'),
        description: 'Teh hitam dingin yang menyegarkan, disajikan dengan es batu dan irisan lemon.'
    },
    {
        id: '6',
        name: 'Jus Jeruk',
        price: 8000,
        category: 'MINUMAN',
        image: require('../assets/images/Bubble.png'),
        description: 'Jus jeruk segar dari jeruk pilihan, kaya vitamin C dan rasa asam manis yang menyegarkan.'
    },
    // KENTANG
    {
        id: '7',
        name: 'Kentang Goreng',
        price: 10000,
        category: 'KENTANG',
        image: require('../assets/images/Bubble.png'),
        description: 'Kentang goreng renyah di luar, lembut di dalam. Cocok sebagai camilan atau lauk.'
    },
    {
        id: '8',
        name: 'Kentang Bakar',
        price: 12000,
        category: 'KENTANG',
        image: require('../assets/images/Bubble.png'),
        description: 'Kentang bakar dengan keju melted di atasnya. Gurih, creamy, dan sangat menggugah selera.'
    },
];
