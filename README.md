# 🛍️ ShopSphere – Responsive Product Catalog & Design System

ShopSphere is a modern, responsive e-commerce product catalog built using **React, Vite, Tailwind CSS, JSON Server, and Storybook**. The project demonstrates reusable UI components, responsive layouts, accessibility, and a mock API while following a component-based architecture.

---

## ✨ Features


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

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Mock API:** JSON Server
- **Component Library:** Storybook
- **Icons:** React Icons

---

## 🏗️ Project Architecture

```
ShopSphere
│
├── App.jsx
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
└── Footer
```

### Folder Structure

```
ShopSphere/
│
├── .storybook/
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
│   │   ├── SkeletonCard.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorState.jsx
│   │   └── Footer.jsx
│   │
│   ├── hooks/
│   │   └── useProducts.js
│   │
│   ├── data/
│   │   └── db.json
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── screenshots/
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## Local Setup

Follow these steps to set up and run both the Web Application and Storybook playground on your local machine.

### Prerequisites

Ensure you have **Node.js** (v18.x or higher) and `npm` installed.

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd product-catalog

## 2.install dependencies 

npm install

 ## 3. Start the Mock API Server

npx json-server --watch db.json --port 5001

## 4. Launch the Development Web Application

npm run dev

## 5.Run Storybook

npm run storybook