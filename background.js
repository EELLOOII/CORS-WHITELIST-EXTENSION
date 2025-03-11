let whitelist = [];
const blockedSites = ["google.com", "paypal.com", "bank.com"]; // Do not modify CORS for these

// Load whitelist from storage
chrome.storage.sync.get("corsWhitelist", (data) => {
  whitelist = data.corsWhitelist || [];
});

// Listen for whitelist updates
chrome.storage.onChanged.addListener((changes) => {
  if (changes.corsWhitelist) {
    whitelist = changes.corsWhitelist.newValue;
  }
});

// Modify headers if the site is in the whitelist
function modifyHeaders(details) {
  const url = new URL(details.url);
  if (!whitelist.includes(url.hostname) || blockedSites.some(site => url.hostname.includes(site))) {
    return {}; // Don't modify headers if site is not whitelisted
  }

  let headers = details.responseHeaders || [];
  headers = headers.map(header => {
    if (header.name.toLowerCase() === "access-control-allow-origin") {
      header.value = "*";
    }
    if (header.name.toLowerCase() === "access-control-allow-headers") {
      header.value = "*";
    }
    if (header.name.toLowerCase() === "access-control-allow-methods") {
      header.value = "GET, POST, PUT, DELETE, OPTIONS";
    }
    return header;
  });

  return { responseHeaders: headers };
}

// Listen for HTTP responses
chrome.webRequest.onHeadersReceived.addListener(
  modifyHeaders,
  { urls: ["<all_urls>"] },
  ["blocking", "responseHeaders"]
);
