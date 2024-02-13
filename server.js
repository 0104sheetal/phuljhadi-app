const express = require('express');

console.log("Updated");
const bodyParser = require('body-parser');
const { run } = require('./extensions/order-discount-extension/src/run'); // Correct path to run.js

const app = express();

app.use(bodyParser.json()); // for parsing application/json

// Webhook endpoint for cart updates
app.post('/webhook/cart-update', async (req, res) => {
  try {
    const cartData = req.body; // This is the cart data from Shopify's webhook
    const discountResult = run(cartData); // Apply your discount logic from run.js
    res.json(discountResult); // Respond with the discount result
  } catch (error) {
    console.error('Error processing the cart update webhook:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', (req, res) => {
  res.send('Phuljhadi Custom Discount App!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
