import React from 'react';
import { AdminProvider } from './contexts/AdminContext';
import { ContentProvider } from './contexts/ContentContext';
import { FinancialProvider } from './contexts/FinancialContext';
import { AutomotivePage } from './pages/AutomotivePage';
import { AdminPanel } from './components/AdminPanel';
import { LoginForm } from './components/LoginForm';
import { useAdmin } from './contexts/AdminContext';
import { Settings } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAdmin();
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <div className="relative">
      <AutomotivePage onBack={() => {}} />
      
      {/* Admin Button */}
      {!isAuthenticated && (
        <button
          onClick={() => setShowLogin(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
        >
          <Settings className="w-6 h-6" />
        </button>
      )}

      {/* Admin Panel */}
      {isAuthenticated && <AdminPanel />}

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