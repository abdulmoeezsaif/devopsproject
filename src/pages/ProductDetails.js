import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Box,
  Rating,
  Avatar,
  Divider
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// Mock reviews data (in a real app, this would come from a backend)
const mockReviews = [
  {
    id: 1,
    user: "John Doe",
    rating: 5,
    comment: "Excellent product! Exactly what I was looking for.",
    date: "2024-02-15"
  },
  {
    id: 2,
    user: "Jane Smith",
    rating: 4,
    comment: "Good quality, but shipping took a bit longer than expected.",
    date: "2024-02-10"
  },
  {
    id: 3,
    user: "Mike Johnson",
    rating: 5,
    comment: "Perfect! Will definitely buy again.",
    date: "2024-02-05"
  }
];

const ProductDetails = ({ onAddToCart }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Product not found
        </Typography>
      </Container>
    );
  }

  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Grid container spacing={4}>
        {/* Left side - Product Image */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'contain'
              }}
            />
          </Paper>
        </Grid>

        {/* Right side - Product Details */}
        <Grid item xs={12} md={6}>
          <Box sx={{ pl: { md: 4 } }}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={averageRating} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({mockReviews.length} reviews)
              </Typography>
            </Box>
            <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
              ${product.price}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              {product.description}
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => onAddToCart(product)}
              sx={{ width: '100%', maxWidth: '400px' }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>

        {/* Reviews Section */}
        <Grid item xs={12}>
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" gutterBottom>
              Customer Reviews
            </Typography>
            <Divider sx={{ mb: 4 }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Typography variant="h6" sx={{ mr: 2 }}>
                Overall Rating:
              </Typography>
              <Rating value={averageRating} precision={0.5} readOnly />
              <Typography variant="body1" sx={{ ml: 1 }}>
                ({averageRating.toFixed(1)})
              </Typography>
            </Box>

            {/* Individual Reviews */}
            {mockReviews.map((review) => (
              <Paper key={review.id} sx={{ p: 3, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2 }}>{review.user[0]}</Avatar>
                  <Box>
                    <Typography variant="subtitle1">{review.user}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating value={review.rating} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {review.date}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body1">
                  {review.comment}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails; 