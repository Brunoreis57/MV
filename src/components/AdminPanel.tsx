import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { useContent } from '../contexts/ContentContext';
import { ColorPicker } from './ColorPicker';
import { FinancialDashboard } from './FinancialDashboard';
import { LogOut, Edit, Palette, Save, DollarSign } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { logout, isEditMode, toggleEditMode } = useAdmin();
  const { barbershopContent, automotiveContent, updateBarbershopContent, updateAutomotiveContent } = useContent();
  const [activeTab, setActiveTab] = useState<'barbershop' | 'automotive'>('barbershop');
  const [activeSection, setActiveSection] = useState<'design' | 'financial'>('design');

  const handleBarbershopColorChange = (colorType: 'primary' | 'secondary' | 'accent', color: string) => {
    updateBarbershopContent({
      colors: {
        ...barbershopContent.colors,
        [colorType]: color
      }
    });
  };

  const handleAutomotiveColorChange = (colorType: 'primary' | 'secondary' | 'accent', color: string) => {
    updateAutomotiveContent({
      colors: {
        ...automotiveContent.colors,
        [colorType]: color
      }
    });
  };

  const currentColors = activeTab === 'barbershop' ? barbershopContent.colors : automotiveContent.colors;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Painel Admin</h3>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>

        {/* Business Type Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('barbershop')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'barbershop'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Barbearia
          </button>
          <button
            onClick={() => setActiveTab('automotive')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'automotive'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Automotiva
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveSection('design')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === 'design'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Palette className="w-4 h-4" />
            Design
          </button>
          <button
            onClick={() => setActiveSection('financial')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === 'financial'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Financeiro
          </button>
        </div>

        {activeSection === 'design' && (
          <div className="space-y-4">
            <button
              onClick={toggleEditMode}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isEditMode
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isEditMode ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              {isEditMode ? 'Modo Edição Ativo' : 'Ativar Edição'}
            </button>

            <div className="border-t pt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Palette className="w-4 h-4" />
                  Cores do Tema
                </div>
                
                {activeTab === 'barbershop' ? (
                  <div className="space-y-2">
                    <ColorPicker
                      color={barbershopContent.colors.primary}
                      onChange={(color) => handleBarbershopColorChange('primary', color)}
                      label="Primária"
                    />
                    <ColorPicker
                      color={barbershopContent.colors.secondary}
                      onChange={(color) => handleBarbershopColorChange('secondary', color)}
                      label="Secundária"
                    />
                    <ColorPicker
                      color={barbershopContent.colors.accent}
                      onChange={(color) => handleBarbershopColorChange('accent', color)}
                      label="Destaque"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <ColorPicker
                      color={automotiveContent.colors.primary}
                      onChange={(color) => handleAutomotiveColorChange('primary', color)}
                      label="Primária"
                    />
                    <ColorPicker
                      color={automotiveContent.colors.secondary}
                      onChange={(color) => handleAutomotiveColorChange('secondary', color)}
                      label="Secundária"
                    />
                    <ColorPicker
                      color={automotiveContent.colors.accent}
                      onChange={(color) => handleAutomotiveColorChange('accent', color)}
                      label="Destaque"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'financial' && (
          <div className="max-h-96 overflow-y-auto">
            <FinancialDashboard 
              businessType={activeTab}
              colors={currentColors}
            />
          </div>
        )}
      </div>
    </div>
  );
};