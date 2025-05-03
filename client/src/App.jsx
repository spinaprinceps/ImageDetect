import { useState } from "react";
import axios from "axios";
import "./App.css";  // Assuming you are using regular CSS instead of Tailwind CSS

function App() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile)); // Set image URL for display
    setResponse(null); // Clear previous results when a new file is selected
  };

  // Handle file upload to backend
  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:5000/api/detect", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResponse(res.data); // Set the response containing detected objects
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="upload-box">
        <h1>Image Detection</h1>
        
        {/* Image Preview */}
        {imageUrl && <img src={imageUrl} alt="Uploaded Preview" className="image-preview" />}
        
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
        <button
          onClick={handleUpload}
          className="upload-btn"
        >
          {loading ? "Processing..." : "Upload Image"}
        </button>

        {response && (
          <div className="result">
            <h2>Detected Objects:</h2>
            <ul>
              {response.map((item, index) => (
                <li key={index}>
                  <strong>{item.label}</strong> ({(item.score * 100).toFixed(2)}%)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
