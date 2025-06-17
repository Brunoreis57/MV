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
          <AppContent />
        </FinancialProvider>
      </ContentProvider>
    </AdminProvider>
  );
}

export default App;