
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Package, CheckCircle, Star } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  status: 'preparing' | 'on-way' | 'delivered';
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
  restaurant: string;
}

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    items: [
      {
        name: 'Margherita Pizza',
        quantity: 1,
        price: 15.19,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop'
      },
      {
        name: 'Garlic Bread',
        quantity: 2,
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=100&h=100&fit=crop'
      }
    ],
    total: 21.18,
    restaurant: "Mama's Italian Kitchen"
  },
  {
    id: 'ORD-002',
    date: '2024-01-14',
    status: 'on-way',
    items: [
      {
        name: 'Chicken Tikka Masala',
        quantity: 1,
        price: 19.54,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=100&h=100&fit=crop'
      }
    ],
    total: 19.54,
    restaurant: "Spice Route Indian"
  },
  {
    id: 'ORD-003',
    date: '2024-01-13',
    status: 'preparing',
    items: [
      {
        name: 'Classic Cheeseburger',
        quantity: 2,
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop'
      }
    ],
    total: 31.98,
    restaurant: "Burger Junction"
  }
];

const OrdersModal = ({ isOpen, onClose }: OrdersModalProps) => {
  const [selectedTab, setSelectedTab] = useState<'active' | 'past'>('active');

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return <Clock className="h-4 w-4" />;
      case 'on-way':
        return <Package className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      case 'on-way':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return 'Preparing';
      case 'on-way':
        return 'On the way';
      case 'delivered':
        return 'Delivered';
    }
  };

  const activeOrders = mockOrders.filter(order => order.status !== 'delivered');
  const pastOrders = mockOrders.filter(order => order.status === 'delivered');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Your Orders</DialogTitle>
        </DialogHeader>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setSelectedTab('active')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'active'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Active Orders ({activeOrders.length})
          </button>
          <button
            onClick={() => setSelectedTab('past')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'past'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Past Orders ({pastOrders.length})
          </button>
        </div>

        {/* Orders List */}
        <div className="overflow-y-auto max-h-96 space-y-4">
          {(selectedTab === 'active' ? activeOrders : pastOrders).map((order) => (
            <Card key={order.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.restaurant}</p>
                    <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                    {getStatusIcon(order.status)}
                    {getStatusText(order.status)}
                  </Badge>
                </div>

                {/* Order Items */}
                <div className="space-y-2 mb-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="font-bold text-lg">Total: ${order.total.toFixed(2)}</span>
                  <div className="flex space-x-2">
                    {order.status === 'delivered' && (
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        Rate
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Reorder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(selectedTab === 'active' ? activeOrders : pastOrders).length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No {selectedTab} orders found</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrdersModal;
