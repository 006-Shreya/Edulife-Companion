const chatContainer = document.getElementById('chatContainer');
let loadingMsg = null;

function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (message === '') return;

  appendMessage(message, 'user');
  input.value = '';
  input.focus();

  showLoading();

  fetch(apiUrl(API_CONFIG.endpoints.chat), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  })
    .then((res) => res.json())
    .then((data) => {
      hideLoading();
      appendMessage(data.reply, 'ai');
    })
    .catch(() => {
      hideLoading();
      appendMessage("Sorry, I couldn't connect to the AI.", 'ai');
    });
}

function appendMessage(text, sender) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showLoading() {
  hideLoading();
  loadingMsg = document.createElement('div');
  loadingMsg.className = 'loading';
  loadingMsg.textContent = 'AI is typing...';
  chatContainer.appendChild(loadingMsg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function hideLoading() {
  if (loadingMsg) {
    chatContainer.removeChild(loadingMsg);
    loadingMsg = null;
  }
}

function handleEnter(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}
