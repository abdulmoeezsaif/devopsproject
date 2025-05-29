import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CardActionArea
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        m: 1
      }}
    >
      <CardActionArea onClick={() => navigate(`/product/${product.id}`)}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" color="primary">
              ${product.price}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAddToCart}
              size="small"
            >
              Add to Cart
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard; 