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
  multiTabSessionPersistence: {
   enable: true,
   stateCookieKey: 'xyz'    
   }
};

const startSession = () => {
  ZoomCobrowseSDK.init(settings, function ({ success, session, error }) {
  if (success) {
    session.on("pincode_updated", (payload) => {
         console.log("pincode_updated", payload);
       });
       btn.disabled = true;
       session.start({
         customPinCode:'924342',  
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
