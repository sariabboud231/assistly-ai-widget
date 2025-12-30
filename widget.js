(function () {
  const clientId = "barber_assist_ai"; // your client ID
  const workerURL = "https://roughbush260.mygmailname.workers.dev"; // your Worker URL

  async function sendMessage(message) {
    const res = await fetch(workerURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId, message })
    });
    return res.json();
  }

  window.sendAssistAIMessage = sendMessage;
})();
