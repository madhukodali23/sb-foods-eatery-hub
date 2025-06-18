
import { Search, ShoppingCart, User, Menu, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  userType?: 'customer' | 'restaurant' | 'admin' | null;
  onAuthClick: () => void;
  onLogout: () => void;
  cartItems?: number;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onOrdersClick?: () => void;
  onProfileClick?: () => void;
}

const Header = ({ 
  userType, 
  onAuthClick, 
  onLogout, 
  cartItems = 0, 
  onSearch,
  onCartClick,
  onOrdersClick,
  onProfileClick
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Live search - trigger search on every keystroke
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg border-b-4 border-red-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              SB Foods
            </button>
          </div>

          {/* Search Bar for Customer */}
          {userType === 'customer' && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearchSubmit} className="w-full relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for food..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 w-full"
                />
              </form>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {!userType && (
              <>
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('restaurants')}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  Restaurants
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  About
                </button>
              </>
            )}
            
            {userType === 'customer' && (
              <>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  Browse Food
                </button>
                <button 
                  onClick={onOrdersClick}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  Orders
                </button>
                <button 
                  onClick={onCartClick}
                  className="relative text-gray-700 hover:text-red-600 transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems}
                    </span>
                  )}
                </button>
              </>
            )}

            {userType === 'restaurant' && (
              <>
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                  Menu Management
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                  Orders
                </a>
                <button 
                  onClick={onProfileClick}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  Profile
                </button>
              </>
            )}

            {userType === 'admin' && (
              <>
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                  Users
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                  Restaurants
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                  Orders
                </a>
              </>
            )}

            {userType ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={onProfileClick}
                  className="h-8 w-8 text-gray-700 bg-gray-100 rounded-full p-1 hover:bg-gray-200 transition-colors"
                >
                  <User className="h-6 w-6" />
                </button>
                <Button onClick={onLogout} variant="outline" size="sm" className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Button onClick={onAuthClick} className="bg-red-600 hover:bg-red-700 text-white">
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {/* Mobile Search */}
            {userType === 'customer' && (
              <div className="mb-4">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search for food..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-10 w-full"
                  />
                </form>
              </div>
            )}
            
            <div className="space-y-2">
              {!userType && (
                <>
                  <button 
                    onClick={() => scrollToSection('hero')}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => scrollToSection('restaurants')}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg"
                  >
                    Restaurants
                  </button>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg"
                  >
                    About
                  </button>
                  <Button onClick={onAuthClick} className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white">
                    Sign In
                  </Button>
                </>
              )}
              
              {userType === 'customer' && (
                <>
                  <button 
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg"
                  >
                    Browse Food
                  </button>
                  <button 
                    onClick={() => {
                      onOrdersClick?.();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg"
                  >
                    Orders
                  </button>
                  <button 
                    onClick={() => {
                      onCartClick?.();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg"
                  >
                    Cart
                  </button>
                  <button 
                    onClick={() => {
                      onProfileClick?.();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg"
                  >
                    Profile
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
