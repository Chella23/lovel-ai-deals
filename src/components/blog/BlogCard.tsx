import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Heart, Info } from 'lucide-react';
import { BlogPost } from '@/types/product';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/contexts/FavoritesContext';
import { toast } from 'sonner';
import { useState } from 'react';
import { BlogDetailModal } from './BlogDetailModal';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const { addBlogToFavorites, removeBlogFromFavorites, isBlogFavorite } = useFavorites();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const favorite = isBlogFavorite(post.id);

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeBlogFromFavorites(post.id);
      toast.success('Removed from favorites');
    } else {
      addBlogToFavorites(post);
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
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-glow hover:scale-105 hover:border-primary/30">
        <Link to={`/blog/${post.slug}`}>
          <div className="relative overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Badge className="absolute top-3 left-3 bg-gradient-accent text-accent-foreground shadow-accent">
              {post.category}
            </Badge>
            
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

        <CardContent className="p-6">
          <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center">
              <User className="h-3.5 w-3.5 mr-1" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {post.readTime} min read
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button variant="link" className="p-0 h-auto font-semibold">
            Read More →
          </Button>
        </CardFooter>
      </Link>
    </Card>

    <BlogDetailModal 
      post={post} 
      open={showDetailModal} 
      onOpenChange={setShowDetailModal} 
    />
    </>
  );
};
