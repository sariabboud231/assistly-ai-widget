(function () {
  const allowedDomain = "assist-ai.myshopify.com";

  if (window.location.hostname !== allowedDomain) {
    console.warn("Assist AI blocked on this domain");
    return;
  }
const res = await fetch("https://roughbush260.mygmailname.workers.dev", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ clientId, message })
});
  const script = document.currentScript;
  const clientId = script.dataset.client;

  if (!clientId) {
    console.error("No client ID provided");
    return;
  }

  async function sendMessage(message) {
    const res = await fetch("https://assistly-backend.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId, message })
    });
    return res.json();
  }

  // Attach sendMessage to window for testing (later you can add UI)
  window.sendAssistAIMessage = sendMessage;

  // Optional: create a basic chat UI (powerbar)
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
