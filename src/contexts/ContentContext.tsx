import React, { createContext, useContext, useState } from 'react';

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'corte' | 'barba' | 'combo' | 'tratamento';
}

interface Content {
  title: string;
  subtitle: string;
  about: string;
  hours: string;
  address: string;
  phone: string;
  whatsapp: string;
  bannerImage: string;
  services: Service[];
  contacts: {
    instagram?: string;
    facebook?: string;
    email?: string;
  };
}

interface ContentContextType {
  content: Content;
  updateContent: (newContent: Partial<Content>) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
}

const defaultContent: Content = {
  title: 'MV Barbearia',
  subtitle: 'Seu visual, nossa missão',
  about: 'Somos uma barbearia moderna que combina técnicas tradicionais com as últimas tendências em cortes masculinos.',
  hours: 'Segunda - Sexta 9h às 19h | Sáb: 8h às 14h',
  address: 'Rua Lauro Linhares 1060, Trindade',
  phone: '(48) 99140-1012',
  whatsapp: '(48) 99140-1012',
  bannerImage: '/images/bannerbarbearia.png',
  services: [
    {
      id: '1',
      name: 'Corte Degradê',
      description: 'Corte moderno com técnica de degradê',
      price: 'R$ 35,00',
      category: 'corte'
    },
    {
      id: '2',
      name: 'Barba Tradicional',
      description: 'Barba feita com navalha e produtos especiais',
      price: 'R$ 25,00',
      category: 'barba'
    },
    {
      id: '3',
      name: 'Combo Corte + Barba',
      description: 'Corte de cabelo + barba tradicional',
      price: 'R$ 55,00',
      category: 'combo'
    },
    {
      id: '4',
      name: 'Hidratação Capilar',
      description: 'Tratamento completo para cabelos',
      price: 'R$ 40,00',
      category: 'tratamento'
    }
  ],
  contacts: {
    instagram: '@mvbarbearia',
    facebook: 'MVBarbearia',
    email: 'mvcontato@gmail.com'
  }
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Content>(defaultContent);

  const updateContent = (newContent: Partial<Content>) => {
    setContent(current => ({
      ...current,
      ...newContent
    }));
  };

  const addService = (service: Omit<Service, 'id'>) => {
    const newService = {
      ...service,
      id: Date.now().toString()
    };
    setContent(current => ({
      ...current,
      services: [...current.services, newService]
    }));
  };

  const updateService = (id: string, serviceUpdate: Partial<Service>) => {
    setContent(current => ({
      ...current,
      services: current.services.map(service =>
        service.id === id ? { ...service, ...serviceUpdate } : service
      )
    }));
  };

  const deleteService = (id: string) => {
    setContent(current => ({
      ...current,
      services: current.services.filter(service => service.id !== id)
    }));
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent,
      addService,
      updateService,
      deleteService
    }}>
      {children}
    </ContentContext.Provider>
  );
};