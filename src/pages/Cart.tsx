import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus, Minus, ExternalLink, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, itemCount } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet.
              Browse our collection and find great deals!
            </p>
            <Button asChild size="lg">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-md"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-2 truncate">{item.name}</h3>
                      <p className="text-2xl font-bold text-primary mb-4">
                        ₹{item.price.toLocaleString()}
                      </p>

                      <div className="flex items-center gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-4 font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Subtotal</p>
                      <p className="text-xl font-bold">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outline"
              className="w-full"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">Order Summary</h2>

                <div className="space-y-2 py-4 border-t border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items ({itemCount})</span>
                    <span className="font-medium">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax estimate</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                <div className="space-y-3 pt-4">
                  <p className="text-sm text-center text-muted-foreground mb-4">
                    This is a simulated cart. Click the button below to view deals for each product.
                  </p>

                  {items.map(item => (
                    <Button
                      key={item.id}
                      variant="default"
                      className="w-full"
                      asChild
                    >
                      <a
                        href={`https://www.amazon.in/dp/${item.asin}/?tag=chella09-21`}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        View {item.name.substring(0, 20)}...
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  ))}
                </div>

                <p className="text-xs text-center text-muted-foreground pt-4">
                  * We earn commissions from qualifying purchases
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
