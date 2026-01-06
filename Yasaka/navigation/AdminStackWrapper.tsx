import React from 'react';
import AdminStack from './AdminStack';
import { useAdmin } from '../context/AdminContext';

const AdminStackWrapper = () => {
    const { isLoggedIn } = useAdmin();

    if (!isLoggedIn) {
    }

    return <AdminStack />;
};

export default AdminStackWrapper;

