const express = require('express');
const cors = require('cors');
const multer = require('multer'); // Required for file uploads
require('dotenv').config();

const app = express();

// Set up file upload destination and filename for multer
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Serve the HTML form to upload files
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Handle file upload and respond with file metadata
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // Check if file exists in the request
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Return the file metadata in the response
  const fileMetadata = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };

  res.json(fileMetadata);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
