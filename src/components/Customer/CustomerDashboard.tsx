import { useState, useEffect } from 'react';
import { Search, Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FiltersDialog, { FilterOptions } from './FiltersDialog';
import OrdersModal from './OrdersModal';
import ProfileModal from './ProfileModal';

const categories = [
  { id: 'all', name: 'All', count: 38 },
  { id: 'pizza', name: 'Pizza', count: 6 },
  { id: 'burgers', name: 'Burgers', count: 5 },
  { id: 'chinese', name: 'Chinese', count: 4 },
  { id: 'indian', name: 'Indian', count: 5 },
  { id: 'desserts', name: 'Desserts', count: 6 },
  { id: 'pasta', name: 'Pasta', count: 4 },
  { id: 'japanese', name: 'Japanese', count: 4 },
  { id: 'mexican', name: 'Mexican', count: 4 }
];

const foodItems = [
  // Pizza Items
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, basil, and olive oil on thin crust",
    price: 18.99,
    discount: 20,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&h=400&fit=crop",
    restaurant: "Mama's Italian Kitchen",
    category: "pizza"
  },
  {
    id: 2,
    name: "Pepperoni Supreme",
    description: "Classic pepperoni with extra cheese and Italian herbs",
    price: 21.99,
    discount: 15,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=400&fit=crop",
    restaurant: "Tony's Pizza Palace",
    category: "pizza"
  },
  {
    id: 3,
    name: "BBQ Chicken Pizza",
    description: "Grilled chicken, BBQ sauce, red onions, and cilantro",
    price: 23.99,
    discount: 0,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop",
    restaurant: "Pizza Express",
    category: "pizza"
  },
  {
    id: 4,
    name: "Veggie Delight",
    description: "Bell peppers, mushrooms, olives, tomatoes, and onions",
    price: 19.99,
    discount: 10,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop",
    restaurant: "Green Garden Pizza",
    category: "pizza"
  },
  {
    id: 5,
    name: "Meat Lovers",
    description: "Pepperoni, sausage, bacon, and ham with extra cheese",
    price: 26.99,
    discount: 5,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500&h=400&fit=crop",
    restaurant: "Carnivore's Choice",
    category: "pizza"
  },
  {
    id: 6,
    name: "Hawaiian Paradise",
    description: "Ham, pineapple, and mozzarella on tomato base",
    price: 20.99,
    discount: 0,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&h=400&fit=crop",
    restaurant: "Island Pizza Co.",
    category: "pizza"
  },

  // Burger Items
  {
    id: 7,
    name: "Classic Cheeseburger",
    description: "Beef patty, cheese, lettuce, tomato, pickles, and special sauce",
    price: 15.99,
    discount: 0,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop",
    restaurant: "Burger Junction",
    category: "burgers"
  },
  {
    id: 8,
    name: "Bacon BBQ Burger",
    description: "Double beef patty with crispy bacon and BBQ sauce",
    price: 18.99,
    discount: 15,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?w=500&h=400&fit=crop",
    restaurant: "Smoky Grill",
    category: "burgers"
  },
  {
    id: 9,
    name: "Veggie Burger",
    description: "Plant-based patty with avocado, sprouts, and herb mayo",
    price: 14.99,
    discount: 10,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1525059696034-4967a729002e?w=500&h=400&fit=crop",
    restaurant: "Green Bites",
    category: "burgers"
  },
  {
    id: 10,
    name: "Chicken Deluxe",
    description: "Grilled chicken breast with Swiss cheese and mushrooms",
    price: 16.99,
    discount: 0,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1606755962773-d324e2d53352?w=500&h=400&fit=crop",
    restaurant: "Chicken Palace",
    category: "burgers"
  },
  {
    id: 11,
    name: "Fish Burger",
    description: "Crispy fish fillet with tartar sauce and lettuce",
    price: 17.99,
    discount: 5,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=400&fit=crop",
    restaurant: "Ocean View",
    category: "burgers"
  },

  // Indian Items
  {
    id: 12,
    name: "Chicken Tikka Masala",
    description: "Tender chicken in creamy tomato curry with basmati rice",
    price: 22.99,
    discount: 15,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=400&fit=crop",
    restaurant: "Spice Route Indian",
    category: "indian"
  },
  {
    id: 13,
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken pieces",
    price: 21.99,
    discount: 10,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=400&fit=crop",
    restaurant: "Mumbai Express",
    category: "indian"
  },
  {
    id: 14,
    name: "Biryani Special",
    description: "Fragrant basmati rice with spiced chicken and herbs",
    price: 19.99,
    discount: 0,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=500&h=400&fit=crop",
    restaurant: "Biryani House",
    category: "indian"
  },
  {
    id: 15,
    name: "Paneer Makhani",
    description: "Cottage cheese in rich tomato and cashew gravy",
    price: 18.99,
    discount: 20,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&h=400&fit=crop",
    restaurant: "Vegetarian Delight",
    category: "indian"
  },
  {
    id: 16,
    name: "Lamb Curry",
    description: "Slow-cooked tender lamb in aromatic spices",
    price: 26.99,
    discount: 0,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=400&fit=crop",
    restaurant: "Royal Kitchen",
    category: "indian"
  },

  // Chinese Items
  {
    id: 17,
    name: "Sweet & Sour Chicken",
    description: "Crispy chicken with bell peppers in tangy sauce",
    price: 17.99,
    discount: 0,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=500&h=400&fit=crop",
    restaurant: "Golden Dragon",
    category: "chinese"
  },
  {
    id: 18,
    name: "Kung Pao Chicken",
    description: "Spicy stir-fried chicken with peanuts and vegetables",
    price: 18.99,
    discount: 15,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=400&fit=crop",
    restaurant: "Wok This Way",
    category: "chinese"
  },
  {
    id: 19,
    name: "Beef Lo Mein",
    description: "Stir-fried noodles with tender beef and vegetables",
    price: 16.99,
    discount: 10,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=400&fit=crop",
    restaurant: "Noodle Express",
    category: "chinese"
  },
  {
    id: 20,
    name: "Fried Rice Special",
    description: "Wok-fried rice with egg, vegetables, and choice of protein",
    price: 14.99,
    discount: 0,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&h=400&fit=crop",
    restaurant: "Rice & Roll",
    category: "chinese"
  },

  // Dessert Items
  {
    id: 21,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center and vanilla ice cream",
    price: 8.99,
    discount: 0,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500&h=400&fit=crop",
    restaurant: "Sweet Dreams",
    category: "desserts"
  },
  {
    id: 22,
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee-soaked ladyfingers",
    price: 7.99,
    discount: 10,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=400&fit=crop",
    restaurant: "Dolce Vita",
    category: "desserts"
  },
  {
    id: 23,
    name: "New York Cheesecake",
    description: "Rich and creamy cheesecake with berry compote",
    price: 6.99,
    discount: 15,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&h=400&fit=crop",
    restaurant: "Cake Corner",
    category: "desserts"
  },
  {
    id: 24,
    name: "Ice Cream Sundae",
    description: "Three scoops with hot fudge, whipped cream, and cherry",
    price: 5.99,
    discount: 0,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&h=400&fit=crop",
    restaurant: "Frozen Treats",
    category: "desserts"
  },
  {
    id: 25,
    name: "Apple Pie",
    description: "Homemade apple pie with cinnamon and vanilla ice cream",
    price: 6.99,
    discount: 5,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&h=400&fit=crop",
    restaurant: "Grandma's Kitchen",
    category: "desserts"
  },
  {
    id: 26,
    name: "Chocolate Brownie",
    description: "Fudgy brownie with nuts and chocolate chips",
    price: 4.99,
    discount: 20,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=400&fit=crop",
    restaurant: "Brownie Bliss",
    category: "desserts"
  },

  // Pasta Items
  {
    id: 27,
    name: "Spaghetti Carbonara",
    description: "Classic Italian pasta with eggs, cheese, and pancetta",
    price: 19.99,
    discount: 0,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500&h=400&fit=crop",
    restaurant: "Pasta Perfection",
    category: "pasta"
  },
  {
    id: 28,
    name: "Penne Arrabbiata",
    description: "Spicy tomato sauce with garlic, red peppers, and herbs",
    price: 16.99,
    discount: 10,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1572441713132-51dbeb50905b?w=500&h=400&fit=crop",
    restaurant: "Spicy Spoon",
    category: "pasta"
  },
  {
    id: 29,
    name: "Fettuccine Alfredo",
    description: "Creamy white sauce with parmesan cheese and butter",
    price: 18.99,
    discount: 15,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1473094709920-11b28e7367e3?w=500&h=400&fit=crop",
    restaurant: "Creamy Corner",
    category: "pasta"
  },
  {
    id: 30,
    name: "Lasagna Bolognese",
    description: "Layered pasta with meat sauce, bechamel, and cheese",
    price: 22.99,
    discount: 0,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&h=400&fit=crop",
    restaurant: "Italian Heritage",
    category: "pasta"
  },

  // Japanese Items
  {
    id: 31,
    name: "Salmon Sashimi",
    description: "Fresh salmon slices served with wasabi and soy sauce",
    price: 24.99,
    discount: 0,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=400&fit=crop",
    restaurant: "Tokyo Sushi Bar",
    category: "japanese"
  },
  {
    id: 32,
    name: "Chicken Teriyaki",
    description: "Grilled chicken with teriyaki glaze and steamed rice",
    price: 18.99,
    discount: 10,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1555939585323-38174c979a39?w=500&h=400&fit=crop",
    restaurant: "Samurai Kitchen",
    category: "japanese"
  },
  {
    id: 33,
    name: "Ramen Bowl",
    description: "Rich pork broth with noodles, egg, and chashu pork",
    price: 16.99,
    discount: 5,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=500&h=400&fit=crop",
    restaurant: "Ramen House",
    category: "japanese"
  },
  {
    id: 34,
    name: "Tempura Platter",
    description: "Assorted vegetables and shrimp in light crispy batter",
    price: 21.99,
    discount: 15,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500&h=400&fit=crop",
    restaurant: "Zen Garden",
    category: "japanese"
  },

  // Mexican Items
  {
    id: 35,
    name: "Chicken Burrito",
    description: "Grilled chicken with rice, beans, cheese, and salsa",
    price: 12.99,
    discount: 0,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&h=400&fit=crop",
    restaurant: "Fiesta Mexicana",
    category: "mexican"
  },
  {
    id: 36,
    name: "Fish Tacos",
    description: "Grilled fish with cabbage slaw and chipotle sauce",
    price: 14.99,
    discount: 10,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1565299585323-38174c979a39?w=500&h=400&fit=crop",
    restaurant: "Coastal Cantina",
    category: "mexican"
  },
  {
    id: 37,
    name: "Beef Quesadilla",
    description: "Seasoned beef with melted cheese in crispy tortilla",
    price: 11.99,
    discount: 15,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=500&h=400&fit=crop",
    restaurant: "El Sombrero",
    category: "mexican"
  },
  {
    id: 38,
    name: "Guacamole & Chips",
    description: "Fresh avocado dip with lime and cilantro, served with tortilla chips",
    price: 8.99,
    discount: 0,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1506807803488-8eacdeb3c174?w=500&h=400&fit=crop",
    restaurant: "Aztec Kitchen",
    category: "mexican"
  }
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CustomerDashboardProps {
  searchQuery?: string;
  onCartToggle?: () => void;
  onOrdersClick?: () => void;
  onProfileClick?: () => void;
  currentView?: 'browse' | 'orders' | 'profile';
  onItemAddedToCart?: () => void;
}

const CustomerDashboard = ({ 
  searchQuery = '', 
  onCartToggle,
  onOrdersClick,
  onProfileClick,
  currentView = 'browse',
  onItemAddedToCart
}: CustomerDashboardProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 50],
    categories: [],
    minRating: 0,
    hasDiscount: false
  });

  // Handle view changes from props
  useEffect(() => {
    if (currentView === 'orders') {
      setIsOrdersOpen(true);
      setIsCartOpen(false);
      setIsProfileOpen(false);
    } else if (currentView === 'profile') {
      setIsProfileOpen(true);
      setIsCartOpen(false);
      setIsOrdersOpen(false);
    } else if (currentView === 'browse') {
      // Show cart if there are items, otherwise close all modals
      if (cartItems.length > 0) {
        setIsCartOpen(true);
      }
      setIsOrdersOpen(false);
      setIsProfileOpen(false);
    }
  }, [currentView, cartItems.length]);

  // Filter items based on search, category, and filters
  const filteredItems = foodItems.filter(item => {
    // Search filter
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.restaurant.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    // Advanced filters
    const finalPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price;
    
    if (finalPrice < filters.priceRange[0] || finalPrice > filters.priceRange[1]) {
      return false;
    }

    if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
      return false;
    }

    if (item.rating < filters.minRating) {
      return false;
    }

    if (filters.hasDiscount && item.discount === 0) {
      return false;
    }

    return true;
  });

  const handleClearFilters = () => {
    setFilters({
      priceRange: [0, 50],
      categories: [],
      minRating: 0,
      hasDiscount: false
    });
  };

  // Handle external click events
  const handleCartClick = () => {
    setIsCartOpen(true);
    onCartToggle?.();
  };

  const handleOrdersClick = () => {
    setIsOrdersOpen(true);
    onOrdersClick?.();
  };

  const handleProfileClick = () => {
    setIsProfileOpen(true);
    onProfileClick?.();
  };

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
    // Notify parent component that an item was added
    onItemAddedToCart?.();
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
                    value={searchQuery}
                    readOnly
                    className="pl-10 py-3 text-lg border-2 border-gray-200 focus:border-red-500"
                  />
                </div>
                <FiltersDialog 
                  filters={filters} 
                  onFiltersChange={setFilters}
                  onClearFilters={handleClearFilters}
                />
              </div>

              {/* Show active filters */}
              {(searchQuery || filters.categories.length > 0 || filters.hasDiscount || filters.minRating > 0) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {searchQuery && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Search: "{searchQuery}"
                    </Badge>
                  )}
                  {filters.categories.map(category => (
                    <Badge key={category} variant="secondary" className="px-3 py-1">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Badge>
                  ))}
                  {filters.hasDiscount && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Discounted items
                    </Badge>
                  )}
                  {filters.minRating > 0 && (
                    <Badge variant="secondary" className="px-3 py-1">
                      {filters.minRating}+ stars
                    </Badge>
                  )}
                </div>
              )}
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

            {/* Results count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {/* Food Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        console.log(`Failed to load image for ${item.name}: ${item.image}`);
                        // Fallback to placeholder
                        e.currentTarget.src = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=400&fit=crop";
                      }}
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

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🍽️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                <Button onClick={handleClearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            )}
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

      {/* Modals */}
      <OrdersModal isOpen={isOrdersOpen} onClose={() => setIsOrdersOpen(false)} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
};

export default CustomerDashboard;
