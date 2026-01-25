import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ExternalLink, ShoppingBag, Check, ChevronLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { ProductGrid } from '@/components/products/ProductGrid';
import { toast } from 'sonner';
import { CommentSection } from '@/components/comments/CommentSection';

export default function ProductDetail() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data/products.json')
      .then(res => res.json())
      .then((data: Product[]) => {
        const found = data.find(p => p.slug === slug);
        if (found) {
          setProduct(found);
          // Find related products from same category
          const related = data
            .filter(p => p.category === found.category && p.id !== found.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      });
  }, [slug]);

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

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
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg border border-border">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-contain bg-white"
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-lg px-3 py-1">
                  {discount}% OFF
                </Badge>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`border-2 rounded-md overflow-hidden transition-all ${selectedImage === idx ? 'border-primary' : 'border-border'
                      }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-24 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating)
                        ? 'fill-accent text-accent'
                        : 'text-muted-foreground'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              <p className="text-muted-foreground text-lg">{product.description}</p>
            </div>

            {/* Price */}
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold">₹{product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="text-success font-medium">You save ₹{(product.originalPrice - product.price).toLocaleString()} ({discount}%)</p>
              )}
            </div>

            {/* Stock Status */}
            {product.inStock ? (
              <div className="flex items-center text-success">
                <Check className="h-5 w-5 mr-2" />
                <span className="font-medium">In Stock</span>
              </div>
            ) : (
              <Badge variant="destructive" className="text-base">Out of Stock</Badge>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 text-base h-12"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 text-base h-12 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                asChild
              >
                <a
                  href={`https://www.amazon.in/dp/${product.asin}/?tag=chella09-21`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  View Deal
                  <ExternalLink className="h-5 w-5 ml-2" />
                </a>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              * This is an affiliate link. We earn a commission from qualifying purchases at no extra cost to you.
            </p>
          </div>
        </div>

        {/* Features & Specifications */}
        <div className={`grid grid-cols-1 ${product.specifications && Object.keys(product.specifications).length > 0 ? 'lg:grid-cols-2' : ''} gap-8 mb-16`}>
          {/* Features */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">You May Also Like</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}

        {/* Comments Section */}
        <div className="max-w-3xl mx-auto">
          <CommentSection itemId={product.id.toString()} itemType="product" />
        </div>
      </div>
    </Layout>
  );
}
