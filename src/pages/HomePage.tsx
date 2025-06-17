import React from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Scissors, Car, Settings } from 'lucide-react';

interface HomePageProps {
  onSelectTemplate: (template: 'barbershop' | 'automotive') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectTemplate }) => {
  const { isAuthenticated } = useAdmin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Landing Pages Profissionais
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Escolha o template perfeito para seu negócio. Designs modernos, responsivos e totalmente editáveis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div
            onClick={() => onSelectTemplate('barbershop')}
            className="group cursor-pointer bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="h-48 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Scissors className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Barbearia Clássica</h3>
              <p className="text-gray-600 mb-6">
                Design elegante e sofisticado para barbearias tradicionais. Destaque seus serviços com estilo clássico.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Template Premium</span>
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">→</span>
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={() => onSelectTemplate('automotive')}
            className="group cursor-pointer bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
              <Car className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Estética Automotiva</h3>
              <p className="text-gray-600 mb-6">
                Layout moderno e profissional para serviços automotivos. Transmita confiança e qualidade.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Template Premium</span>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isAuthenticated && (
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-6 py-3 text-white">
              <Settings className="w-5 h-5" />
              <span>Faça login para editar os templates</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};