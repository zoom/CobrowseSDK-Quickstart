const sdkKey = import.meta.env.VITE_ZOOM_SDK_KEY;
const serverUrl = import.meta.env.VITE_TOKEN_URL;

if (!sdkKey) {
  alert("Please provide a valid sdk key and token url");
}

async function fetchToken(role) {
  const token = (
    await (
      await fetch(serverUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: role }),
      })
    )
      .json()
      .catch((e) => {
        console.error(e);
        alert("Please provide a valid token url");
      })
  ).token;
  console.log(token);
  return token;
}

const customerButton = document.getElementById("cb-btn");
const agentButton = document.getElementById("iframe-btn");

customerButton.addEventListener("click", async () => {
  const token = await fetchToken(1);
  window.open(`customer.html?token=${token}`, "_blank");
});

agentButton.addEventListener("click", async () => {
  const token = await fetchToken(2);
  window.open(`agent.html?token=${token}`, "_blank");
});
