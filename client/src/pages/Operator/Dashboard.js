import React, { useEffect, useState } from 'react';
import "./operatorpanel.css";
import printJS from 'print-js';


const Dashboard = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/getFiles');
        const data = await response.json();
    
        if (data.success && data.files) {
          const fifteenMinutesAgo = new Date(Date.now() - 2 * 60 * 1000); // 5 minutes ago
    
          const recentFiles = data.files.filter(file => {
            const fileModifiedTime = new Date(file.lastModified);
            return fileModifiedTime > fifteenMinutesAgo;
          });
    
          const formattedRows = recentFiles.map((file, index) => ({
            tokenNumber: index + 1, // Serial number
            fileName: file.key,
            copies: 1, // Default value
            typeOfPrint: 'Black & white',
            paperSize: 'A4',
            sides: 'Double-sided',
            status: 'Print',
            url: file.url
          }));
    
          setRows(formattedRows);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
        // Handle error appropriately
      }
    };
    

    fetchFiles();
  }, []);

  const handlePrint = (fileUrl) => {
    console.log(fileUrl);
  
    // Determine the file type from the URL
    const fileType = fileUrl.split('.').pop().toLowerCase();
  
    let printConfig = {
      printable: fileUrl,
      showModal: true, // shows a modal with a loading indicator
      modalMessage: "Document Loading...",
      onError: (err) => console.log(err),
      fallbackPrintable: () => console.log("FallbackPrintable"),      
      onPrintDialogClose: () => console.log('The print dialog was closed')
    };
  
    // Set the type in printJS configuration based on the file type
    if (['pdf'].includes(fileType)) {
      printConfig.type = 'pdf';
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
      printConfig.type = 'image';
    } else {
      console.error('Unsupported file type for printing');
      return;
    }
  
    printJS(printConfig);
  };
  
  
  

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Xerox Shop No 1</h1>
        {/* Profile image should be replaced with actual image path */}
        {/* <img src="path-to-profile-image.jpg" alt="Profile" className="profile-image" /> */}
      </header>

      {/* <section className="summary-cards">
        <div className="card">
          <span className="card-title">General Nos</span>
          <span className="card-value">05</span>
          <span className="card-description">Total no of copies generated</span>
        </div>
        <div className="card">
          <span className="card-title">General Nos</span>
          <span className="card-value">05</span>
          <span className="card-description">No of copies generated today</span>
        </div>
      </section> */}

      <table>
        <thead>
          <tr>
            <th>Token Number</th>
            <th>File Name</th>
            <th>No. of copies</th>
            <th>Type of print</th>
            <th>Paper Size</th>
            <th>Sides</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.tokenNumber}</td>
              <td>{row.fileName}</td>
              <td>{row.copies}</td>
              <td>{row.typeOfPrint}</td>
              <td>{row.paperSize}</td>
              <td>{row.sides}</td>
              <td>
                <button onClick={() => handlePrint(row.url)}>Print</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
