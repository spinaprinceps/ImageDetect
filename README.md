
# 🖼 Image Classification 

A simple React + Express app that classifies uploaded images using Hugging Face's image classification API.

* Upload an image from your device
* Backend sends the image to Hugging Face's API
* Get and display the top predicted label and confidence score

## 🔧 Setup

1. Clone the repo

2. Backend

* Navigate to /server

* Run npm install

* Add a .env file with:

  HUGGINGFACE\_API\_KEY=your\_api\_key

* Start the server: node index.js

3. Frontend

* Navigate to /client
* Run npm install
* Start app: npm run dev

