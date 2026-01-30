// Access Context - Track paid vs free access state

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AccessContextType {
  hasPaidAccess: boolean;
  setPaidAccess: (value: boolean) => void;
}

const AccessContext = createContext<AccessContextType | null>(null);

const ACCESS_KEY = 'midnight-sun-paid-access';

export function AccessProvider({ children }: { children: ReactNode }) {
  const [hasPaidAccess, setHasPaidAccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(ACCESS_KEY);
    if (saved === 'true') {
      setHasPaidAccess(true);
    }
  }, []);

  const setPaidAccess = (value: boolean) => {
    setHasPaidAccess(value);
    localStorage.setItem(ACCESS_KEY, String(value));
  };

  return (
    <AccessContext.Provider value={{ hasPaidAccess, setPaidAccess }}>
      {children}
    </AccessContext.Provider>
  );
}

export function useAccess() {
  const context = useContext(AccessContext);
  if (!context) {
    throw new Error('useAccess must be used within AccessProvider');
  }
  return context;
}

// Helper to check if a book is free
export const FREE_BOOKS = ['Midnight Sun'];
export const PAID_BOOKS = ['Project Chimera', 'PERFECT'];

export function isBookFree(bookTitle: string): boolean {
  return FREE_BOOKS.includes(bookTitle);
}
