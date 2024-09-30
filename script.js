document.getElementById('translateAndSend').addEventListener('click', function() {
    const targetLang = document.getElementById('targetLang').value;
    const inputText = document.getElementById('inputText').value;
  
    if (inputText.trim() === "") {
      alert("Please enter a message.");
      return;
    }
  
    // Fetch translation
    fetch(`https://api.mymemory.translated.net/get?q=${encodeURI(inputText)}&langpair=en|${targetLang}`)
      .then(response => response.json())
      .then(data => {
        const translatedText = data.responseData.translatedText;
  
        // Send translated message to WhatsApp
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: sendMessageToWhatsApp,
            args: [translatedText]
          });
        });
      })
      .catch(error => console.error('Translation error:', error));
  });
  
  // Function to inject into WhatsApp Web to send the translated message
  function sendMessageToWhatsApp(translatedText) {
    const messageBox = document.querySelector('div[contenteditable="true"]');
    const event = new InputEvent('input', { bubbles: true });
  
    if (messageBox) {
      messageBox.textContent = translatedText;
      messageBox.dispatchEvent(event);
  
      // Simulate Enter key press to send the message
      const enterEvent = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        keyCode: 13
      });
      messageBox.dispatchEvent(enterEvent);
    }
  }
  