// Translate all visible chat messages to the target language
function translateChatMessages(targetLang) {
    const messages = document.querySelectorAll('.message-in .copyable-text span');
    
    messages.forEach(message => {
      const originalText = message.innerText;
      fetch(`https://api.mymemory.translated.net/get?q=${encodeURI(originalText)}&langpair=en|${targetLang}`)
        .then(response => response.json())
        .then(data => {
          const translatedText = data.responseData.translatedText;
          message.innerText = translatedText;
        })
        .catch(error => console.error('Translation error:', error));
    });
  }
  