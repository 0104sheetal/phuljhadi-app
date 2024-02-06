const express = require('express');
const bodyParser = require('body-parser');
const { run } = require('./extensions/order-discount-extension/src/run'); // Adjust the import path
const app = express();

app.use(bodyParser.json());

app.post('/webhook/cart-update', (req, res) => {
  const webhookData = req.body;

  // Call the 'run' function to calculate discounts based on the webhook data
  const discounts = run(webhookData);

  // Implement code to apply the 'discounts' to the cart or perform other actions here

  // Respond with a success status
  res.status(200).send('Webhook received and processed successfully');
});

app.get('/', (req, res) => {
   res.send('Phuljhadi Custom Discount App!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
