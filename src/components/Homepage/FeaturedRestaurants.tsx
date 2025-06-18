import { Star, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const restaurants = [
  {
    id: 1,
    name: "Mama's Italian Kitchen",
    rating: 4.8,
    deliveryTime: "25-35 min",
    category: "Italian",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop&crop=center",
    distance: "0.8 km",
    promoted: true
  },
  {
    id: 2,
    name: "Spice Route Indian",
    rating: 4.6,
    deliveryTime: "30-40 min",
    category: "Indian",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop&crop=center",
    distance: "1.2 km",
    promoted: false
  },
  {
    id: 3,
    name: "Tokyo Sushi Bar",
    rating: 4.9,
    deliveryTime: "20-30 min",
    category: "Japanese",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop&crop=center",
    distance: "0.5 km",
    promoted: true
  },
  {
    id: 4,
    name: "Burger Junction",
    rating: 4.5,
    deliveryTime: "15-25 min",
    category: "American",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop&crop=center",
    distance: "0.9 km",
    promoted: false
  }
];

const FeaturedRestaurants = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Restaurants
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the best restaurants in your area with quick delivery and amazing food
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 overflow-hidden">
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop&crop=center";
                  }}
                />
                {restaurant.promoted && (
                  <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600 text-white">
                    Promoted
                  </Badge>
                )}
                <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{restaurant.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {restaurant.name}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {restaurant.category}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{restaurant.distance}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-green-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">{restaurant.deliveryTime}</span>
                  </div>
                  <button className="text-red-600 font-semibold text-sm hover:text-red-700 transition-colors">
                    Order Now →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
