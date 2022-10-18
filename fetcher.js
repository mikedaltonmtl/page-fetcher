const request = require('request');
const fs = require('fs');
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
const url = process.argv[2];
const path = process.argv[3];

request(url, (error, response, body) => {

  // Print the error if one occurred
  console.log('error:', error);

  // Print the response status code if a response was received
  console.log('statusCode:', response && response.statusCode);

  // write the HTML to the given file
  fs.writeFile(path, body, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
    fs.stat(path, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
      // print the file size to the console
      console.log(stats.size); // 1024000 = 1MB

      // print result to console
      console.log(`Download and saved ${stats.size} bytes to ${path}`);
    });
  });

});

// example output -------------------------------------------------

// > node fetcher.js http://www.example.edu/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html