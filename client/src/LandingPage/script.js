// script.js
document.addEventListener("DOMContentLoaded", function() {
        // Array of mission statements
        const missionStatements = [
          "A Cloud Based Platform",
          "Convenience",
          "Secure and Direct"
        ];
      
        // Get the mission statement element
        const missionStatementElement = document.getElementById("missionStatement");
      
        // Set initial mission statement
        missionStatementElement.textContent = missionStatements[0];
      
        // Change the mission statement every 2 seconds
        let index = 1;
        setInterval(function() {
          missionStatementElement.textContent = missionStatements[index];
          index = (index + 1) % missionStatements.length;
        }, 200);
      });
      