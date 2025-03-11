document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("toggleCors");
    const siteDisplay = document.getElementById("currentSite");
  
    // Get current tab's URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs.length) return;
      
      const url = new URL(tabs[0].url);
      const hostname = url.hostname;
      siteDisplay.textContent = `Current Site: ${hostname}`;
  
      // Load whitelist
      chrome.storage.sync.get("corsWhitelist", (data) => {
        const whitelist = data.corsWhitelist || [];
        button.textContent = whitelist.includes(hostname) ? "Disable CORS for this site" : "Enable CORS for this site";
      });
  
      // Handle button click
      button.addEventListener("click", () => {
        chrome.storage.sync.get("corsWhitelist", (data) => {
          let whitelist = data.corsWhitelist || [];
  
          if (whitelist.includes(hostname)) {
            whitelist = whitelist.filter(site => site !== hostname);
          } else {
            whitelist.push(hostname);
          }
  
          chrome.storage.sync.set({ corsWhitelist: whitelist }, () => {
            button.textContent = whitelist.includes(hostname) ? "Disable CORS for this site" : "Enable CORS for this site";
          });
        });
      });
    });
  });
  