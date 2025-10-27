# 🛍️ ShopHub - Complete E-Commerce Frontend

A production-ready, fully-responsive e-commerce platform built with React, Vite, Tailwind CSS, Redux Toolkit, and React Router DOM.

## ✨ Features

### 🎯 Core Features
- **Complete E-Commerce Flow**: Browse → Cart → Checkout → Order Success
- **User Authentication**: Login, register, forgot password with validation
- **Shopping Cart**: Add, remove, update quantities with persistent storage
- **Wishlist**: Save favorite products for later
- **Product Management**: 
  - Advanced filtering (category, price, rating)
  - Multiple view modes (grid/list)
  - Product search with real-time results
  - Product quick view
  - Related products
- **Order Management**: Order history, tracking, and cancellation
- **User Profile**: Profile editing, address management, security settings
- **Responsive Design**: Mobile-first approach, optimized for all devices

### 🔧 Technical Features
- Redux Toolkit for state management
- React Router DOM v6 for navigation
- Protected routes with authentication
- Form validation with custom validators
- Toast notifications
- Loading states and skeletons
- Error handling
- LocalStorage persistence
- Custom hooks for reusable logic
- Utility functions for formatting and validation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Build for Production
```bash
npm run build
npm run preview
```

## 📁 Project Structure
```
src/
├── components/         # Reusable UI components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── CartItem.jsx
│   └── ... (50+ components)
├── pages/             # Route-level page components
│   ├── HomePage.jsx
│   ├── ProductsPage.jsx
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   ├── ProfilePage.jsx
│   └── ...
├── features/          # Redux slices
│   ├── products/
│   ├── cart/
│   ├── auth/
│   ├── orders/
│   ├── wishlist/
│   └── ui/
├── layouts/           # Layout wrappers
│   ├── MainLayout.jsx
│   ├── AuthLayout.jsx
│   └── CheckoutLayout.jsx
├── hooks/             # Custom React hooks
│   ├── useAuth.js
│   ├── useCart.js
│   ├── useProducts.js
│   └── ...
├── utils/             # Helper functions
│   ├── formatters.js
│   ├── validators.js
│   └── helpers.js
├── services/          # API services and mock data
├── constants/         # App constants
└── store/             # Redux store configuration
```

## 🎨 Key Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router DOM v6** - Client-side routing
- **Lucide React** - Icon library

## 🔐 Authentication

### Demo Credentials

- **Email**: demo@example.com
- **Password**: password123

### Features
- Login/Register with validation
- Password strength indicator
- Forgot password flow
- Protected routes
- Session persistence

## 🛒 Shopping Features

### Product Catalog
- 12 demo products across 6 categories
- Advanced filtering and sorting
- Search functionality
- Grid and list view modes
- Product quick view

### Cart
- Add/remove items
- Quantity management
- Price calculations (subtotal, tax, shipping)
- Coupon code support
- Free shipping threshold

### Checkout
- Multi-step checkout process
- Shipping address form
- Saved addresses
- Multiple shipping options
- Payment method selection (Card, PayPal, COD)
- Order review

### Orders
- Order history
- Order tracking with status timeline
- Order details
- Invoice download (placeholder)
- Order cancellation

## 🎯 API Integration

Currently uses mock data from `src/services/mockData.js`. To connect to a real backend:

1. Update `VITE_API_URL` in `.env`
2. Implement API calls in Redux thunks
3. Replace mock data with real API endpoints

Example:
```javascript
// In Redux slice
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

## 📱 Responsive Design

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

All components are fully responsive with mobile-first design.

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your brand colors
        500: '#0ea5e9',
        600: '#0284c7',
        // ...
      }
    }
  }
}
```

### Components

All components accept standard props and can be easily customized:
```jsx
<Button 
  variant="primary" 
  size="lg" 
  fullWidth 
  loading={isLoading}
>
  Custom Button
</Button>
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Page**: Create in `src/pages/` and add route in `App.jsx`
2. **New Component**: Create in `src/components/` and export from `index.js`
3. **New Redux Slice**: Create in `src/features/` and add to store
4. **New Utility**: Add to `src/utils/` and export from `index.js`

## 📊 State Management

Redux Toolkit slices:
- **products**: Product catalog, filters, current product
- **cart**: Shopping cart items and calculations
- **wishlist**: Saved products
- **auth**: User authentication and profile
- **orders**: Order history and current order
- **ui**: Toast notifications, modals, loading states

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Change port in vite.config.js or use:
npm run dev -- --port 3001
```

**Module not found:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

## 🚀 Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Icons: [Lucide React](https://lucide.dev)
- Images: [Unsplash](https://unsplash.com)
- Fonts: [Google Fonts (Inter)](https://fonts.google.com)

## 📧 Support

For questions or issues:
- Create an issue on GitHub
- Contact: support@shophub.com

---

**Built with ❤️ using React + Vite + Tailwind CSS**

**Ready for Production! 🚀**