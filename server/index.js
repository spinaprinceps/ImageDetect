// Required modules
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // For environment variables (.env)

// Create an Express app
const app = express();
const PORT = 5000;

// Enable CORS (Cross-Origin Resource Sharing) to allow frontend (React) to communicate
app.use(cors());

// Set up Multer for file uploads - we will store the file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST route to handle image upload and object detection request
app.post('/api/detect', upload.single('image'), async (req, res) => {
  try {
    // Ensure file exists in the request
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    // Prepare image data to send to Hugging Face API
    const imageBuffer = req.file.buffer;

    // Hugging Face API endpoint for object detection (facebook/detr-resnet-50)
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/detr-resnet-50',
      imageBuffer,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/octet-stream',
        },
      }
    );

    // Send the response back to the frontend with detected objects
    res.json(response.data);
  } catch (error) {
    console.error('Error during detection:', error.message);
    res.status(500).json({ error: 'Error processing image' });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
