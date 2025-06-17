import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { useContent } from '../contexts/ContentContext';
import { X, Save, Edit2, Image, Phone, Clock, MapPin, Plus, Trash2, Facebook, Instagram, Mail, Scissors } from 'lucide-react';

interface EditSectionProps {
  title: string;
  content: string;
  onSave: (content: string) => void;
}

const EditSection: React.FC<EditSectionProps> = ({ title, content, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    onSave(editedContent);
    setIsEditing(false);
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-700"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        ) : (
          <div className="space-x-2">
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-700"
            >
              <Save className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedContent(content);
              }}
              className="text-red-600 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full h-32 p-2 border rounded"
        />
      ) : (
        <p className="text-gray-700">{content}</p>
      )}
    </div>
  );
};

interface ServiceFormProps {
  onSubmit: (service: { name: string; description: string; price: string; category: 'corte' | 'barba' | 'combo' | 'tratamento' }) => void;
  initialValues?: {
    name: string;
    description: string;
    price: string;
    category: 'corte' | 'barba' | 'combo' | 'tratamento';
  };
  onCancel?: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit, initialValues, onCancel }) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [price, setPrice] = useState(initialValues?.price || '');
  const [category, setCategory] = useState<'corte' | 'barba' | 'combo' | 'tratamento'>(initialValues?.category || 'corte');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, price, category });
    if (!initialValues) {
      setName('');
      setDescription('');
      setPrice('');
      setCategory('corte');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Serviço</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded h-24"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as 'corte' | 'barba' | 'combo' | 'tratamento')}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="corte">Corte</option>
          <option value="barba">Barba</option>
          <option value="combo">Combo</option>
          <option value="tratamento">Tratamento</option>
        </select>
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-700"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {initialValues ? 'Atualizar' : 'Adicionar'} Serviço
        </button>
      </div>
    </form>
  );
};

export const AdminPanel: React.FC = () => {
  const { logout } = useAdmin();
  const { content, updateContent, addService, updateService, deleteService } = useContent();
  const [activeTab, setActiveTab] = useState<'content' | 'services' | 'images' | 'contact'>('content');
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [showAddService, setShowAddService] = useState(false);

  const tabs = [
    { id: 'content' as const, label: 'Conteúdo', icon: Edit2 },
    { id: 'services' as const, label: 'Serviços', icon: Scissors },
    { id: 'images' as const, label: 'Imagens', icon: Image },
    { id: 'contact' as const, label: 'Contato', icon: Phone },
  ];

  const getCategoryLabel = (category: string) => {
    const labels = {
      corte: 'Corte',
      barba: 'Barba',
      combo: 'Combo',
      tratamento: 'Tratamento'
    };
    return labels[category as keyof typeof labels] || category;
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-white shadow-lg z-40 overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-800">Painel Administrativo</h2>
          <button
            onClick={logout}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Sair
          </button>
        </div>

        <div className="flex border-b mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'content' && (
          <div className="space-y-6">
            <EditSection
              title="Título Principal"
              content={content.title}
              onSave={(newContent) => updateContent({ title: newContent })}
            />
            <EditSection
              title="Subtítulo"
              content={content.subtitle}
              onSave={(newContent) => updateContent({ subtitle: newContent })}
            />
            <EditSection
              title="Sobre Nós"
              content={content.about}
              onSave={(newContent) => updateContent({ about: newContent })}
            />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-6">
            {showAddService ? (
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Adicionar Novo Serviço</h3>
                <ServiceForm
                  onSubmit={(service) => {
                    addService(service);
                    setShowAddService(false);
                  }}
                  onCancel={() => setShowAddService(false)}
                />
              </div>
            ) : (
              <button
                onClick={() => setShowAddService(true)}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar Serviço
              </button>
            )}

            <div className="space-y-4">
              {content.services.map((service) => (
                <div key={service.id} className="border rounded-lg p-4">
                  {editingServiceId === service.id ? (
                    <ServiceForm
                      initialValues={service}
                      onSubmit={(updatedService) => {
                        updateService(service.id, updatedService);
                        setEditingServiceId(null);
                      }}
                      onCancel={() => setEditingServiceId(null)}
                    />
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-medium">{service.name}</h3>
                          <p className="text-gray-600">{service.description}</p>
                          <p className="text-blue-600 font-medium mt-1">{service.price}</p>
                          <span className="inline-block px-2 py-1 text-sm rounded bg-gray-100 text-gray-700 mt-2">
                            {getCategoryLabel(service.category)}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingServiceId(service.id)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteService(service.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 mr-2 text-gray-600" />
              <h3 className="text-lg font-medium">Horário de Funcionamento</h3>
            </div>
            <EditSection
              title="Horários"
              content={content.hours}
              onSave={(newContent) => updateContent({ hours: newContent })}
            />

            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 mr-2 text-gray-600" />
              <h3 className="text-lg font-medium">Endereço e Contato</h3>
            </div>
            <EditSection
              title="Endereço"
              content={content.address}
              onSave={(newContent) => updateContent({ address: newContent })}
            />
            <EditSection
              title="Telefone"
              content={content.phone}
              onSave={(newContent) => updateContent({ phone: newContent })}
            />
            <EditSection
              title="WhatsApp"
              content={content.whatsapp}
              onSave={(newContent) => updateContent({ whatsapp: newContent })}
            />

            <div className="flex items-center mb-4">
              <Mail className="w-5 h-5 mr-2 text-gray-600" />
              <h3 className="text-lg font-medium">Redes Sociais</h3>
            </div>
            <EditSection
              title="E-mail"
              content={content.contacts.email || ''}
              onSave={(newContent) => updateContent({ 
                contacts: { ...content.contacts, email: newContent } 
              })}
            />
            <EditSection
              title="Instagram"
              content={content.contacts.instagram || ''}
              onSave={(newContent) => updateContent({ 
                contacts: { ...content.contacts, instagram: newContent } 
              })}
            />
            <EditSection
              title="Facebook"
              content={content.contacts.facebook || ''}
              onSave={(newContent) => updateContent({ 
                contacts: { ...content.contacts, facebook: newContent } 
              })}
            />
          </div>
        )}

        {activeTab === 'images' && (
          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Banner Principal</h3>
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <img
                  src={content.bannerImage}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      updateContent({
                        bannerImage: reader.result as string,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};