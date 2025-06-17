import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { EditableText } from '../components/EditableText';
import { EditableImage } from '../components/EditableImage';
import { Home, Phone, Mail, Clock, MapPin } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface BarbershopPageProps {
  onBack: () => void;
}

export const BarbershopPage: React.FC<BarbershopPageProps> = ({ onBack }) => {
  const { barbershopContent, updateBarbershopContent } = useContent();

  const updateHero = (field: string, value: string) => {
    updateBarbershopContent({
      hero: { ...barbershopContent.hero, [field]: value }
    });
  };

  const updateAbout = (field: string, value: string) => {
    updateBarbershopContent({
      about: { ...barbershopContent.about, [field]: value }
    });
  };

  const updateServices = (field: string, value: any) => {
    updateBarbershopContent({
      services: { ...barbershopContent.services, [field]: value }
    });
  };

  const updateContact = (field: string, value: string) => {
    updateBarbershopContent({
      contact: { ...barbershopContent.contact, [field]: value }
    });
  };

  const updateFooter = (field: string, value: string) => {
    updateBarbershopContent({
      footer: { ...barbershopContent.footer, [field]: value }
    });
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="w-8 h-8" /> : <LucideIcons.Star className="w-8 h-8" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="w-5 h-5" />
              Voltar ao Início
            </button>
            <EditableImage
              src={barbershopContent.logo.image}
              alt={barbershopContent.logo.alt}
              onChange={(value) => updateBarbershopContent({ logo: { ...barbershopContent.logo, image: value } })}
              className="h-12 w-auto"
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${barbershopContent.hero.backgroundImage})` 
        }}
      >
        <EditableImage
          src={barbershopContent.hero.backgroundImage}
          alt="Imagem de fundo"
          onChange={(value) => updateHero('backgroundImage', value)}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 text-center text-white px-4">
          <EditableImage
            src={barbershopContent.logo.image}
            alt={barbershopContent.logo.alt}
            onChange={(value) => updateBarbershopContent({ logo: { ...barbershopContent.logo, image: value } })}
            className="mx-auto mb-8 w-48 h-auto"
          />
          <EditableText
            value={barbershopContent.hero.title}
            onChange={(value) => updateHero('title', value)}
            className="text-6xl font-bold mb-6"
            placeholder="Título Principal"
          />
          <EditableText
            value={barbershopContent.hero.subtitle}
            onChange={(value) => updateHero('subtitle', value)}
            className="text-xl mb-8 max-w-2xl mx-auto"
            placeholder="Subtítulo"
            multiline
          />
          <button 
            className="inline-block px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            style={{ backgroundColor: barbershopContent.colors.primary }}
          >
            <a 
              href="https://wa.me/5548991401012?text=Olá,%20gostaria%20de%20agendar%20um%20horário"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <EditableText
                value={barbershopContent.hero.ctaText}
                onChange={(value) => updateHero('ctaText', value)}
                className="text-white"
                placeholder="Botão CTA"
              />
            </a>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText
                value={barbershopContent.about.title}
                onChange={(value) => updateAbout('title', value)}
                className={`text-4xl font-bold mb-6 text-[${barbershopContent.colors.primary}]`}
                placeholder="Título da Seção"
              />
              <EditableText
                value={barbershopContent.about.description}
                onChange={(value) => updateAbout('description', value)}
                className="text-gray-600 text-lg leading-relaxed"
                placeholder="Descrição sobre a empresa"
                multiline
              />
            </div>
            <div>
              <EditableImage
                src={barbershopContent.about.image}
                alt="Sobre nós"
                onChange={(value) => updateAbout('image', value)}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20" style={{ backgroundColor: `${barbershopContent.colors.primary}0F` }}>
        <div className="container mx-auto px-4">
          <EditableText
            value={barbershopContent.services.title}
            onChange={(value) => updateServices('title', value)}
            className={`text-4xl font-bold text-center mb-16 text-[${barbershopContent.colors.primary}]`}
            placeholder="Título dos Serviços"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {barbershopContent.services.items.map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-center mb-4" style={{ color: barbershopContent.colors.secondary }}>
                  {getIcon(service.icon)}
                </div>
                <EditableText
                  value={service.name}
                  onChange={(value) => updateServices(`items.${index}.name`, value)}
                  className="text-xl font-bold mb-3 text-center"
                  placeholder="Nome do Serviço"
                />
                <EditableText
                  value={service.description}
                  onChange={(value) => updateServices(`items.${index}.description`, value)}
                  className="text-gray-600 text-center mb-4"
                  placeholder="Descrição do Serviço"
                  multiline
                />
                <div className="text-2xl font-bold text-center" style={{ color: barbershopContent.colors.accent }}>
                  <EditableText
                    value={service.price}
                    onChange={(value) => updateServices(`items.${index}.price`, value)}
                    className="text-inherit"
                    placeholder="Preço"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <EditableText
            value={barbershopContent.contact.title}
            onChange={(value) => updateContact('title', value)}
            className={`text-4xl font-bold text-center mb-16 text-[${barbershopContent.colors.primary}]`}
            placeholder="Título do Contato"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: barbershopContent.colors.secondary }}>
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Endereço</h4>
              <EditableText
                value={barbershopContent.contact.address}
                onChange={(value) => updateContact('address', value)}
                className="text-gray-600"
                placeholder="Endereço"
              />
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: barbershopContent.colors.secondary }}>
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Telefone</h4>
              <EditableText
                value={barbershopContent.contact.phone}
                onChange={(value) => updateContact('phone', value)}
                className="text-gray-600"
                placeholder="Telefone"
              />
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: barbershopContent.colors.secondary }}>
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Email</h4>
              <EditableText
                value={barbershopContent.contact.email}
                onChange={(value) => updateContact('email', value)}
                className="text-gray-600"
                placeholder="Email"
              />
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: barbershopContent.colors.secondary }}>
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Horário</h4>
              <EditableText
                value={barbershopContent.contact.hours}
                onChange={(value) => updateContact('hours', value)}
                className="text-gray-600"
                placeholder="Horário de funcionamento"
                multiline
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-white" style={{ backgroundColor: barbershopContent.colors.primary }}>
        <EditableText
          value="© 2024 Barbearia Clássica. Todos os direitos reservados."
          onChange={(value) => updateFooter('copyright', value)}
          className="text-white"
          placeholder="Texto de Copyright"
        />
      </footer>
    </div>
  );
};