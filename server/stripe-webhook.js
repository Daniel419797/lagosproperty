// Backend webhook handler for Stripe events
// This would typically be deployed as a separate Node.js server

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

// Webhook endpoint for Stripe events
app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!');
      
      // Update database with successful payment
      // Record transaction on blockchain
      // Send confirmation email
      // Update property/tax/utility status
      
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.json({received: true});
});

// Create payment intent endpoint
app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency, paymentType, description, propertyId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        paymentType,
        propertyId: propertyId || '',
        description
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

app.listen(3001, () => console.log('Stripe webhook server running on port 3001'));