const sdkKey = import.meta.env.VITE_ZOOM_COBROWSE_SDK_KEY;
const tokenUrl = import.meta.env.VITE_TOKEN_URL;

if (!sdkKey) {
  alert("Please provide a valid sdk key and token url");
}

async function fetchToken(role) {
  const token = (
    await (
      await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: role }),
      })
    ).json()
  ).token;
  console.log(token);
  return token;
}

const cbBtn = document.getElementById("cb-btn");
const iframeBtn = document.getElementById("iframe-btn");

cbBtn.addEventListener("click", async () => {
  const token = await fetchToken(1);
  window.open(`cobrowse.html?token=${token}`, "_blank");
});

iframeBtn.addEventListener("click", async () => {
  const token = await fetchToken(2);
  window.open(
    `https://go-zcb.zoom.us/sdkapi/zcb/frame-templates/desk?access_token=${token}`,
    "_blank"
  );
});
