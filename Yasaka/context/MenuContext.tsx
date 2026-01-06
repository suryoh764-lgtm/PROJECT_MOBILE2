import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface MenuItem {
    id: string;
    name: string;
    price: number;
    category: string;
    image: any;
    description?: string;
}

interface MenuContextType {
    menuItems: MenuItem[];
    addMenu: (item: MenuItem) => void;
    updateMenu: (id: string, updatedItem: Partial<MenuItem>) => void;
    deleteMenu: (id: string) => void;
    getMenuByCategory: (category: string) => MenuItem[];
    resetToDefault: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const initialMenuItems: MenuItem[] = [
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

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
};

interface MenuProviderProps {
    children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

    const addMenu = (item: MenuItem) => {
        const exists = menuItems.find(m => m.id === item.id);
        if (!exists) {
            setMenuItems(prev => [item, ...prev]);
        }
    };

    const updateMenu = (id: string, updatedItem: Partial<MenuItem>) => {
        setMenuItems(prev => 
            prev.map(item => 
                item.id === id ? { ...item, ...updatedItem } : item
            )
        );
    };

    const deleteMenu = (id: string) => {
        setMenuItems(prev => prev.filter(item => item.id !== id));
    };

    const getMenuByCategory = (category: string): MenuItem[] => {
        return menuItems.filter(item => item.category === category);
    };

    const resetToDefault = () => {
        setMenuItems(initialMenuItems);
    };

    return (
        <MenuContext.Provider
            value={{
                menuItems,
                addMenu,
                updateMenu,
                deleteMenu,
                getMenuByCategory,
                resetToDefault,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};

