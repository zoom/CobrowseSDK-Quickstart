const token = new URLSearchParams(document.location.search).get("token");
const submitBtn = document.getElementById("submit");
const btn = document.getElementById("cb-btn");

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
   },
   remoteAssist:{
        enable: true,
        enableCustomerConsent: true,
        remoteAssistTypes: ['scroll_page'], 
   }
};

const handleSubmit = () => {
  window.open(`http://localhost:5173/customer2.html?token=${token}`,'_blank')
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

submitBtn.addEventListener("click", handleSubmit);
btn.addEventListener("click", startSession);
