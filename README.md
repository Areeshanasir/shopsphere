# 🛍️ ShopSphere – Responsive Product Catalog & Shopping Cart

ShopSphere is a modern, responsive e-commerce web application built using **React, Vite, Tailwind CSS, JSON Server, Storybook, React Router, and XState**. The project demonstrates reusable UI components, responsive layouts, accessibility, state management, client-side validation, and a mock REST API following a component-based architecture.

---

## ✨ Features

### Week 1 – Product Catalog

- Search products by name
- Category filtering
- Product sorting (Default, Price, Rating)
- Grid/List view toggle
- Skeleton loaders during data fetching
- Empty state for no search results
- Error handling with retry option
- Light/Dark mode support
- Storybook component documentation
- Mock REST API with 60+ products using JSON Server

### Week 2 – Product Details & Shopping Cart

- Product Details page using React Router
- Accessible product image gallery
- Shopping Cart powered by XState
- Add, Remove and Clear Cart functionality
- Quantity update with client-side validation
- Toast notifications for cart actions
- Unit tests for XState cart machine using Vitest

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State Management:** XState
- **Mock API:** JSON Server
- **Component Library:** Storybook
- **Notifications:** React Hot Toast
- **Testing:** Vitest
- **Icons:** React Icons

---

## 🏗️ Project Architecture

```
ShopSphere
│
├── App
│
├── Navbar
├── Hero
├── ProductSection
│      ├── Search
│      ├── Category Filter
│      ├── Sorting
│      ├── Grid/List View
│      ├── Skeleton Loader
│      ├── Empty State
│      ├── Error State
│      └── Product Cards
│
├── Product Details
│      └── Image Gallery
│
├── Shopping Cart
│      ├── Add Item
│      ├── Remove Item
│      ├── Update Quantity
│      ├── Optimistic Updates
│      └── Rollback
│
├── Checkout
│      ├── Cart
│      ├── Shipping
│      ├── Payment
│      └── Confirmation
│
└── Footer
```

---

## 📁 Folder Structure

```
ShopSphere/
│
├── .storybook/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.stories.jsx
│   │   ├── Hero.jsx
│   │   ├── Hero.stories.jsx
│   │   ├── ProductSection.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductCard.stories.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── SkeletonCard.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorState.jsx
│   │   └── Footer.jsx
│   │
│   ├── context/
│   │   └── CartProvider.jsx
│   │
│   ├── machines/
│   │   ├── cartMachine.js
│   │   └── checkoutMachine.js
│   │
│   ├── hooks/
│   │   └── useProducts.js
│   │
│   ├── tests/
│   │   ├── cartMachine.test.js
│   │   └── optimisticCart.test.js
│   │
│   ├── data/
│   │   └── db.json
│   │
│   ├── App.jsx
│   ├── ErrorBoundary.jsx
│   ├── main.jsx
│   └── index.css
│
├── screenshots/
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
---

## 🚀 Local Setup

### Prerequisites

- Node.js (v18 or higher)
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/Areeshanasir/shopsphere.git
cd shopsphere
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Mock API

```bash
npm run server
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Run Storybook

```bash
npm run storybook
```

### 6. Run Unit Tests

```bash
npm test
```

---

## ✅ Week 2 Deliverables

- Accessible Product Details Page
- Image Gallery
- Shopping Cart using XState
- Quantity Validation
- Toast Notifications
- Unit Tests (Vitest)
- React Router Navigation

---

✅ Week 3 Deliverables
Optimistic UI cart updates
Automatic rollback logic
XState checkout machine
Multi-step checkout flow
Shipping validation
Payment validation
Cart → Shipping → Payment → Confirmation flow
Responsive mobile and desktop checkout testing
Optimistic update unit tests
20 passing tests