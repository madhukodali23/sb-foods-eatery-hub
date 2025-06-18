
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Filter, X } from 'lucide-react';

export interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  minRating: number;
  hasDiscount: boolean;
}

interface FiltersDialogProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

const categories = [
  { id: 'pizza', label: 'Pizza' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'chinese', label: 'Chinese' },
  { id: 'indian', label: 'Indian' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'pasta', label: 'Pasta' },
  { id: 'japanese', label: 'Japanese' },
  { id: 'mexican', label: 'Mexican' }
];

const FiltersDialog = ({ filters, onFiltersChange, onClearFilters }: FiltersDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]]
    });
  };

  const handleCategoryToggle = (categoryId: string) => {
    const updatedCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    
    onFiltersChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handleRatingChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      minRating: value[0]
    });
  };

  const handleDiscountToggle = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      hasDiscount: checked
    });
  };

  const handleClearAll = () => {
    onClearFilters();
    setIsOpen(false);
  };

  const activeFiltersCount = 
    (filters.categories.length > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 50 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.hasDiscount ? 1 : 0);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 px-6 relative">
          <Filter className="h-5 w-5" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Filter Options
            <Button variant="ghost" size="sm" onClick={handleClearAll}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Price Range */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Price Range</Label>
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={handlePriceRangeChange}
                max={50}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Categories</Label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={() => handleCategoryToggle(category.id)}
                  />
                  <Label htmlFor={category.id} className="text-sm cursor-pointer">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Minimum Rating</Label>
            <div className="px-2">
              <Slider
                value={[filters.minRating]}
                onValueChange={handleRatingChange}
                max={5}
                min={0}
                step={0.5}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-2">
                {filters.minRating === 0 ? 'Any rating' : `${filters.minRating}+ stars`}
              </div>
            </div>
          </div>

          {/* Discount Only */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="discount"
              checked={filters.hasDiscount}
              onCheckedChange={handleDiscountToggle}
            />
            <Label htmlFor="discount" className="text-sm cursor-pointer">
              Show only items with discounts
            </Label>
          </div>

          {/* Apply Button */}
          <Button 
            onClick={() => setIsOpen(false)} 
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersDialog;
