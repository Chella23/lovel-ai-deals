import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { BlogPost as BlogPostType, Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ChevronLeft } from 'lucide-react';
import { ProductGrid } from '@/components/products/ProductGrid';
import ReactMarkdown from 'react-markdown';
import { CommentSection } from '@/components/comments/CommentSection';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data/blog-posts.json')
      .then(res => res.json())
      .then((data: BlogPostType[]) => {
        const found = data.find(p => p.slug === slug);
        if (found) {
          setPost(found);

          // Load related products
          if (found.relatedProducts.length > 0) {
            fetch(import.meta.env.BASE_URL + 'data/products.json')
              .then(res => res.json())
              .then((products: Product[]) => {
                const related = products.filter(p => found.relatedProducts.includes(p.id));
                setRelatedProducts(related);
              });
          }
        }
      });
  }, [slug]);

  if (!post) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Layout>
      <article className="container py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Blog
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {post.readTime} min read
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-lg overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert mb-16">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
              p: ({ node, ...props }) => <p className="mb-4 text-foreground leading-relaxed" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
              li: ({ node, ...props }) => <li className="text-foreground" {...props} />,
              strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
              em: ({ node, ...props }) => <em className="italic" {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Featured Products in This Article</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto mt-16 p-6 bg-secondary/30 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            <strong>Affiliate Disclosure:</strong> This article contains affiliate links.
            We earn a commission from qualifying purchases made through links in this article,
            at no extra cost to you. We only recommend products we believe will add value to our readers.
          </p>
        </div>

        {/* Comments Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <CommentSection itemId={post.id.toString()} itemType="blog" />
        </div>
      </article>
    </Layout>
  );
}
