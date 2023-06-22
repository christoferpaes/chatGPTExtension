document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById("get-response");
  const responseContainer = document.getElementById("response");

  button.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tabId = tabs[0].id;
      chrome.tabs.sendMessage(tabId, { message: "get_chat_response" }, function(response) {
        responseContainer.textContent = response;
      });
    });
  });
});
