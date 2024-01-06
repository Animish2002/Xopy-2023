import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadPage.css';
import axios from 'axios';


function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const UploadPage = () => {
    const navigate = useNavigate();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileUploadCount, setFileUploadCount] = useState(0);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
        setFileUploadCount(prevCount => prevCount + 1);
    };

    const removeFile = (index) => {
        setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const goToSetPreferences = () => {
        navigate('/setpreferences', { state: { uploadedFiles } });
    };

    const handleCancel = () => {
        // Reload the webpage
        window.location.reload();
    };


    const handleUpload = async () => {
        alert('Sending to print...');
        const fileContents = await Promise.all(
            Array.from(uploadedFiles).map(async file => ({
                [file.name]: await fileToBase64(file)
            }))
        );
        const payload = Object.assign({}, ...fileContents);
        try {
            const response = await axios.post('http://localhost:8080/api/v1/upload/', payload
             // method: 'POST',
                // body: formData,
                
            );
    
            if (response.ok) {
                alert('Upload successful');
                // Optionally, handle further logic upon successful upload
            } else {
                alert('Upload failed');
                // Handle upload failure
            }
        } catch (error) {
            alert('Error during file upload: ' + (error.message || 'Unknown error'));
            // Handle network errors or other exceptions
        }
    };


    return (
        <div className="upload-container">
            <div className="logo">X⊚py</div>
            <h1 className="title">Xerox Shop No 1</h1>
            <div className="document-display">
                {uploadedFiles.length === 0 ? (
                    <p>No documents uploaded!</p>
                ) : (
                    uploadedFiles.map((file, index) => (
                        <div key={index} className="uploaded-document">
                            {file.name}
                            <button onClick={() => removeFile(index)} className="remove-file-btn">✖</button>
                        </div>
                    ))
                )}
            </div>
            <label className="upload-button">
                <input type="file" id="fileInput" multiple onChange={handleFileChange} />
                {fileUploadCount === 0 ? 'Upload Document ↑' : 'Upload More Files'}
            </label>
            <div className="actions">
                <button onClick={handleUpload} className="upload-btn">Upload Files</button>
                <button onClick={goToSetPreferences}  className="continue-btn">Continue</button>
                <button onClick={handleCancel} className="cancel-btn">Cancel</button>
            </div>
        </div>
    );
};

export default UploadPage;


{/* <input type="file" id="fileInput" multiple accept=".pdf" onChange={handleFileChange} /> */} // upload restrited only for pdf file code
