// server.js
require = require('esm')(module);

// Import the modules
const lighthouse = require('lighthouse');
const express = require('express');
const chromeLauncher = require('chrome-launcher');

// Create an Express app
const app = express();

// Set the port number
const port = 3000;

// Serve the static files from the public folder
app.use(express.static('public'));

// Handle the POST request for the /audit path
app.post('/audit', async (req, res) => {
  // Get the URL parameter from the query string
  const url = req.query.url;

  // Launch Chrome and run Lighthouse
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info', output: 'json', port: chrome.port};
  const runnerResult = await lighthouse(url, options);

  // Kill Chrome
  await chrome.kill();

  // Get the Lighthouse report as a JSON object
  const report = runnerResult.lhr;

  // Send the report back to the browser as a response
  res.json(report);
});

// Start the server on the port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
