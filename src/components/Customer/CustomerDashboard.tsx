
import { useState } from 'react';
import { Search, Filter, Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const categories = [
  { id: 'all', name: 'All', count: 156 },
  { id: 'pizza', name: 'Pizza', count: 24 },
  { id: 'burgers', name: 'Burgers', count: 18 },
  { id: 'chinese', name: 'Chinese', count: 32 },
  { id: 'indian', name: 'Indian', count: 28 },
  { id: 'desserts', name: 'Desserts', count: 15 }
];

const foodItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, basil, and olive oil on thin crust",
    price: 18.99,
    discount: 20,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop&crop=center",
    restaurant: "Mama's Italian Kitchen",
    category: "pizza"
  },
  {
    id: 2,
    name: "Chicken Burger Deluxe",
    description: "Grilled chicken, lettuce, tomato, cheese, and special sauce",
    price: 15.99,
    discount: 0,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=300&h=200&fit=crop&crop=center",
    restaurant: "Burger Junction",
    category: "burgers"
  },
  {
    id: 3,
    name: "Chicken Tikka Masala",
    description: "Tender chicken in creamy tomato curry with basmati rice",
    price: 22.99,
    discount: 15,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop&crop=center",
    restaurant: "Spice Route Indian",
    category: "indian"
  }
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CustomerDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: typeof foodItems[0]) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, {
        id: item.id,
        name: item.name,
        price: item.discount ? item.price * (1 - item.discount / 100) : item.price,
        quantity: 1,
        image: item.image
      }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: number, change: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filter */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search for food, restaurants..."
                    className="pl-10 py-3 text-lg border-2 border-gray-200 focus:border-red-500"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2 px-6">
                  <Filter className="h-5 w-5" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Category</h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'border-2 border-gray-200 hover:border-red-500 hover:text-red-600'
                    }`}
                  >
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>
            </div>

            {/* Food Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.discount > 0 && (
                      <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600 text-white">
                        {item.discount}% OFF
                      </Badge>
                    )}
                    <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">{item.rating}</span>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                    <p className="text-sm text-gray-500 mb-3">{item.restaurant}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {item.discount > 0 && (
                          <span className="text-gray-400 line-through text-sm">${item.price}</span>
                        )}
                        <span className="text-2xl font-bold text-red-600">
                          ${item.discount ? (item.price * (1 - item.discount / 100)).toFixed(2) : item.price}
                        </span>
                      </div>
                      <Button
                        onClick={() => addToCart(item)}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          {isCartOpen && (
            <div className="lg:w-80 bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Your Cart</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(false)}>
                  <Minus className="h-4 w-4" />
                </Button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-red-600 font-bold">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold">Total:</span>
                      <span className="text-2xl font-bold text-red-600">${cartTotal.toFixed(2)}</span>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
                      Proceed to Checkout
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
