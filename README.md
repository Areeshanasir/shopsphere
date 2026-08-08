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


---

## Week 4 – Real-Time WebSockets

Week 4 extends ShopSphere with real-time inventory synchronization using WebSockets.

### ✨ Week 4 Features

- Real-time inventory updates using WebSockets
- Shared inventory state across multiple browser tabs
- Server-side inventory as the single source of truth
- New browser tabs receive the latest inventory immediately
- Live connection status indicator
- Automatic WebSocket reconnection
- Exponential backoff for reconnection attempts
- Inventory protection against negative stock
- Real-time out-of-stock handling
- Socket failure detection during checkout
- Automatic recovery after the WebSocket server reconnects
- Automated tests for real-time inventory behavior

### 🔄 Real-Time Inventory Flow

```text
Browser Tab
     │
     │ WebSocket
     ↓
WebSocket Server
     │
     │ Inventory Update
     ↓
Broadcast to All Connected Tabs
     │
     ├──────────────┐
     ↓              ↓
   Tab 1          Tab 2
     │              │
     └──────┬───────┘
            ↓
       Same Inventory

The WebSocket server acts as the single source of truth for inventory quantities. When a product is added to the cart, the server updates the inventory and broadcasts the new quantity to all connected clients.

🔌 WebSocket Connection Handling

The application displays the current WebSocket connection status:

🟢 Live – WebSocket connection is active
🟠 Reconnecting – Connection was lost and reconnection is being attempted
🟡 Connecting – Initial WebSocket connection is being established

The client uses exponential backoff when reconnecting:

1s → 2s → 4s → 8s → 16s → 30s

This prevents the application from repeatedly attempting connections too aggressively.

📦 Inventory Synchronization

When a browser connects, the WebSocket server immediately sends the current inventory.

When inventory changes:

Product 1: 15 → 14

the server broadcasts the updated value to every connected browser tab.

Opening a new tab also retrieves the latest server-side inventory rather than starting with an outdated local value.

🛡️ Inventory Protection

The server prevents inventory from becoming negative.

If a product reaches:

0 available

the product becomes unavailable and the user cannot continue adding that product to the cart.

🧪 Week 4 Testing

Automated tests verify:

Inventory synchronization
Immediate inventory updates
Independent product inventory
Prevention of negative inventory
Synchronization across multiple browser tabs

Current test result:

Test Files: 9 passed
Tests:      25 passed
📁 Week 4 Files
src/
│
├── hooks/
│   └── useInventorySocket.js
│
├── tests/
│   ├── cartMachine.test.js
│   ├── optimisticCart.test.js
│   └── inventorySocket.test.js
│
└── pages/
    └── ProductDetails.jsx

server/
└── websocketServer.js
🚀 Running the WebSocket Server

Start the WebSocket server separately:

node server/websocketServer.js

You should see:

🟢 WebSocket server running on ws://localhost:8080

Then start the React application:

npm run dev
🔬 Real-Time Testing

To test synchronization:

1. Start the WebSocket server.
2. Start the React application.
3. Open the same product in multiple browser tabs.
4. Confirm all tabs show the same inventory.
5. Add the product to the cart from one tab.
6. Verify that the inventory updates in all tabs.
7. Open a new tab and verify that it receives the current inventory.
8. Stop the WebSocket server.
9. Verify the application displays Reconnecting...
10. Restart the WebSocket server.
11. Verify the connection returns to Live.