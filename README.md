# DealFinder - Affiliate Marketing E-Commerce Website

A modern, beginner-friendly affiliate marketing website built with React, TypeScript, and Tailwind CSS. Perfect for showcasing products with affiliate links while providing a professional e-commerce experience.

## 🚀 Features

- **Modern Design**: Clean, responsive UI with light/dark mode support
- **Product Showcase**: Beautiful product cards with images, ratings, and prices
- **Blog System**: Built-in blog for buying guides and reviews
- **Shopping Cart**: Simulated cart experience (products link to affiliate URLs)
- **SEO Optimized**: Proper meta tags, semantic HTML, and clean URLs
- **Performance**: Lazy loading images, optimized bundle size
- **Mobile-First**: Fully responsive on all devices
- **Type-Safe**: Written in TypeScript for better code quality

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout
│   ├── products/        # Product cards, grids, filters
│   ├── blog/            # Blog card components
│   └── ui/              # Reusable UI components (buttons, cards, etc.)
├── contexts/            # React Context (Theme, Cart)
├── pages/               # All page components
├── types/               # TypeScript type definitions
└── index.css            # Global styles and design system

public/
└── data/
    ├── products.json    # Product data
    └── blog-posts.json  # Blog post data
```

## 🎨 Customizing the Design

### Colors and Theme

All colors are defined in `src/index.css` using CSS variables. Edit these to match your brand:

```css
:root {
  /* Primary color - used for main CTAs and highlights */
  --primary: 211 100% 43%;
  
  /* Accent color - used for CTAs and important actions */
  --accent: 25 95% 53%;
  
  /* Add more custom colors as needed */
}
```

**Note**: All colors MUST be in HSL format (Hue Saturation Lightness).

### Fonts

The site uses Inter font by default. To change fonts, edit `src/index.css`:

```css
body {
  font-family: 'YourFont', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

### Button Styles

Button variants are defined in `src/components/ui/button.tsx`. Add custom variants for special use cases.

## 📝 Adding Content

### Adding a New Product

1. Open `public/data/products.json`
2. Add a new product object following this structure:

```json
{
  "id": 9,
  "name": "Product Name",
  "slug": "product-name-url",
  "category": "Electronics",
  "price": 29999,
  "originalPrice": 34999,
  "rating": 4.7,
  "reviews": 543,
  "image": "https://example.com/image.jpg",
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "inStock": true,
  "featured": false,
  "affiliateUrl": "https://your-affiliate-link.com",
  "description": "Detailed product description...",
  "features": [
    "Feature 1",
    "Feature 2"
  ],
  "specifications": {
    "Display": "6.7 inch",
    "Processor": "Snapdragon 8 Gen 2"
  }
}
```

**Important**: 
- Use unique `id` and `slug` for each product
- `affiliateUrl` should be your actual affiliate link
- Images should be high quality (800x800px minimum)

### Adding a Blog Post

1. Open `public/data/blog-posts.json`
2. Add a new blog post:

```json
{
  "id": 5,
  "title": "Your Blog Title",
  "slug": "your-blog-title",
  "excerpt": "Brief summary of the post...",
  "content": "# Full blog content in Markdown format\n\nYou can use **bold**, *italic*, lists, etc.",
  "author": "Author Name",
  "publishDate": "2024-03-20",
  "readTime": 7,
  "image": "https://example.com/blog-image.jpg",
  "category": "Electronics",
  "relatedProducts": [1, 3, 5]
}
```

**Tips for Blog Content**:
- Write content in Markdown format
- Use `\n\n` for paragraph breaks
- Include `relatedProducts` array with product IDs to show related products at the bottom
- Link to relevant products within your content to increase conversions

### Changing Site Name and Branding

1. Update site name in `src/components/layout/Header.tsx` and `src/components/layout/Footer.tsx`
2. Update meta tags in `index.html`
3. Change the logo/icon in the Header component

## 🔧 Development

### Prerequisites

- Node.js 18+ and npm installed
- Basic knowledge of React and TypeScript (helpful but not required)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd dealfinder

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:8080`

### Making Changes

1. Edit files in the `src/` directory
2. Changes will automatically refresh in your browser
3. Check the browser console for any errors

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

Your site will be live in minutes!

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"

### Deploy using Lovable

Simply click the **Publish** button in Lovable's interface to deploy your site instantly.

## 📱 SEO Best Practices

This template follows SEO best practices:

- ✅ Semantic HTML5 structure
- ✅ Proper heading hierarchy (H1, H2, H3)
- ✅ Meta descriptions and titles
- ✅ Image alt attributes
- ✅ Clean, descriptive URLs
- ✅ Mobile-responsive design
- ✅ Fast load times with lazy loading
- ✅ Proper affiliate link attributes (`rel="nofollow noopener noreferrer"`)

### Improving SEO

1. **Add Unique Content**: Write detailed, helpful product reviews
2. **Update Meta Tags**: Customize titles and descriptions for each page
3. **Image Optimization**: Compress images before uploading
4. **Internal Linking**: Link related products and blog posts
5. **Regular Updates**: Keep content fresh and prices current

## ⚖️ Legal Compliance

### Affiliate Disclosures

The site includes proper affiliate disclosures:
- Footer mentions affiliate relationships
- Dedicated `/disclaimer` page with full disclosure
- Inline disclosures on product pages
- All affiliate links use `rel="nofollow noopener noreferrer"`

**Important**: Always disclose affiliate relationships clearly. It's required by law in most countries and builds trust with your audience.

### Updating Disclaimers

Edit `src/pages/Disclaimer.tsx` to:
- Add your specific affiliate programs
- Update contact information
- Include your business details

## 🎯 Monetization Tips

1. **Amazon Associates**:
   - Sign up at [affiliate-program.amazon.in](https://affiliate-program.amazon.in)
   - Replace example affiliate links with your tracking IDs

2. **Other Affiliate Programs**:
   - Flipkart Affiliate
   - CJ Affiliate
   - Impact
   - Brand-specific programs

3. **Content Strategy**:
   - Write detailed buying guides
   - Compare products in same category
   - Create "best of" lists
   - Update prices regularly
   - Focus on high-ticket items for better commissions

## 🛠️ Troubleshooting

### Images Not Loading

- Check that image URLs are valid and accessible
- Use HTTPS URLs only
- Consider hosting images locally in `public/images/`

### Products Not Appearing

- Verify JSON syntax in `products.json`
- Check browser console for errors
- Ensure all required fields are present

### Styling Issues

- Clear browser cache
- Check for typos in Tailwind classes
- Verify CSS variables are defined in `index.css`

## 📚 Learning Resources

### React & TypeScript
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com)

### Affiliate Marketing
- [Amazon Associates Central](https://affiliate-program.amazon.in)
- [Affiliate Marketing Guide for Beginners](https://neilpatel.com/what-is-affiliate-marketing)

## 🤝 Support

Need help? Here's how to get support:

1. Check this README for common issues
2. Review code comments - they explain key concepts
3. Search for your issue on Stack Overflow
4. Join the Lovable Discord community

## 📄 License

This project is open source and available for personal and commercial use.

## 🌟 Credits

Built with:
- [React](https://react.dev) - UI library
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Vite](https://vitejs.dev) - Build tool
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Lovable](https://lovable.dev) - AI-powered development platform

---

**Ready to start earning?** Customize the products, write compelling content, and deploy your site. Good luck with your affiliate marketing journey! 🚀
