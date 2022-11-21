import React, { createContext, useContext, useState } from 'react';

export const ShopContext = createContext();

export const StateContext = ({ children }) => {
  //Add our data for the state
  const [qty, setQty] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  //Increase product Quantity
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  //Decrease product Quantity
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  //Add Product to Cart

  //ED version
  //Add Product To Cart
  const onAdd = (product, quantity) => {
    //Total Price
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.Price * quantity
    );

    //Increase total quantity
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    //Check if product is in the cart
    const exist = cartItems.find((item) => item.Slug === product.Slug);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.Slug === product.Slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  //Remove product
  const onRemove = (product) => {
    //Total Price
    setTotalPrice((prevTotalPrice) => prevTotalPrice - product.Price);

    //Remove from total quantities
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);

    //Check if product exists
    const exist = cartItems.find((item) => item.Slug === product.Slug);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.Slug !== product.Slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.Slug === product.Slug
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <ShopContext.Provider
      value={{
        qty,
        increaseQty,
        decreaseQty,
        showCart,
        setShowCart,
        cartItems,
        onAdd,
        onRemove,
        totalQuantities,
        totalPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
