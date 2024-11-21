const token = new URLSearchParams(document.location.search).get("token");
const btn = document.getElementById("cb-btn");
let sessionRef = null;

const settings = {
  allowAgentAnnotation: true,
  allowCustomerAnnotation: true,
  piiMask: {
    maskCssSelectors: ".hide-me",
    maskType: "custom_input",
  },
};

ZoomCobrowseSDK.init(settings, function ({ success, session, error }) {
  if (success) {
    session.on("pincode_updated", (payload) => {
      console.log("pincode_updated", payload);
    });
    sessionRef = session;
    btn.disabled = false;
    btn.innerText = "Cobrowse";
  } else {
    console.log(error);
  }
});

const startSession = () => {
  if (!sessionRef) {
    alert("Please wait...");
    return;
  }
  btn.disabled = true;
  sessionRef.start({
    sdkToken: token,
  });
};

if (!token) {
  alert("Please provide a valid token");
  window.location.href = "/";
}

btn.addEventListener("click", startSession);
