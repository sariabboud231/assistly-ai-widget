(function () {
  const allowedDomain = "assist-ai.myshopify.com";
  if (window.location.hostname !== allowedDomain) {
    console.warn("Assist AI blocked on this domain");
    return;
  }

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

  // Attach function to window for testing / optional usage
  window.sendAssistAIMessage = sendMessage;

  // Simple powerbar UI
  const powerbar = document.createElement("div");
  powerbar.style.position = "fixed";
  powerbar.style.bottom = "20px";
  powerbar.style.right = "20px";
  powerbar.style.width = "300px";
  powerbar.style.height = "50px";
  powerbar.style.backgroundColor = "#222";
  powerbar.style.color = "#fff";
  powerbar.style.display = "flex";
  powerbar.style.alignItems = "center";
  powerbar.style.padding = "10px";
  powerbar.style.borderRadius = "8px";
  powerbar.style.fontFamily = "sans-serif";
  powerbar.innerHTML = `
    <input type="text" id="assistInput" placeholder="Ask AI..." style="flex:1;margin-right:5px;padding:5px;">
    <button id="assistBtn">Send</button>
  `;
  document.body.appendChild(powerbar);

  const input = document.getElementById("assistInput");
  const btn = document.getElementById("assistBtn");

  btn.onclick = async () => {
    const msg = input.value;
    if (!msg) return;
    const response = await sendMessage(msg);
    console.log("Assist AI response:", response);
    alert(JSON.stringify(response));
  };
})();
