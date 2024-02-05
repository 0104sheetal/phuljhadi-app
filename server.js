const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const { run } = require('./extensions/order-discount-extension/src/run');

app.post('/webhooks/cart/update', (req, res) => {
  const cartUpdateData = req.body; 

  const timestamp = new Date().toISOString();
  console.log(`Webhook received - Cart Update Event at ${timestamp}`);

  const discountResult = run(cartUpdateData);

  console.log(`Discount calculation logic executed at ${timestamp}:`, discountResult);

  res.status(200).end();
});

app.get('/', (req, res) => {
   res.send('Phuljhadi Custom Discount App!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
