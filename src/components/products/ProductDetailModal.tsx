import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductDetailModal = ({ product, open, onOpenChange }: ProductDetailModalProps) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      asin: product.asin,
    });
    toast.success('Added to cart!');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl">{product.name}</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-contain bg-white rounded-lg"
                />
                {discount > 0 && (
                  <Badge className="absolute top-3 left-3 bg-gradient-cta text-accent-foreground shadow-accent">
                    {discount}% OFF
                  </Badge>
                )}
              </div>

              {/* Details */}
              <div className="space-y-4">
                <Badge variant="secondary">{product.category}</Badge>

                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="ml-1 text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                <p className="text-muted-foreground">{product.description}</p>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {product.inStock ? (
                    <Badge variant="outline" className="border-success text-success">
                      <Check className="h-3 w-3 mr-1" />
                      In Stock
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>

                {/* Key Features */}
                {product.features && product.features.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold">Key Features:</h3>
                    <ul className="space-y-1">
                      {product.features.slice(0, 5).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="default"
                    className="flex-1"
                    disabled={!product.inStock}
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href={`https://www.amazon.in/dp/${product.asin}/?tag=chella09-21`}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Deal
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
