import React, { useState } from 'react';
import { AdminProvider } from './contexts/AdminContext';
import { ContentProvider } from './contexts/ContentContext';
import { FinancialProvider } from './contexts/FinancialContext';
import { useAdmin } from './contexts/AdminContext';
import { HomePage } from './pages/HomePage';
import { BarbershopPage } from './pages/BarbershopPage';
import { AutomotivePage } from './pages/AutomotivePage';
import { AdminPanel } from './components/AdminPanel';
import { LoginForm } from './components/LoginForm';
import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

type PageType = 'home' | 'barbershop' | 'automotive';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated } = useAdmin();

  const handleSelectTemplate = (template: 'barbershop' | 'automotive') => {
    setCurrentPage(template);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'barbershop':
        return <BarbershopPage onBack={handleBackToHome} />;
      case 'automotive':
        return <AutomotivePage onBack={handleBackToHome} />;
      default:
        return <HomePage onSelectTemplate={handleSelectTemplate} />;
    }
  };

  return (
    <div className="relative">
      {renderPage()}
      
      {/* Admin Button */}
      {currentPage !== 'home' && !isAuthenticated && (
        <button
          onClick={() => setShowLogin(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
        >
          <Settings className="w-6 h-6" />
        </button>
      )}

      {/* Admin Panel */}
      {isAuthenticated && currentPage !== 'home' && <AdminPanel />}

      {/* Login Form */}
      {showLogin && !isAuthenticated && (
        <LoginForm />
      )}
    </div>
  );
};

function App() {
  return (
    <AdminProvider>
      <ContentProvider>
        <FinancialProvider>
          <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-4xl font-bold text-center mb-8">MV Center</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Card da Barbearia */}
                <Link to="/barbearia" className="block">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <img src="/images/bannerbarbearia.png" alt="MV Barbearia" className="w-full h-48 object-cover"/>
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-2">MV Barbearia</h2>
                      <p className="text-gray-600">Seu visual, nossa missão</p>
                    </div>
                  </div>
                </Link>

                {/* Card da Estética Automotiva */}
                <Link to="/estetica" className="block">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <img src="/images/bannerestetica.jpeg" alt="MV Estética Automotiva" className="w-full h-48 object-cover"/>
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-2">MV Estética Automotiva</h2>
                      <p className="text-gray-600">Excelência em cuidados automotivos</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <footer className="text-center py-4 mt-8">
              <p>© MV Center</p>
            </footer>
          </div>
        </FinancialProvider>
      </ContentProvider>
    </AdminProvider>
  );
}

export default App;