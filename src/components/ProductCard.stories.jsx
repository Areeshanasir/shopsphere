import ProductCard from "./ProductCard";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../context/CartProvider";

export default {
  title: "Components/ProductCard",
  component: ProductCard,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <CartProvider>
          <Story />
        </CartProvider>
      </BrowserRouter>
    ),
  ],
};

const product = {
  id: 1,
  title: "Wireless Headphones",
  category: "Electronics",
  price: 99,
  rating: 4.8,
  image: "https://picsum.photos/300",
};

export const Default = {
  args: {
    product,
  },
};