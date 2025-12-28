import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { MessageSquare, User, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  userName: string;
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  itemId: string;
  itemType: 'product' | 'blog';
}

export function CommentSection({ itemId, itemType }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');
  const { toast } = useToast();

  const storageKey = `comments-${itemType}-${itemId}`;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setComments(JSON.parse(stored));
    }
  }, [storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      userName: userName.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(storageKey, JSON.stringify(updatedComments));

    setUserName('');
    setContent('');
    
    toast({
      title: "Success",
      description: "Your comment has been posted!",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Comments ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                maxLength={50}
              />
            </div>
            <div>
              <Textarea
                placeholder="Write your comment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={500}
                rows={4}
              />
            </div>
            <Button type="submit">Post Comment</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No comments yet. Be the first to comment!
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <User className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{comment.userName}</span>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(comment.createdAt)}
                      </div>
                    </div>
                    <p className="text-foreground">{comment.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
