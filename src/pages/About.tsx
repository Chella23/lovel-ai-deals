import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Target, Users, Award } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      <div className="container py-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About DealFinder</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We're on a mission to help Indian consumers make smart, informed buying decisions 
            through honest reviews, detailed comparisons, and unbeatable deals.
          </p>
        </div>

        {/* Our Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2024, DealFinder was born out of a simple frustration: finding trustworthy 
              product recommendations online was harder than it should be. Too many review sites 
              prioritized sponsored content over honest advice, leaving consumers confused and 
              sometimes disappointed with their purchases.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We decided to do things differently. Our team of product experts and tech enthusiasts 
              personally tests and reviews products before recommending them. We focus on value, 
              quality, and real-world performance – not just flashy marketing claims.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, DealFinder serves thousands of Indian consumers monthly, helping them save 
              money and make confident buying decisions across electronics, fashion, home goods, 
              and more.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  We clearly disclose our affiliate relationships and never let them influence our honest reviews
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 mx-auto mb-4">
                  <Target className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">Accuracy</h3>
                <p className="text-sm text-muted-foreground">
                  Every product is thoroughly tested and researched before we make recommendations
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 mx-auto mb-4">
                  <Users className="h-7 w-7 text-success" />
                </div>
                <h3 className="font-bold text-lg mb-2">User-First</h3>
                <p className="text-sm text-muted-foreground">
                  Your needs come first. We recommend products that offer real value to Indian consumers
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Quality</h3>
                <p className="text-sm text-muted-foreground">
                  We maintain high editorial standards and only feature products we'd use ourselves
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How We Work */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">How We Work</h2>
          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3">1. Research & Selection</h3>
                  <p className="text-muted-foreground">
                    We identify products that are popular, highly-rated, or represent good value in the Indian market.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">2. Hands-On Testing</h3>
                  <p className="text-muted-foreground">
                    Our team personally tests products whenever possible, evaluating performance, build quality, 
                    and real-world usability.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">3. Price Tracking</h3>
                  <p className="text-muted-foreground">
                    We monitor prices across multiple retailers to ensure we're showing you the best available deals.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">4. Honest Reviews</h3>
                  <p className="text-muted-foreground">
                    We write detailed, unbiased reviews highlighting both strengths and weaknesses of each product.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">5. Regular Updates</h3>
                  <p className="text-muted-foreground">
                    We continuously update our recommendations as new products launch and prices change.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Team</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We're a diverse team of tech enthusiasts, writers, and consumer advocates based across India. 
            What unites us is our passion for helping people make better buying decisions.
          </p>
          <p className="text-muted-foreground">
            Have questions or feedback? We'd love to hear from you at{' '}
            <a href="mailto:contact@dealfinder.com" className="text-primary hover:underline">
              contact@dealfinder.com
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
