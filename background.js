// background.js

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'math_equation') {
    // Send the math equation to ChatGPT and handle the response
    sendToChatGPT(request.equation, function (response) {
      // Send the response back to the content script
      sendResponse({ message: 'chat_response', response: response });
    });

    // Return true to indicate that the response will be sent asynchronously
    return true;
  }
});

function sendToChatGPT(equation, callback) {
  // Make the API request to ChatGPT using equation
  // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
  const apiKey = 'YOUR_OPENAI_API_KEY';
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: equation,
      max_tokens: 50
    })
  })
    .then(response => response.json())
    .then(data => {
      const chatResponse = data.choices[0].text.trim();
      callback(chatResponse);
    })
    .catch(error => {
      console.error('Error:', error);
      callback('An error occurred while processing the request.');
    });
}

