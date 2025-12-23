import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserData } from './types';

const STORAGE_KEY = 'cff_data';

const initialData: UserData = {
  url: '',
  answers: {},
  hasPaid: false,
};

interface StoreContextType {
  data: UserData;
  updateUrl: (url: string) => void;
  updateAnswer: (key: keyof UserData['answers'], value: any) => void;
  unlockReport: () => void;
  reset: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<UserData>(initialData);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved data");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateUrl = (url: string) => {
    setData(prev => ({ ...prev, url }));
  };

  const updateAnswer = (key: keyof UserData['answers'], value: any) => {
    setData(prev => ({
      ...prev,
      answers: { ...prev.answers, [key]: value }
    }));
  };

  const unlockReport = () => {
    setData(prev => ({ ...prev, hasPaid: true }));
    // Analytics mock
    console.log('event: purchase_completed');
  };

  const reset = () => {
    setData(initialData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <StoreContext.Provider value={{ data, updateUrl, updateAnswer, unlockReport, reset }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};