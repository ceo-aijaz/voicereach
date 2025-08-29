import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface AdminContextType {
  isAdmin: boolean;
  checkAdminStatus: (email: string) => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useAuth();

  const ADMIN_EMAIL = 'official.aijazalee@gmail.com';

  const checkAdminStatus = (email: string) => {
    return email === ADMIN_EMAIL;
  };

  useEffect(() => {
    if (user?.email) {
      setIsAdmin(checkAdminStatus(user.email));
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const value = {
    isAdmin,
    checkAdminStatus,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};