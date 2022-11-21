import React, { useContext } from 'react';
import ShopContext from '../lib/context';
import getStripe from '../lib/getStripe';

import {
  CartWrapper,
  CartStyle,
  Card,
  CardInfo,
  EmptyStyle,
  Checkout,
} from '../styles/CartStyles';
import { Quantity } from '../styles/ServiceDetails';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } =
    useContext(ShopContext);

  //Payment
  const handleCheckout = async () => {
    const stripePromise = await getStripe();
    //fetch from folder api then stripe.js
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });
    const data = await response.json();
    // console.log(data);
    await stripePromise.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <CartWrapper
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCart(false)}
    >
      <CartStyle
        animate={{ x: '5%' }}
        initial={{ x: '0%' }}
        exit={{ x: '50%' }}
        transition={{ type: 'tween' }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1>You have more shopping to do</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        {cartItems.length >= 1 &&
          cartItems.map((item) => {
            return (
              <Card
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.4 } }}
                key={item.Slug}
              >
                <img
                  src={item.Images.data.attributes.formats.thumbnail.url}
                  alt={item.Title}
                />
                <CardInfo>
                  <h3>{item.Title}</h3>
                  <h3>${item.Price}</h3>
                  <Quantity>
                    <span>Quantity</span>
                    <button onClick={() => onRemove(item)}>
                      <AiFillMinusCircle />
                    </button>
                    <p>{item.quantity}</p>
                    <button onClick={() => onAdd(item, 1)}>
                      <AiFillPlusCircle />
                    </button>
                  </Quantity>
                </CardInfo>
              </Card>
            );
          })}
        {cartItems.length >= 1 && (
          <Checkout layout>
            <h3>Subtotal: ${totalPrice} </h3>
            <button onClick={handleCheckout}>Purchase</button>
            <p>Card Info for Testing</p>
            <p>Number: 4242 4242 4242 4242</p>
            <p>Date: 4/24</p>
            <p>CVC: 424</p>
          </Checkout>
        )}
      </CartStyle>
    </CartWrapper>
  );
}
