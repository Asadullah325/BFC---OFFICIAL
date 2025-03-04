import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const CART_KEY = "cart";
const EMPTY_CART = { items: [], totalPrice: 0, totalCount: 0 };

const CartProvider = ({ children }) => {
  const initCart = getCartFromLocalStorage();

  const [cartItems, setCartItems] = useState(initCart.items);
  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
  const [totalCount, setTotalCount] = useState(initCart.totalCount);

  useEffect(() => {
    const totalPrice = sum(cartItems.map((item) => item.price));
    const totalCount = sum(cartItems.map((item) => item.quantity));

    setTotalPrice(totalPrice);
    setTotalCount(totalCount);

    localStorage.setItem(
      CART_KEY,
      JSON.stringify({ items: cartItems, totalPrice, totalCount })
    );
  }, [cartItems]);

  function getCartFromLocalStorage() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : EMPTY_CART;
  }

  const sum = (items) => {
    return items.reduce((preValue, curValue) => preValue + curValue, 0);
  };

  const removeFromCart = (id) => {
    const filteredItems = cartItems.filter((item) => item.id !== id);
    setCartItems(filteredItems);
  };

  const changeQuantity = (cartItem, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);

    if (quantity < 1) return; // Optionally, prevent quantity from going below 1

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === cartItem.id
          ? {
              ...item,
              quantity: quantity,
              price: item.basePrice * quantity, // Recalculate price based on the base price
            }
          : item
      )
    );
  };

  const addToCart = (food) => {
    const existingItem = cartItems.find((item) => item.id === food.id);
    if (existingItem) {
      changeQuantity(existingItem, existingItem.quantity + 1);
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        { ...food, quantity: 1, price: food.price, basePrice: food.price },
      ]);
    }
  };

  return (
    <>
      <CartContext.Provider
        value={{
          cart: {
            items: cartItems,
            totalPrice,
            totalCount,
          },
          removeFromCart,
          changeQuantity,
          addToCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
