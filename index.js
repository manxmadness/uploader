/*
 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/


/*
 * Import required packages.
 * Packages should be installed with "npm install".
 */
const express = require('express');
const aws = require('aws-sdk');
const THREE = require('three');

/*
 * Set-up and run the Express app.
 */
const app = express();
const dataFile = require('./lib/untitled-scene.json')

app.set('views', './views');
app.use("/lib", express.static(__dirname + "/lib"));
// console.log(__dirname + "/lib")
// app.use(express.static('./public'));
// app.use(express.static('./lib'));
// app.use(express.static('./assets'));
app.engine('html', require('ejs').renderFile);
app.listen(process.env.PORT || 3000);
console.log(process.env.PORT)
// console.log(THREE)

/*
 * Configure the AWS region of the target bucket.
 * Remember to change this to the relevant region.
 */
aws.config.region = 'us-east-1';

/*
 * Load the S3 information from the environment variables.
 */
const S3_BUCKET = process.env.S3_BUCKET;

/*
 * Respond to GET requests to /account.
 * Upon request, render the 'account.html' web page in views/ directory.
 */
app.get('/', (req, res) => res.render('account.html'))

app.get('/render', (req, res) => {
    res.render('three.html')
})
// {
  // console.log(req.query.img)
  // res.send('<div>hi<div/>')
  // res.json({img:req.query.img})
// })
/*
 * Respond to GET requests to /sign-s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and
 * the anticipated URL of the image.
 */
app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});
