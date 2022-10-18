const request = require('request');
/**
 * Implement a node app called fetcher.js.
 * 
 * It should take two command line arguments:
 * - a URL
 * - a local file path
 * 
 * It should download the resource at the URL to the local path on your machine.
 * Upon completion, it should print out a message like:
 * "Downloaded and saved 1235 bytes to ./index.html".
 */
 request('http://www.google.com', (error, response, body) => {

 // Print the error if one occurred
  console.log('error:', error);

  // Print the response status code if a response was received
  console.log('statusCode:', response && response.statusCode);
  
  // Print the HTML for the Google homepage.
  console.log('body:', body);
  
});




// example output -------------------------------------------------

// > node fetcher.js http://www.example.edu/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html