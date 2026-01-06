import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from './CartContext';

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  tableNumber: string;
  notes: string;
  orderTime: string;
  status: 'belum_diproses' | 'sedang_diproses' | 'siap_diambil' | 'selesai';
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderTime' | 'status'>) => void;
  getCurrentOrder: () => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrdersByStatus: (status: Order['status']) => Order[];
  getAllOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (orderData: Omit<Order, 'id' | 'orderTime' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      orderTime: new Date().toLocaleString('id-ID'),
      status: 'belum_diproses'
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  const getCurrentOrder = () => {
    return orders.find(order => order.status === 'sedang_diproses');
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter(order => order.status === status);
  };

  const getAllOrders = () => {
    return orders;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        getCurrentOrder,
        updateOrderStatus,
        getOrdersByStatus,
        getAllOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
