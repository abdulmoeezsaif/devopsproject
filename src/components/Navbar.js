import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ cartItems }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2E3B55' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          TechShop
        </Typography>
        <IconButton 
          color="inherit" 
          onClick={() => navigate('/cart')}
          aria-label="cart"
        >
          <Badge badgeContent={cartItems?.length || 0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 