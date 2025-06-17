import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_authenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    // Aqui você pode implementar a lógica real de autenticação
    // Por enquanto, vamos usar uma senha fixa para demonstração
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
    } else {
      throw new Error('Credenciais inválidas');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsEditMode(false);
    localStorage.removeItem('admin_authenticated');
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      isEditMode,
      toggleEditMode
    }}>
      {children}
    </AdminContext.Provider>
  );
};