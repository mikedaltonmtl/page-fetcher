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

const writeHtmlToFile = function() {

  request(url, (error, response, body) => {
      
    // print the error if one occurred
    console.log('request error:', error);
  
    // print the response status code if a response was received
    console.log('statusCode:', response && response.statusCode);

    // write the HTML to the given file
    fs.writeFile(path, body, err => {
      if (err) {
        console.error(`Could not write the file, invalid file path caused error: ${err.code}`);
      } else {
        // file written successfully, get file size
        fs.stat(path, (err, stats) => {
          if (err) {
            console.error('error executing fs.stat', err);
            return;
          }
          // print result to console
          console.log(`Download and saved ${stats.size} bytes to ${path}`);
        });
      }
    });
  });
};

// check whether given file already exists
fs.access(path, (err) => {

  if (err) {
    console.log('err.code', err.code);
    // file does not already exist, continue with the writeFile commands
    console.log(`file ${path} does not exist, continue writing...`);
    writeHtmlToFile();

  } else {
    // file exists, prompt user for overwrite permission
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`${path} exists already, enter 'y' to overwrite?\n> `, answer => {
      if (answer.toUpperCase() === 'Y') {
        // we have permission to overwrite file, continue
        writeHtmlToFile();

      } else {
        // permission to writeFile denied
        console.log(`Operation failed, permission denied to overwrite ${path} denied.`);
      }
      readline.close(); // in both cases, close the interface
      });
  }
});

// example output -------------------------------------------------
// > node fetcher.js http://www.example.edu/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html