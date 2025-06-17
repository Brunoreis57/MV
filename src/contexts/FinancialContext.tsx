import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  date: string;
  businessType: 'barbershop' | 'automotive';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  unitPrice: number;
  supplier: string;
  lastUpdated: string;
  businessType: 'barbershop' | 'automotive';
}

interface FinancialContextType {
  transactions: Transaction[];
  inventory: InventoryItem[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'lastUpdated'>) => void;
  updateInventoryItem: (id: string, item: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;
  getBusinessTransactions: (businessType: 'barbershop' | 'automotive') => Transaction[];
  getBusinessInventory: (businessType: 'barbershop' | 'automotive') => InventoryItem[];
  getFinancialSummary: (businessType: 'barbershop' | 'automotive') => {
    totalIncome: number;
    totalExpenses: number;
    profit: number;
    monthlyIncome: number;
    monthlyExpenses: number;
  };
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export const useFinancial = () => {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error('useFinancial must be used within FinancialProvider');
  }
  return context;
};

interface FinancialProviderProps {
  children: ReactNode;
}

export const FinancialProvider: React.FC<FinancialProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('financial_transactions');
    const savedInventory = localStorage.getItem('inventory_items');

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
  }, []);

  const saveTransactions = (newTransactions: Transaction[]) => {
    setTransactions(newTransactions);
    localStorage.setItem('financial_transactions', JSON.stringify(newTransactions));
  };

  const saveInventory = (newInventory: InventoryItem[]) => {
    setInventory(newInventory);
    localStorage.setItem('inventory_items', JSON.stringify(newInventory));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    };
    saveTransactions([...transactions, newTransaction]);
  };

  const updateTransaction = (id: string, updatedTransaction: Partial<Transaction>) => {
    const newTransactions = transactions.map(t => 
      t.id === id ? { ...t, ...updatedTransaction } : t
    );
    saveTransactions(newTransactions);
  };

  const deleteTransaction = (id: string) => {
    const newTransactions = transactions.filter(t => t.id !== id);
    saveTransactions(newTransactions);
  };

  const addInventoryItem = (item: Omit<InventoryItem, 'id' | 'lastUpdated'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString()
    };
    saveInventory([...inventory, newItem]);
  };

  const updateInventoryItem = (id: string, updatedItem: Partial<InventoryItem>) => {
    const newInventory = inventory.map(item => 
      item.id === id ? { ...item, ...updatedItem, lastUpdated: new Date().toISOString() } : item
    );
    saveInventory(newInventory);
  };

  const deleteInventoryItem = (id: string) => {
    const newInventory = inventory.filter(item => item.id !== id);
    saveInventory(newInventory);
  };

  const getBusinessTransactions = (businessType: 'barbershop' | 'automotive') => {
    return transactions.filter(t => t.businessType === businessType);
  };

  const getBusinessInventory = (businessType: 'barbershop' | 'automotive') => {
    return inventory.filter(item => item.businessType === businessType);
  };

  const getFinancialSummary = (businessType: 'barbershop' | 'automotive') => {
    const businessTransactions = getBusinessTransactions(businessType);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const totalIncome = businessTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = businessTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyIncome = businessTransactions
      .filter(t => {
        const transactionDate = new Date(t.date);
        return t.type === 'income' && 
               transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = businessTransactions
      .filter(t => {
        const transactionDate = new Date(t.date);
        return t.type === 'expense' && 
               transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      profit: totalIncome - totalExpenses,
      monthlyIncome,
      monthlyExpenses
    };
  };

  return (
    <FinancialContext.Provider value={{
      transactions,
      inventory,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      addInventoryItem,
      updateInventoryItem,
      deleteInventoryItem,
      getBusinessTransactions,
      getBusinessInventory,
      getFinancialSummary
    }}>
      {children}
    </FinancialContext.Provider>
  );
};