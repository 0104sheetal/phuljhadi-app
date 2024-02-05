// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Parse JSON request bodies
app.use(bodyParser.json());

// Define a route to handle the cart update webhook
app.post('/webhooks/cart/update', (req, res) => {
  // Handle the cart update event here
  const cartUpdateData = req.body; // This will contain information about the cart update

  // Trigger your discount calculation logic from 'run.js' here
  const discountResult = run(cartUpdateData);

  // Respond with a 200 OK status to acknowledge receipt of the webhook
  res.status(200).end();
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
