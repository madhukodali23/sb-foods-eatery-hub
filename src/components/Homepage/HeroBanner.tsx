
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-to-br from-red-500 via-orange-500 to-red-600 text-white py-20">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Delicious Food
          <br />
          <span className="text-yellow-300">Delivered Fast</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
          Order from your favorite restaurants and get fresh, hot meals delivered to your doorstep
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center bg-white rounded-full shadow-2xl overflow-hidden">
            <Input
              type="text"
              placeholder="Search for food or restaurants..."
              className="flex-1 border-0 px-6 py-4 text-lg text-gray-800 focus:ring-0 focus:outline-none rounded-full"
            />
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full m-1">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Promotion Banner */}
        <div className="bg-yellow-400 text-red-800 px-8 py-4 rounded-full inline-block font-bold text-lg shadow-lg">
          🍕 Special Offer: Get 30% OFF on your first order!
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
