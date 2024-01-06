import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SetPreferences.css';

const SetPreferencesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const uploadedFiles = state?.uploadedFiles || [];
  const [showPreferences, setShowPreferences] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [filePreferences, setFilePreferences] = useState({});

  const handleCustomizeClick = (file) => {
    setCurrentFile(file);
    setShowPreferences(true);
  };

  const savePreferences = (file, preferences) => {
    setFilePreferences(prev => ({ ...prev, [file.name]: preferences }));
  };

  const handleNextClick = () => {
    navigate('/printstatus');
  };

  return (
    <div className="document-uploader">
      <header className="header">
        <img src="logo.png" alt="Xerox Logo" className="logo" />
        <h1>Xerox Shop No 1</h1>
      </header>
      <main className="main-content">
        <h2>Uploaded Documents</h2>
        <div className="document-list">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="document-item">
              <span className="document-name">{file.name}</span>
              <button 
                className="customize-button"
                onClick={() => handleCustomizeClick(file)}
              >
                Customize
              </button>
              <span className="document-time">{new Date().toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </main>
      <footer className="footer">
        <button className="upload-more-button">Upload More Files</button>
        <button className="next-button" onClick={handleNextClick}>
          Next
        </button>
      </footer>
      {showPreferences && (
        <PrintPreferencesPopup
          file={currentFile}
          onClose={() => setShowPreferences(false)}
          onSave={savePreferences}
        />
      )}
    </div>
  );
};

const PrintPreferencesPopup = ({ file, onClose, onSave }) => {
  const [preferences, setPreferences] = useState({
    numCopies: 1,
    colorOption: 'Black & White',
    printSide: 'Single sided',
  });

  const handleSave = () => {
    onSave(file, preferences);
    onClose();
  };

  return (
    <div className="preferences-popup">
      <div className="popup-content">
        <h3>Print Preferences for {file.name}</h3>
        <div className="preference">
          <label>How many copies do you need?</label>
          <input 
            type="number" 
            value={preferences.numCopies} 
            onChange={(e) => setPreferences({ ...preferences, numCopies: Number(e.target.value) })} 
            min="1"
          />
        </div>
        <div className="preference">
          <label>Choose one of the following options</label>
          <select 
            value={preferences.colorOption} 
            onChange={(e) => setPreferences({ ...preferences, colorOption: e.target.value })}
          >
            <option value="Black & White">Black & White</option>
            <option value="Colored Print">Colored Print</option>
          </select>
        </div>
        <div className="preference">
          <label>Choose one of the following options</label>
          <select 
            value={preferences.printSide} 
            onChange={(e) => setPreferences({ ...preferences, printSide: e.target.value })}
          >
            <option value="Single sided">Single sided</option>
            <option value="Double sided">Double sided</option>
          </select>
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SetPreferencesPage;
