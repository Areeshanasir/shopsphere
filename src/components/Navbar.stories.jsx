import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../context/CartProvider";

export default {
  title: "Components/Navbar",
  component: Navbar,
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

export const Default = {};