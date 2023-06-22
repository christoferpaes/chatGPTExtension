function extractMathEquation() {
  const mathEquationElement = document.querySelector(".questionwrap.questionpane .MathJax-Element-14-Frame");
  const mathEquation = mathEquationElement.getAttribute("data-mathml");
  return mathEquation;
}

function sendMessageToBackgroundScript(message, data, callback) {
  chrome.runtime.sendMessage({ message, data }, response => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      callback("");
    } else {
      callback(response);
    }
  });
}

function handleChatGPTResponse(response) {
  const generatedText = response;
  console.log("Generated Text:", generatedText);
  // Perform further actions with the generated text as needed
}

function processWebpage() {
  const mathEquation = extractMathEquation();
  const prompt = `Given the math equation: ${mathEquation}`;

  sendMessageToBackgroundScript("math_equation", prompt, handleChatGPTResponse);
}

processWebpage();
