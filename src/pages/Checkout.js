import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  Grid,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems, clearCart }) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const steps = ['Shipping Details', 'Payment Method', 'Review Order'];

  const handleShippingDetailsChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const isShippingFormValid = () => {
    return Object.values(shippingDetails).every(value => value.trim() !== '');
  };

  const handleNext = () => {
    if (activeStep === 0 && !isShippingFormValid()) {
      alert('Please fill in all shipping details');
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleConfirmOrder = () => {
    // Here you would typically send the order to a backend server
    alert('Order placed successfully! Thank you for shopping with us.');
    clearCart();
    navigate('/');
  };

  const renderShippingForm = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="First Name"
          name="firstName"
          value={shippingDetails.firstName}
          onChange={handleShippingDetailsChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Last Name"
          name="lastName"
          value={shippingDetails.lastName}
          onChange={handleShippingDetailsChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={shippingDetails.email}
          onChange={handleShippingDetailsChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Address"
          name="address"
          value={shippingDetails.address}
          onChange={handleShippingDetailsChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="City"
          name="city"
          value={shippingDetails.city}
          onChange={handleShippingDetailsChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="State"
          name="state"
          value={shippingDetails.state}
          onChange={handleShippingDetailsChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="ZIP Code"
          name="zipCode"
          value={shippingDetails.zipCode}
          onChange={handleShippingDetailsChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Phone"
          name="phone"
          value={shippingDetails.phone}
          onChange={handleShippingDetailsChange}
        />
      </Grid>
    </Grid>
  );

  const renderPaymentMethod = () => (
    <FormControl component="fieldset">
      <FormLabel component="legend">Payment Method</FormLabel>
      <RadioGroup
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
      >
        <FormControlLabel
          value="credit"
          control={<Radio />}
          label="Credit Card"
        />
        <FormControlLabel
          value="debit"
          control={<Radio />}
          label="Debit Card"
        />
        <FormControlLabel
          value="paypal"
          control={<Radio />}
          label="PayPal"
        />
      </RadioGroup>
    </FormControl>
  );

  const renderOrderReview = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      {cartItems.map((item) => (
        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>{item.name}</Typography>
          <Typography>${item.price}</Typography>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Total:</Typography>
        <Typography variant="h6">${calculateTotal()}</Typography>
      </Box>
      <Typography variant="h6" gutterBottom>
        Shipping Details
      </Typography>
      <Typography>
        {shippingDetails.firstName} {shippingDetails.lastName}
      </Typography>
      <Typography>{shippingDetails.address}</Typography>
      <Typography>
        {shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}
      </Typography>
      <Typography gutterBottom>{shippingDetails.email}</Typography>
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Payment Method
      </Typography>
      <Typography>
        {paymentMethod === 'credit' && 'Credit Card'}
        {paymentMethod === 'debit' && 'Debit Card'}
        {paymentMethod === 'paypal' && 'PayPal'}
      </Typography>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 4, mb: 4 }}>
          {activeStep === 0 && renderShippingForm()}
          {activeStep === 1 && renderPaymentMethod()}
          {activeStep === 2 && renderOrderReview()}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Checkout; 