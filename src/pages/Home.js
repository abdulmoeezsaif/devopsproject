import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = ({ onAddToCart }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Featured Products
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 