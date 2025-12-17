import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminContextType {
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    adminEmail: string;
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

    const login = async (email: string, password: string): Promise<boolean> => {
        // Simple admin authentication
        if (email === 'ADMIN' && password === 'admin123') {
            setIsLoggedIn(true);
            setAdminEmail(email);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsLoggedIn(false);
        setAdminEmail('');
    };

    return (
        <AdminContext.Provider
            value={{
                isLoggedIn,
                login,
                logout,
                adminEmail,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
