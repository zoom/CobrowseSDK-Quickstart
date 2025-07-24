import { ZoomCobrowseSDK } from '@zoom/cobrowsesdk/customer';

const token = new URLSearchParams(document.location.search).get("token");
const btn = document.getElementById("cb-btn");

const settings = {
  appKey: import.meta.env.VITE_ZOOM_SDK_KEY,
  allowAgentAnnotation: true,
  allowCustomerAnnotation: true,
  piiMask: {
    maskCssSelectors: ".hide-me",
    maskType: "custom_input",
  },
};

const startSession = () => {
  ZoomCobrowseSDK.init(settings, function ({ success, session, error }) {
  if (success) {
       btn.disabled = true;
       session.start({
         customPinCode:'982734',
         sdkToken: token,
       });
       btn.innerText = "Cobrowse Started";
     } else {
       console.log("ERROR", error);
     }   
  });
};

if (!token) {
  alert("Please provide a valid token");
  window.location.href = "/";
}

btn.addEventListener("click", startSession);
