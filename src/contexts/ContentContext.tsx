import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BarbershopContent {
  logo: {
    image: string;
    alt: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage: string;
  };
  about: {
    title: string;
    description: string;
    image: string;
  };
  services: {
    title: string;
    items: Array<{
      name: string;
      description: string;
      price: string;
      icon: string;
    }>;
  };
  contact: {
    title: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  footer: {
    copyright: string;
  };
}

interface AutomotiveContent {
  logo: {
    image: string;
    alt: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage: string;
  };
  about: {
    title: string;
    description: string;
    image: string;
  };
  services: {
    title: string;
    items: Array<{
      name: string;
      description: string;
      price: string;
      icon: string;
    }>;
  };
  contact: {
    title: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  footer: {
    copyright: string;
  };
}

interface ContentContextType {
  barbershopContent: BarbershopContent;
  automotiveContent: AutomotiveContent;
  updateBarbershopContent: (content: Partial<BarbershopContent>) => void;
  updateAutomotiveContent: (content: Partial<AutomotiveContent>) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};

const defaultBarbershopContent: BarbershopContent = {
  logo: {
    image: "https://placehold.co/200x80?text=Logo+Barbearia",
    alt: "Logo da Barbearia"
  },
  hero: {
    title: "Barbearia Clássica",
    subtitle: "Tradição e estilo em cada corte. Venha viver a experiência de um verdadeiro gentleman.",
    ctaText: "Agendar Horário",
    backgroundImage: "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  about: {
    title: "Nossa História",
    description: "Há mais de 20 anos oferecendo os melhores serviços de barbearia, combinando técnicas tradicionais com o que há de mais moderno no mercado. Nossa equipe de profissionais qualificados está pronta para cuidar do seu visual com excelência.",
    image: "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  services: {
    title: "Nossos Serviços",
    items: [
      {
        name: "Corte Masculino",
        description: "Corte moderno com acabamento perfeito",
        price: "R$ 25,00",
        icon: "Scissors"
      },
      {
        name: "Barba Completa",
        description: "Design e cuidado completo da barba",
        price: "R$ 20,00",
        icon: "User"
      },
      {
        name: "Bigode",
        description: "Modelagem e aparação do bigode",
        price: "R$ 15,00",
        icon: "Star"
      },
      {
        name: "Pacote Completo",
        description: "Corte + Barba + Bigode",
        price: "R$ 50,00",
        icon: "Crown"
      }
    ]
  },
  contact: {
    title: "Contato",
    address: "Rua das Flores, 123 - Centro",
    phone: "(11) 99999-9999",
    email: "contato@barbearia.com",
    hours: "Seg - Sex: 8h às 18h | Sáb: 8h às 16h"
  },
  colors: {
    primary: "#8B4513",
    secondary: "#D2691E",
    accent: "#FFD700"
  },
  footer: {
    copyright: "© 2024 Barbearia Clássica. Todos os direitos reservados."
  }
};

const defaultAutomotiveContent: AutomotiveContent = {
  logo: {
    image: "https://placehold.co/200x80?text=Logo+AutoCare",
    alt: "Logo da AutoCare"
  },
  hero: {
    title: "AutoCare Premium",
    subtitle: "Estética automotiva e troca de óleo com qualidade e confiança. Seu carro merece o melhor cuidado.",
    ctaText: "Solicitar Orçamento",
    backgroundImage: "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  about: {
    title: "Sobre Nós",
    description: "Especialistas em estética automotiva e manutenção preventiva. Utilizamos produtos de primeira linha e técnicas modernas para garantir que seu veículo esteja sempre impecável e funcionando perfeitamente.",
    image: "https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  services: {
    title: "Nossos Serviços",
    items: [
      {
        name: "Lavagem Completa",
        description: "Lavagem externa e interna detalhada",
        price: "R$ 35,00",
        icon: "Car"
      },
      {
        name: "Enceramento",
        description: "Proteção e brilho duradouro",
        price: "R$ 45,00",
        icon: "Sparkles"
      },
      {
        name: "Troca de Óleo",
        description: "Óleo de motor e filtros",
        price: "R$ 80,00",
        icon: "Wrench"
      },
      {
        name: "Pacote Premium",
        description: "Todos os serviços inclusos",
        price: "R$ 140,00",
        icon: "Award"
      }
    ]
  },
  contact: {
    title: "Contato",
    address: "Av. Principal, 456 - Bairro Novo",
    phone: "(11) 88888-8888",
    email: "contato@autocare.com",
    hours: "Seg - Sex: 7h às 19h | Sáb: 7h às 17h"
  },
  colors: {
    primary: "#1E40AF",
    secondary: "#3B82F6",
    accent: "#10B981"
  },
  footer: {
    copyright: "© 2024 AutoCare Premium. Todos os direitos reservados."
  }
};

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [barbershopContent, setBarbershopContent] = useState<BarbershopContent>(defaultBarbershopContent);
  const [automotiveContent, setAutomotiveContent] = useState<AutomotiveContent>(defaultAutomotiveContent);

  useEffect(() => {
    const savedBarbershop = localStorage.getItem('barbershop_content');
    const savedAutomotive = localStorage.getItem('automotive_content');

    if (savedBarbershop) {
      setBarbershopContent(JSON.parse(savedBarbershop));
    }
    if (savedAutomotive) {
      setAutomotiveContent(JSON.parse(savedAutomotive));
    }
  }, []);

  const updateBarbershopContent = (updates: Partial<BarbershopContent>) => {
    const newContent = { ...barbershopContent, ...updates };
    setBarbershopContent(newContent);
    localStorage.setItem('barbershop_content', JSON.stringify(newContent));
  };

  const updateAutomotiveContent = (updates: Partial<AutomotiveContent>) => {
    const newContent = { ...automotiveContent, ...updates };
    setAutomotiveContent(newContent);
    localStorage.setItem('automotive_content', JSON.stringify(newContent));
  };

  return (
    <ContentContext.Provider value={{
      barbershopContent,
      automotiveContent,
      updateBarbershopContent,
      updateAutomotiveContent
    }}>
      {children}
    </ContentContext.Provider>
  );
};