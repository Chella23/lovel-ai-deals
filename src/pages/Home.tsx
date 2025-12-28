import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { BlogCard } from '@/components/blog/BlogCard';
import { Layout } from '@/components/layout/Layout';
import { useEffect, useState } from 'react';
import { Product, BlogPost } from '@/types/product';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load featured products
    fetch('/data/products.json')
      .then(res => res.json())
      .then((data: Product[]) => {
        setFeaturedProducts(data.filter(p => p.featured).slice(0, 4));
      });

    // Load latest blog posts
    fetch('/data/blog-posts.json')
      .then(res => res.json())
      .then((data: BlogPost[]) => {
        setLatestPosts(data.slice(0, 3));
      });
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15)_0%,transparent_50%)]"></div>
        <div className="container py-24 md:py-32 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 drop-shadow-lg">
              Find the Best Deals on Products You Love.
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/95 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100 drop-shadow-md">
              Honest reviews, expert recommendations, and unbeatable prices. We help Indian consumers make smart buying decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              <Button asChild size="lg" variant="secondary" className="text-base shadow-lg">
                <Link to="/products">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="lightOutline" className="text-base shadow-lg">
                <Link to="/blog">
                  Read Buying Guides
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 border-b border-primary/10 bg-gradient-subtle relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Trusted Reviews</h3>
                <p className="text-sm text-muted-foreground">
                  Honest, unbiased product reviews from real users
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-accent shadow-accent">
                <TrendingUp className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Best Prices</h3>
                <p className="text-sm text-muted-foreground">
                  We track prices to show you the best deals available
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
                <Star className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Expert Picks</h3>
                <p className="text-sm text-muted-foreground">
                  Curated recommendations from our expert team
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">
                Our top picks this month - carefully selected for quality and value
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16 bg-gradient-subtle relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
        <div className="container relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Buying Guides</h2>
              <p className="text-muted-foreground">
                Expert advice to help you make informed purchasing decisions
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/blog">
                All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-cta text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.15)_0%,transparent_50%)]"></div>
        <div className="container text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
            Never Miss a Great Deal
          </h2>
          <p className="text-lg mb-8 text-white/95 max-w-2xl mx-auto drop-shadow-md">
            Join thousands of smart shoppers who save money with our expert recommendations
          </p>
          <Button asChild size="lg" variant="secondary" className="shadow-lg">
            <Link to="/products">
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
