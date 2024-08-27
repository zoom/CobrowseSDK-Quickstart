const sdkKey = import.meta.env.VITE_ZOOM_COBROWSE_SDK_KEY;
if (!sdkKey) {
  alert("Please provide a valid sdk key");
  window.location.href = "/";
}
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

(function (r, a, b, f, c, d) {
  r[f] = r[f] || {
    init: function () {
      r.ZoomCobrowseSDKInitArgs = arguments;
    },
  };
  var fragment = a.createDocumentFragment();
  function loadJs(url) {
    c = a.createElement(b);
    d = a.getElementsByTagName(b)[0];
    c.async = false;
    c.src = url;
    fragment.appendChild(c);
  }
  loadJs(`https://go-zcb.zoom.us/static/resource/sdk/${sdkKey}/js`);
  d.parentNode.insertBefore(fragment, d);
})(window, document, "script", "ZoomCobrowseSDK");

// start session
ZoomCobrowseSDK.init(settings, function ({ success, session, error }) {
  console.log(session, success, error);
  console.log(session.getSessionInfo());

  session.on("pincode_updated", (payload) => {
    console.log("pincode_updated", payload);
    codeContainer.innerText = payload.pinCode;
  });
  session.on("agent_joined", (payload) => {
    console.log("agent_joined", payload);
  });
  session.on("session_started", (payload) => {
    console.log("session_started", payload);
  });

  if (success) {
    // ZoomCobrowseSDK is ready to use now
    console.log("success", success);
    console.log(session.getSessionInfo()?.pinCode ?? "no");
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
  sessionRef.start({
    sdkToken: token,
  });
});
