import { Link } from 'react-router-dom';
import { Star, ExternalLink, ShoppingBag, Heart, Info } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { toast } from 'sonner';
import { useState } from 'react';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const favorite = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      affiliateUrl: product.affiliateUrl,
    });
    toast.success('Added to cart!');
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(product.id);
      toast.success('Removed from favorites');
    } else {
      addToFavorites(product);
      toast.success('Added to favorites');
    }
  };

  const handleShowInfo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDetailModal(true);
  };

  return (
    <>
      <Link to={`/products/${product.slug}`}>
        <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-glow hover:scale-105 hover:border-primary/30">
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {discount > 0 && (
              <Badge className="absolute top-3 left-3 bg-gradient-cta text-accent-foreground shadow-accent">
                {discount}% OFF
              </Badge>
            )}
            {product.featured && (
              <Badge className="absolute top-3 right-3 bg-gradient-primary text-primary-foreground shadow-glow">
                Featured
              </Badge>
            )}
            
            {/* Action Icons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full shadow-lg backdrop-blur-sm bg-background/80 hover:bg-background"
                onClick={handleToggleFavorite}
              >
                <Heart className={`h-4 w-4 ${favorite ? 'fill-accent text-accent' : ''}`} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full shadow-lg backdrop-blur-sm bg-background/80 hover:bg-background"
                onClick={handleShowInfo}
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>

        <CardContent className="p-4">
          <div className="mb-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="ml-1 text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews.toLocaleString()} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {!product.inStock && (
            <Badge variant="destructive" className="mt-2">
              Out of Stock
            </Badge>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button
            variant="default"
            className="flex-1"
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="icon"
            asChild
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label="View deal"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </Link>
    
    <ProductDetailModal 
      product={product} 
      open={showDetailModal} 
      onOpenChange={setShowDetailModal} 
    />
    </>
  );
};
