// client/src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav>
      <Link to="/" className="logo">MyStore</Link>
      <div>
        {token ? (
          <>
            <Link to="/cart">Cart ({cartItemCount})</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/cart">Cart ({cartItemCount})</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;