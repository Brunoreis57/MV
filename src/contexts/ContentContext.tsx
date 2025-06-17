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
    image: "/images/logo.png.png",
    alt: "Logo MV Barbearia"
  },
  hero: {
    title: "MV Barbearia",
    subtitle: "Seu visual, nossa missão",
    ctaText: "Agendar Horário",
    backgroundImage: "/images/bannerbarbearia.png"
  },
  about: {
    title: "Nossa História",
    description: "Somos uma barbearia nova, criada para quem valoriza estilo, cuidado e atitude. Unimos tradição e modernidade em um ambiente pensado pra você se sentir em casa. Aqui, cada corte e cada barba são feitos com excelência, atenção e paixão pelo que fazemos.\n\nSeu estilo, nossa missão.",
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
    address: "Rua Lauro Linhares 1060, Trindade",
    phone: "(48) 99140-1012",
    email: "mvcontato@gmail.com",
    hours: "Segunda - Sexta 9h às 19h | Sáb: 8h às 14h"
  },
  colors: {
    primary: "#1E40AF",
    secondary: "#3B82F6",
    accent: "#10B981"
  },
  footer: {
    copyright: "© MV Center"
  }
};

const defaultAutomotiveContent: AutomotiveContent = {
  logo: {
    image: "/images/logo.png.png",
    alt: "Logo MV Estética Automotiva"
  },
  hero: {
    title: "Serviços Automotivos de Excelência",
    subtitle: "Cuidamos do seu veículo com a mesma paixão que você tem por ele",
    ctaText: "Agendar Serviço",
    backgroundImage: "/images/bannerestetica.jpeg"
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
        description: "Lavagem externa e interna detalhada, com produtos premium e cuidado especial",
        price: "R$ 35,00",
        icon: "Car"
      },
      {
        name: "Polimento e Cristalização",
        description: "Proteção e brilho duradouro para a pintura do seu veículo",
        price: "R$ 45,00",
        icon: "Sparkles"
      },
      {
        name: "Troca de Óleo",
        description: "Troca de óleo do motor e filtros, usando produtos de primeira linha",
        price: "R$ 80,00",
        icon: "Wrench"
      },
      {
        name: "Revisão Completa",
        description: "Checagem geral do veículo e manutenção preventiva",
        price: "R$ 140,00",
        icon: "Award"
      }
    ]
  },
  contact: {
    title: "Contato",
    address: "Rua Lauro Linhares 1060, Trindade",
    phone: "(48) 99215-1013",
    email: "mvcontato@gmail.com",
    hours: "Segunda a Sexta: 9h às 18h | Sábado: 9h às 14h"
  },
  colors: {
    primary: "#1E40AF",
    secondary: "#3B82F6",
    accent: "#10B981"
  },
  footer: {
    copyright: "© MV Center"
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