const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Create payment intent endpoint
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, paymentType, description, propertyId, paymentMethod } = req.body;

    // Validate required fields
    if (!amount || !currency || !paymentType || !description) {
      return res.status(400).json({
        error: 'Missing required fields: amount, currency, paymentType, description'
      });
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Ensure amount is an integer
      currency: currency.toLowerCase(),
      metadata: {
        paymentType,
        propertyId: propertyId || '',
        description,
        paymentMethod: paymentMethod || 'card'
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      error: error.message || 'Failed to create payment intent'
    });
  }
});

// Get payment history endpoint
app.get('/api/payment-history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10, offset = 0, type } = req.query;

    // In production, you would fetch from your database
    // For now, we'll return mock data
    const mockPayments = [
      {
        id: 'pi_1',
        amount: 45000000,
        currency: 'ngn',
        status: 'succeeded',
        created: new Date(Date.now() - 86400000 * 7).toISOString(),
        description: 'Property Tax Payment - Victoria Island Apartment',
        type: 'tax',
        propertyId: 'prop_vi_001'
      },
      {
        id: 'pi_2',
        amount: 2500000,
        currency: 'ngn',
        status: 'succeeded',
        created: new Date(Date.now() - 86400000 * 3).toISOString(),
        description: 'Electricity Bill Payment - December 2024',
        type: 'utility'
      }
    ];

    // Filter by type if specified
    let filteredPayments = mockPayments;
    if (type && type !== 'all') {
      filteredPayments = mockPayments.filter(payment => payment.type === type);
    }

    // Apply pagination
    const paginatedPayments = filteredPayments.slice(
      parseInt(offset),
      parseInt(offset) + parseInt(limit)
    );

    res.json({
      payments: paginatedPayments,
      total: filteredPayments.length,
      hasMore: (parseInt(offset) + parseInt(limit)) < filteredPayments.length
    });
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({
      error: 'Failed to fetch payment history'
    });
  }
});

// Webhook endpoint for Stripe events
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed:`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      
      // Here you would:
      // 1. Update your database with the successful payment
      // 2. Record the transaction on the blockchain
      // 3. Send confirmation email to the user
      // 4. Update property/tax/utility status
      // 5. Trigger any necessary business logic
      
      break;
      
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('PaymentIntent failed:', failedPayment.id);
      
      // Handle failed payment
      // 1. Log the failure
      // 2. Notify the user
      // 3. Update payment status in database
      
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

app.listen(PORT, () => {
  console.log(`Lagos PropertyChain API server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;