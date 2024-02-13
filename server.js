const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();

// Replace 'SHOPIFY_SHARED_SECRET' with your actual Shopify shared secret
const SHOPIFY_SHARED_SECRET = 'your_shared_secret_here';

// Body parser middleware to handle JSON payloads and raw body for verification
app.use(bodyParser.json({
  verify: function(req, res, buf) {
    req.rawBody = buf;
  }
}));

// Route for Shopify webhooks
app.post('/webhook', (req, res) => {
  const hmacHeader = req.get('X-Shopify-Hmac-Sha256');
  const generatedHash = crypto
    .createHmac('sha256', SHOPIFY_SHARED_SECRET)
    .update(req.rawBody, 'utf8')
    .digest('base64');

  if (generatedHash === hmacHeader) {
    // The webhook is verified
    console.log('Webhook verified and received:', req.body);

    // Here you would handle the checkout update, apply discounts, etc.
    // Add your custom logic here

    res.status(200).send('Webhook processed');
  } else {
    // If the HMAC verification fails
    console.log('Webhook verification failed');
    res.status(403).send('Forbidden');
  }
});

// Default route for the root
app.get('/', (req, res) => {
  res.send('Phuljhadi Custom Discount App!!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
