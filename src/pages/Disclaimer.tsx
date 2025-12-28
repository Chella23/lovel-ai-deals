import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function Disclaimer() {
  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Affiliate Disclosure</h1>
            <p className="text-lg text-muted-foreground">
              Transparency is important to us. Here's how DealFinder operates and earns revenue.
            </p>
          </div>

          {/* Important Notice */}
          <Card className="mb-8 border-accent">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <AlertTriangle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-bold text-lg mb-2">Important Notice</h2>
                  <p className="text-muted-foreground">
                    DealFinder participates in various affiliate marketing programs. This means we earn 
                    commissions from qualifying purchases made through links on our website.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">What Are Affiliate Links?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Affiliate links are special URLs that contain a unique tracking code. When you click on 
                an affiliate link and make a purchase, the retailer knows the sale came from our website 
                and pays us a small commission. This commission comes at no extra cost to you – you pay 
                the same price whether you use our link or not.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How We Use Affiliate Links</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use affiliate links in several places on our website:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Product recommendation pages</li>
                <li>"View Deal" buttons on product cards</li>
                <li>Links within blog posts and buying guides</li>
                <li>Product detail pages</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Our Affiliate Partners</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We partner with various retailers and affiliate networks, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Amazon Associates:</strong> We participate in the Amazon Associates Program, 
                an affiliate advertising program designed to provide a means for sites to earn advertising 
                fees by advertising and linking to Amazon.in.</li>
                <li><strong>Other Retailers:</strong> We also partner with other Indian e-commerce platforms 
                and brands to bring you a wide variety of products and deals.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Our Commitment to You</h2>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Editorial Independence</h3>
                    <p className="text-sm text-muted-foreground">
                      Our reviews and recommendations are based on thorough research, testing, and analysis. 
                      Affiliate commissions do not influence our opinions or ratings.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Honest Reviews</h3>
                    <p className="text-sm text-muted-foreground">
                      We provide both positive and negative feedback about products. If a product has flaws, 
                      we'll tell you about them – even if it means you might not buy it through our link.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">No Hidden Costs</h3>
                    <p className="text-sm text-muted-foreground">
                      Using our affiliate links never increases the price you pay. In many cases, we negotiate 
                      exclusive discounts that save you money.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Value-First Recommendations</h3>
                    <p className="text-sm text-muted-foreground">
                      We only recommend products we believe offer good value and quality. We won't recommend 
                      something just because it pays a higher commission.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Price and Availability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Product prices and availability are accurate as of the date/time indicated on our website 
                and are subject to change. Any price and availability information displayed on the retailer's 
                website at the time of purchase will apply to the purchase of the product.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Amazon Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed">
                As an Amazon Associate, DealFinder earns from qualifying purchases. This means if you click 
                on an Amazon link and buy a product, we receive a small commission at no extra cost to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Questions?</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about our affiliate relationships or how we operate, please don't 
                hesitate to contact us at{' '}
                <a href="mailto:contact@dealfinder.com" className="text-primary hover:underline">
                  contact@dealfinder.com
                </a>. We're committed to transparency and are happy to answer any questions you may have.
              </p>
            </section>

            <section className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                Last updated: March 2024
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
