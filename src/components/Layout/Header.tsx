
import { Search, ShoppingCart, User, Menu, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  userType?: 'customer' | 'restaurant' | 'admin' | null;
  onAuthClick: () => void;
  onLogout: () => void;
  cartItems?: number;
}

const Header = ({ userType, onAuthClick, onLogout, cartItems = 0 }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b-4 border-red-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              SB Foods
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {!userType && (
              <>
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                  Home
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                  Restaurants
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                  About
                </a>
              </>
            )}
            
            {userType === 'customer' && (
              <>
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                  Browse Food
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                  Orders
                </a>
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-red-600 cursor-pointer transition-colors" />
                  {cartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems}
                    </span>
                  )}
                </div>
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
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                  Profile
                </a>
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
                <User className="h-8 w-8 text-gray-700 bg-gray-100 rounded-full p-1" />
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
            <div className="space-y-2">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg">
                Home
              </a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg">
                Restaurants
              </a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg">
                About
              </a>
              {!userType && (
                <Button onClick={onAuthClick} className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white">
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
