
import { useState } from 'react';
import Header from '@/components/Layout/Header';
import HeroBanner from '@/components/Homepage/HeroBanner';
import FeaturedRestaurants from '@/components/Homepage/FeaturedRestaurants';
import AuthModal from '@/components/Auth/AuthModal';
import CustomerDashboard from '@/components/Customer/CustomerDashboard';
import RestaurantDashboard from '@/components/Restaurant/RestaurantDashboard';
import AdminDashboard from '@/components/Admin/AdminDashboard';

const Index = () => {
  const [userType, setUserType] = useState<'customer' | 'restaurant' | 'admin' | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogin = (type: 'customer' | 'restaurant' | 'admin') => {
    setUserType(type);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUserType(null);
  };

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  // Render different dashboards based on user type
  if (userType === 'customer') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          userType={userType} 
          onAuthClick={handleAuthClick} 
          onLogout={handleLogout}
          cartItems={3}
        />
        <CustomerDashboard />
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
      <HeroBanner />
      <FeaturedRestaurants />
      
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
