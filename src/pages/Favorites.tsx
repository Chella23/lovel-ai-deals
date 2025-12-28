import { Layout } from '@/components/layout/Layout';
import { useFavorites } from '@/contexts/FavoritesContext';
import { ProductGrid } from '@/components/products/ProductGrid';
import { BlogCard } from '@/components/blog/BlogCard';
import { Heart, Package, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Favorites() {
  const { favorites, favoriteBlogPosts, favoriteCount } = useFavorites();

  return (
    <Layout>
      <div className="container py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-primary">
              <Heart className="h-6 w-6 text-primary-foreground fill-current" />
            </div>
            <h1 className="text-4xl font-bold">My Favorites</h1>
          </div>
          <p className="text-muted-foreground">
            {favoriteCount === 0
              ? 'You haven\'t added any favorites yet. Start browsing and save your favorites!'
              : `You have ${favoriteCount} favorite ${favoriteCount === 1 ? 'item' : 'items'}`}
          </p>
        </div>

        {favoriteCount > 0 ? (
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Products ({favorites.length})
              </TabsTrigger>
              <TabsTrigger value="blogs" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Blog Posts ({favoriteBlogPosts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              {favorites.length > 0 ? (
                <ProductGrid products={favorites} />
              ) : (
                <div className="text-center py-20">
                  <Package className="h-20 w-20 mx-auto text-muted-foreground/30 mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">No favorite products</h2>
                  <p className="text-muted-foreground">
                    Browse products and click the heart icon to save them
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="blogs">
              {favoriteBlogPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteBlogPosts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <BookOpen className="h-20 w-20 mx-auto text-muted-foreground/30 mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">No favorite blog posts</h2>
                  <p className="text-muted-foreground">
                    Browse blog posts and click the heart icon to save them
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-20">
            <Heart className="h-20 w-20 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Browse our products and blog posts and click the heart icon to add them to your favorites
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
