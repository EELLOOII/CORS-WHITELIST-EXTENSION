document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("whitelist");
    const input = document.getElementById("newSite");
    const addButton = document.getElementById("addSite");
  
    function updateList() {
      chrome.storage.sync.get("corsWhitelist", (data) => {
        const whitelist = data.corsWhitelist || [];
        list.innerHTML = "";
        whitelist.forEach((site) => {
          const li = document.createElement("li");
          li.textContent = site;
          const removeBtn = document.createElement("button");
          removeBtn.textContent = "Remove";
          removeBtn.onclick = () => {
            chrome.storage.sync.set({
              corsWhitelist: whitelist.filter(s => s !== site)
            }, updateList);
          };
          li.appendChild(removeBtn);
          list.appendChild(li);
        });
      });
    }
  
    addButton.addEventListener("click", () => {
      const newSite = input.value.trim();
      if (!newSite) return;
      chrome.storage.sync.get("corsWhitelist", (data) => {
        let whitelist = data.corsWhitelist || [];
        if (!whitelist.includes(newSite)) {
          whitelist.push(newSite);
          chrome.storage.sync.set({ corsWhitelist: whitelist }, updateList);
        }
      });
      input.value = "";
    });
  
    updateList();
  });
  