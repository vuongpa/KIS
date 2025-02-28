import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [activeComponent, setActiveComponent] = useState('add'); 
  
  return (
    <SidebarContext.Provider value={{ activeComponent, setActiveComponent }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};