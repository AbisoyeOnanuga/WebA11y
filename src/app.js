// app.js
const lighthouse = require('lighthouse');
const config = require('../public/custom-audit/custom-config');

// Get the elements from the page
const urlInput = $('#url-input');
const auditButton = $('#audit-button');
const auditResult = $('#audit-result');

// Import the modules
const ReportRenderer = require('node_modules/lighthouse/lighthouse-core/report/report-renderer.js');
const DOM = require('node_modules/lighthouse/lighthouse-core/report/html/renderer/dom.js');

// Create a new instance of the ReportRenderer class
const dom = new DOM(document);
const renderer = new ReportRenderer(dom);

// Get the div element where you want to show the results
const resultsDiv = document.getElementById('#audit-result');

// Call the renderReport method and pass the report JSON and the div element
renderer.renderReport(report, resultsDiv);


// Create a speech recognition object
const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';

// Handle the speech recognition events
recognition.onresult = function(event) {
  // Get the transcript of the speech
  const transcript = event.results[0][0].transcript;
  // Set the input value to the transcript
  urlInput.val(transcript);
  // Run the audit
  runAudit();
};

recognition.onerror = function(event) {
  // Handle the error
  console.error(event.error);
};

// Handle the form submission event
$('#audit-form').submit(function(event) {
  // Prevent the default behavior
  event.preventDefault();
  // Run the audit
  runAudit();
});

// Define a function to run the audit
function runAudit() {
  // Get the URL from the input
  const url = urlInput.val();
  // Validate the URL
  if (!isValidUrl(url)) {
    // Show an error message
    alert('Please enter a valid URL');
    return;
  }
  // Disable the button
  auditButton.prop('disabled', true);
  // Clear the result
  auditResult.empty();
  // Run Lighthouse with the URL and the custom configuration
  lighthouse(url, {}, config).then(results => {
    // Enable the button
    auditButton.prop('disabled', false);
    // Generate the report
    const report = lighthouse.ReportGenerator.generateReportHtml(results.lhr);
    // Show the report
    auditResult.html(report);
  }).catch(error => {
    // Handle the error
    console.error(error);
    // Show an error message
    alert('Something went wrong. Please try again.');
  });
}

// Validate the URL
if (url && isValidUrl(url)) {
  // Send a POST request to the server with the URL as a query parameter
  fetch('/audit?url=' + url, {method: 'POST'})
    .then(response => response.json()) // Parse the response as a JSON object
    .then(report => {
      // Do something with the report, such as displaying it on the webpage
    })
    .catch(error => {
      // Handle the error
    });
} else {
  // Show an error message
}
