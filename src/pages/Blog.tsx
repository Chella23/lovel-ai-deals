import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogPost } from '@/types/product';
import { Button } from '@/components/ui/button';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch('/data/blog-posts.json')
      .then(res => res.json())
      .then((data: BlogPost[]) => {
        setPosts(data);
        setFilteredPosts(data);
        const uniqueCategories = Array.from(new Set(data.map(p => p.category)));
        setCategories(uniqueCategories);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, posts]);

  return (
    <Layout>
      <div className="container py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Buying Guides & Reviews</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert advice, detailed reviews, and comprehensive buying guides to help you make informed decisions
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
          >
            All Articles
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found in this category.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
