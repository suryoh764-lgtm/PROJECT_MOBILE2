


import React from 'react';
import AdminStack from './AdminStack';
import { useAdmin } from '../context/AdminContext';

const AdminStackWrapper = () => {
    const { isLoggedIn } = useAdmin();

    // If not logged in, navigate to login
    if (!isLoggedIn) {
        // This will be handled by AdminStack's initial route
    }

    return <AdminStack />;
};

export default AdminStackWrapper;
