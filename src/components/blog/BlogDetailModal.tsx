import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BlogPost } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface BlogDetailModalProps {
  post: BlogPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BlogDetailModal = ({ post, open, onOpenChange }: BlogDetailModalProps) => {
  if (!post) return null;

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl">{post.title}</DialogTitle>
            </DialogHeader>

            <div className="mt-6 space-y-6">
              {/* Image */}
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-80 object-cover rounded-lg"
                />
                <Badge className="absolute top-3 left-3 bg-gradient-accent text-accent-foreground shadow-accent">
                  {post.category}
                </Badge>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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

              {/* Excerpt */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Summary</h3>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </div>

              {/* Content Preview */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Content Preview</h3>
                <p className="text-muted-foreground line-clamp-6">
                  {post.content.substring(0, 500)}...
                </p>
              </div>

              {/* Action Button */}
              <div className="flex gap-2 pt-4">
                <Button asChild className="flex-1">
                  <Link to={`/blog/${post.slug}`} onClick={() => onOpenChange(false)}>
                    Read Full Article
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
