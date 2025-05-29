import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E3B55',
    },
    secondary: {
      main: '#ff4400',
    },
  },
});

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    const index = cartItems.findIndex(item => item.id === productId);
    if (index !== -1) {
      const newCart = [...cartItems];
      newCart.splice(index, 1);
      setCartItems(newCart);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar cartItems={cartItems} />
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <Checkout
                  cartItems={cartItems}
                  clearCart={clearCart}
                />
              }
            />
            <Route
              path="/product/:id"
              element={<ProductDetails onAddToCart={addToCart} />}
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
