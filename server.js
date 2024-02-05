const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Define a route to handle the cart update webhook
app.post('/webhooks/cart/update', (req, res) => {
  // Handle the cart update event here
  const cartUpdateData = req.body; // This will contain information about the cart update

  // Add a console log to indicate that the webhook was triggered
  console.log('Webhook received - Cart Update Event');

  // Trigger your discount calculation logic from 'run.js' here
  const discountResult = run(cartUpdateData);

  // Add a console log to indicate that the discount calculation logic was executed
  console.log('Discount calculation logic executed:', discountResult);

  // Respond with a 200 OK status to acknowledge receipt of the webhook
  res.status(200).end();
});

app.get('/', (req, res) => {
   res.send('Phuljhadi Custom Discount App!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
