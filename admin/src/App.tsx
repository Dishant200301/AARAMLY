import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductCreatePage } from './pages/ProductCreatePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AttributesPage } from './pages/AttributesPage';
import { ProductVariantsPage } from './pages/ProductVariantsPage';
import { InventoryPage } from './pages/InventoryPage';
import { OrdersPage } from './pages/OrdersPage';
import { ContentPages } from './pages/ContentPages';
import { SettingsPage } from './pages/SettingsPage';
import { SizeGuidesPage } from './pages/SizeGuidesPage';
import { ContactMessagesPage } from './pages/ContactMessagesPage';
import { FilterManagementPage } from './pages/FilterManagementPage';

function AdminMainContent() {
  const { isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingProductId, setEditingProductId] = useState<string | undefined>(undefined);

  const handleNavigate = (tab: string, productId?: string) => {
    setActiveTab(tab);
    setEditingProductId(productId || undefined);
  };

  if (!isAuthenticated) {
    if (authView === 'signup') {
      return (
        <SignupPage 
          onNavigateToLogin={() => setAuthView('login')}
          onSignupSuccess={() => handleNavigate('dashboard')}
        />
      );
    }
    return (
      <LoginPage 
        onNavigateToSignup={() => setAuthView('signup')}
        onLoginSuccess={() => handleNavigate('dashboard')}
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'all-products':
      case 'products':
      case 'product-details':
        return <ProductsPage onNavigate={handleNavigate} />;
      case 'add-product':
        return <ProductCreatePage onNavigate={handleNavigate} editingProductId={editingProductId} />;
      case 'categories':
      case 'brands':
        return <CategoriesPage />;
      case 'attributes':
        return <AttributesPage />;
      case 'filters':
        return <FilterManagementPage />;
      case 'variants':
        return <ProductVariantsPage onNavigate={handleNavigate} />;
      case 'inventory':
        return <InventoryPage />;
      case 'all-size-guides':
      case 'size-guides':
        return <SizeGuidesPage initialSubTab="all-guides" />;
      case 'add-size-guide':
      case 'edit-size-guide':
        return <SizeGuidesPage initialSubTab="add-guide" />;
      case 'size-guide-templates':
        return <SizeGuidesPage initialSubTab="templates" />;
      case 'orders':
        return <OrdersPage />;
      case 'hero-slider':
        return <ContentPages initialSubTab="hero-slider" />;
      case 'homepage-banners':
        return <ContentPages initialSubTab="homepage-banners" />;
      case 'content-pages':
        return <ContentPages initialSubTab="content-pages" />;
      case 'content-blog':
        return <ContentPages initialSubTab="content-blog" />;
      case 'content-faq':
        return <ContentPages initialSubTab="content-faq" />;
      case 'settings':
        return <SettingsPage />;
      case 'contact-messages':
        return <ContactMessagesPage />;
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex font-sans selection:bg-black selection:text-white">
      {/* White Expandable Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onNavigate={handleNavigate} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <Header title={activeTab.replace('-', ' ')} />
        <main className="p-8 overflow-y-auto flex-1 bg-white">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AdminMainContent />
    </AuthProvider>
  );
}

export default App;
