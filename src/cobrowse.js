const token = new URLSearchParams(document.location.search).get("token");
const btn = document.getElementById("cb-btn");
const codeContainer = document.getElementById("code");
let sessionRef = null;

const settings = {
  allowAgentAnnotation: true,
  allowCustomerAnnotation: true,
  piiMask: {
    maskCssSelectors: ".hide-me",
    maskType: "custom_input",
  },
};

if (!token) {
  alert("Please provide a valid token");
  window.location.href = "/";
}

// start session
ZoomCobrowseSDK.init(settings, function ({ success, session, error }) {
  console.log(session, success, error);
  console.log(session.getSessionInfo());

  session.on("pincode_updated", (payload) => {
    console.log("pincode_updated", payload);
    codeContainer.innerText = payload.pinCode;
    btn.innerText = "Share the code with the agent";
  });
  session.on("agent_joined", (payload) => {
    console.log("agent_joined", payload);
  });
  session.on("session_started", (payload) => {
    console.log("session_started", payload);
  });

  if (success) {
    console.log("sdk ready");
    sessionRef = session;
    btn.disabled = false;
    btn.innerText = "Cobrowse";
  } else {
    console.log(error);
  }
});

btn.addEventListener("click", () => {
  if (!sessionRef) {
    alert("Please wait...");
    return;
  }
  btn.disabled = true;
  sessionRef.start({
    sdkToken: token,
  });
});
