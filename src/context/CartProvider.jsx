import { createContext, useContext } from "react";
import { useMachine } from "@xstate/react";
import { cartMachine } from "../machines/cartMachine";

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
</CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}