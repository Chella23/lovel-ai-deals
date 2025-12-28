import { Link } from 'react-router-dom';
import { ShoppingCart, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/10 bg-gradient-subtle relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      <div className="container py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <ShoppingCart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">DealFinder</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted source for honest product reviews and recommendations. We help you find the best deals.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products?category=Electronics" className="text-muted-foreground hover:text-primary transition-colors">Electronics</Link></li>
              <li><Link to="/products?category=Fashion" className="text-muted-foreground hover:text-primary transition-colors">Fashion</Link></li>
              <li><Link to="/products?category=Home" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors">Affiliate Disclosure</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li>
                <a href="mailto:contact@dealfinder.com" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {currentYear} DealFinder. All rights reserved.</p>
          <p className="mt-2">
            As an Amazon Associate, we earn from qualifying purchases. Product prices and availability are accurate as of the date/time indicated and are subject to change.
          </p>
        </div>
      </div>
    </footer>
  );
};
