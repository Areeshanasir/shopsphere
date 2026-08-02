import { createContext, useContext } from "react";
import { useMachine } from "@xstate/react";
import { cartMachine } from "../machines/cartMachine";
import { Toaster } from "react-hot-toast";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, send] = useMachine(cartMachine);

  return (
    <CartContext.Provider
      value={{
        cart: state.context.items,
        send,
      }}
    >
      {children}
      <Toaster position="top-right" />
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}