import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

interface AdminContextType {
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    adminEmail: string;
    setNavigation: (navigation: any) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};

interface AdminProviderProps {
    children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminEmail, setAdminEmail] = useState('');
    const [navigation, setNavigation] = useState<any>(null);

    const login = async (email: string, password: string): Promise<boolean> => {
        if (email === 'ADMIN' && password === 'admin123') {
            setIsLoggedIn(true);
            setAdminEmail(email);
            return true;
        }
        return false;
    };

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setAdminEmail('');
        if (navigation) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'User' }],
                })
            );
        }
    }, [navigation]);

    return (
        <AdminContext.Provider
            value={{
                isLoggedIn,
                login,
                logout,
                adminEmail,
                setNavigation,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

