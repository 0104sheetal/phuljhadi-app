const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();

// Body parser middleware to handle JSON payloads
app.use(bodyParser.json({ verify: (req, res, buf) => {
  req.rawBody = buf;
}}));

// The route for Shopify webhooks
app.post('/webhook', (req, res) => {
  const hmac = req.get('X-Shopify-Hmac-Sha256');
  const hash = crypto
    .createHmac('sha256', 'SHOPIFY_SHARED_SECRET')
    .update(req.rawBody, 'utf8', 'hex')
    .digest('base64');

  if (hash === hmac) {
    console.log('Webhook verified');
    // Handle the webhook data
    console.log(req.body);

    res.status(200).send('Webhook received');
  } else {
    console.log('Webhook verification failed');
    res.status(403).send('Forbidden');
  }
});

app.get('/', (req, res) => {
  res.send('Phuljhadi Custom Discount App!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
