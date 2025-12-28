import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, BlogPost } from '@/types/product';

interface FavoritesContextType {
  favorites: Product[];
  favoriteBlogPosts: BlogPost[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  addBlogToFavorites: (post: BlogPost) => void;
  removeBlogFromFavorites: (postId: number) => void;
  isBlogFavorite: (postId: number) => boolean;
  favoriteCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [favoriteBlogPosts, setFavoriteBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('favoriteBlogPosts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('favoriteBlogPosts', JSON.stringify(favoriteBlogPosts));
  }, [favoriteBlogPosts]);

  const addToFavorites = (product: Product) => {
    setFavorites(prev => {
      if (prev.some(p => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites(prev => prev.filter(p => p.id !== productId));
  };

  const isFavorite = (productId: number) => {
    return favorites.some(p => p.id === productId);
  };

  const addBlogToFavorites = (post: BlogPost) => {
    setFavoriteBlogPosts(prev => {
      if (prev.some(p => p.id === post.id)) return prev;
      return [...prev, post];
    });
  };

  const removeBlogFromFavorites = (postId: number) => {
    setFavoriteBlogPosts(prev => prev.filter(p => p.id !== postId));
  };

  const isBlogFavorite = (postId: number) => {
    return favoriteBlogPosts.some(p => p.id === postId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoriteBlogPosts,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        addBlogToFavorites,
        removeBlogFromFavorites,
        isBlogFavorite,
        favoriteCount: favorites.length + favoriteBlogPosts.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
