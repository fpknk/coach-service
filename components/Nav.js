import React from 'react';
import Link from 'next/link';
import ShopContext from '../lib/context';
import { useContext } from 'react';
const { AnimatePresence } = require('framer-motion');

import { FiShoppingBag } from 'react-icons/fi';
import { NavStyles, NavItems } from '../styles/NavStyles';
import Cart from './Cart';
import User from './User';

export default function Nav() {
  const { showCart, setShowCart, totalQuantities } = useContext(ShopContext);
  return (
    <NavStyles>
      <Link href={'/'}>
        <h1>Fit.</h1>
      </Link>
      <NavItems>
        <User />
        <div onClick={() => setShowCart(true)}>
          {totalQuantities > 0 && <span>{totalQuantities}</span>}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyles>
  );
}
