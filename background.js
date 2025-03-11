chrome.runtime.onStartup.addListener(updateCorsRules);
chrome.runtime.onInstalled.addListener(updateCorsRules);

function updateCorsRules() {
  chrome.storage.sync.get("corsWhitelist", (data) => {
    const whitelist = data.corsWhitelist || [];

    let rules = whitelist.map((hostname, index) => ({
      id: index + 1,
      priority: 1,
      action: {
        type: "modifyHeaders",
        responseHeaders: [
          { header: "Access-Control-Allow-Origin", operation: "set", value: "*" },
          { header: "Access-Control-Allow-Methods", operation: "set", value: "GET,POST,PUT,DELETE,OPTIONS" }
        ]
      },
      condition: { urlFilter: `*://${hostname}/*`, resourceTypes: ["xmlhttprequest"] }
    }));

    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: whitelist.map((_, index) => index + 1),
      addRules: rules
    });
  });
}
