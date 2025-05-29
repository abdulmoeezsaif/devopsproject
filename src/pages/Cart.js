import React from 'react';
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Paper,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {cartItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{ width: 50, height: 50, mr: 2, objectFit: 'cover' }}
                />
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <Typography variant="h6" gutterBottom>
            Total: ${calculateTotal()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/checkout')}
            sx={{ mt: 2 }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Cart; 