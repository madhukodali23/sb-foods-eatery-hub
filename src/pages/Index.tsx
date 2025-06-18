
import { useState } from 'react';
import Header from '@/components/Layout/Header';
import HeroBanner from '@/components/Homepage/HeroBanner';
import FeaturedRestaurants from '@/components/Homepage/FeaturedRestaurants';
import AboutSection from '@/components/Homepage/AboutSection';
import AuthModal from '@/components/Auth/AuthModal';
import CustomerDashboard from '@/components/Customer/CustomerDashboard';
import RestaurantDashboard from '@/components/Restaurant/RestaurantDashboard';
import AdminDashboard from '@/components/Admin/AdminDashboard';

const Index = () => {
  const [userType, setUserType] = useState<'customer' | 'restaurant' | 'admin' | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dashboardView, setDashboardView] = useState<'browse' | 'orders' | 'profile'>('browse');
  const [cartItems, setCartItems] = useState(3); // Initial cart count

  const handleLogin = (type: 'customer' | 'restaurant' | 'admin') => {
    setUserType(type);
    setIsAuthModalOpen(false);
    // Reset to browse view when logging in
    setDashboardView('browse');
  };

  const handleLogout = () => {
    setUserType(null);
    setSearchQuery('');
    setDashboardView('browse');
  };

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Ensure we're on browse view when searching
    if (userType === 'customer') {
      setDashboardView('browse');
    }
  };

  const handleCartClick = () => {
    console.log('Cart clicked');
    setDashboardView('browse'); // Show cart in browse view
  };

  const handleOrdersClick = () => {
    console.log('Orders clicked');
    setDashboardView('orders');
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
    setDashboardView('profile');
  };

  const handleBrowseFoodClick = () => {
    console.log('Browse Food clicked');
    setDashboardView('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemAddedToCart = () => {
    setCartItems(prev => prev + 1);
  };

  // Render different dashboards based on user type
  if (userType === 'customer') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          userType={userType} 
          onAuthClick={handleAuthClick} 
          onLogout={handleLogout}
          cartItems={cartItems}
          onSearch={handleSearch}
          onCartClick={handleCartClick}
          onOrdersClick={handleOrdersClick}
          onProfileClick={handleProfileClick}
          onBrowseFoodClick={handleBrowseFoodClick}
        />
        <CustomerDashboard 
          searchQuery={searchQuery}
          onCartToggle={handleCartClick}
          onOrdersClick={handleOrdersClick}
          onProfileClick={handleProfileClick}
          currentView={dashboardView}
          onItemAddedToCart={handleItemAddedToCart}
        />
      </div>
    );
  }

  if (userType === 'restaurant') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          userType={userType} 
          onAuthClick={handleAuthClick} 
          onLogout={handleLogout}
          onProfileClick={handleProfileClick}
        />
        <RestaurantDashboard />
      </div>
    );
  }

  if (userType === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          userType={userType} 
          onAuthClick={handleAuthClick} 
          onLogout={handleLogout}
          onProfileClick={handleProfileClick}
        />
        <AdminDashboard />
      </div>
    );
  }

  // Default homepage for non-authenticated users
  return (
    <div className="min-h-screen bg-white">
      <Header 
        userType={userType} 
        onAuthClick={handleAuthClick} 
        onLogout={handleLogout}
      />
      <div id="hero">
        <HeroBanner />
      </div>
      <div id="restaurants">
        <FeaturedRestaurants />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
                SB Foods
              </h3>
              <p className="text-gray-400">
                Connecting you with the best restaurants and freshest food in your area.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partner with Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <div className="text-gray-400 space-y-2">
                <p>📧 support@sbfoods.com</p>
                <p>📞 (555) 123-FOOD</p>
                <p>📍 123 Food Street, City, State</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SB Foods. All rights reserved. Made with ❤️ for food lovers.</p>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Index;
